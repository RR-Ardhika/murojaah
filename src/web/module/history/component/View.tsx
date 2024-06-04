import { useState, useEffect } from 'react';
import { GetTotalJuzFromLines } from '@/api/shared/entity/juz';
import { History } from '@/api/module/history/entity';
import { HistoryStat } from '@/api/module/stat/entity';
import { GetHistoryStat } from '@/api/module/stat/service';
import { useAlert } from '@/web/shared/context/AlertContext';
import { formatDate } from '@/web/shared/util/datetime';
import { useData } from '@/web/module/history/context/DataContext';
import { DateTime } from 'luxon';
import { clsx } from 'clsx';
import Card from '@/web/module/history/component/Card';

const View = (): JSX.Element => {
  // @ts-expect-error useAlert
  const { isAlertVisible } = useAlert();
  const { data, fetchData } = useData();
  const [mapHistoryStats, setMapHistoryStats] = useState<Map<string, HistoryStat>>(new Map());
  let currentDate: Date;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      const newMapHistoryStats: Map<string, HistoryStat> = new Map(new Map());
      const newMapIsProcessed: Map<number, boolean> = new Map(new Map());

      data.forEach((item: History) => {
        const formattedDate: string = formatDate(item.occuredAt);
        // @ts-expect-error expected type
        const itemId: number = item.id;

        if (!newMapHistoryStats.has(formattedDate)) {
          newMapHistoryStats.set(formattedDate, GetHistoryStat(item));
          newMapIsProcessed.set(itemId, true);
          return;
        }

        const stat: HistoryStat | undefined = newMapHistoryStats.get(formattedDate);
        const isProcessed: boolean | undefined = newMapIsProcessed.get(itemId);

        if (isProcessed || !stat) return;

        const newStat: HistoryStat = GetHistoryStat(item);
        stat.ayah += newStat.ayah;
        stat.lines += newStat.lines;
        stat.juz = GetTotalJuzFromLines(stat.lines);

        newMapHistoryStats.set(formattedDate, stat);
        newMapIsProcessed.set(itemId, true);
      });

      setMapHistoryStats(newMapHistoryStats);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function updateAndRenderCurrentDate(item: History): JSX.Element {
    if (currentDate) {
      const parsedCurrentDate: DateTime = DateTime.fromJSDate(currentDate);
      const parsedOccuredAt: DateTime = DateTime.fromJSDate(item.occuredAt);
      if (parsedCurrentDate.hasSame(parsedOccuredAt, 'day')) return <></>;
    }

    currentDate = item.occuredAt;
    const formattedDate: string = formatDate(item.occuredAt);
    return (
      <>
        <p className="text-2xl font-medium text-custom-teal">{formattedDate}</p>
        <p className="font-light text-custom-teal">
          <span>{mapHistoryStats.get(formattedDate)?.juz} juz, </span>
          <span>{mapHistoryStats.get(formattedDate)?.ayah} ayah, </span>
          <span>{mapHistoryStats.get(formattedDate)?.lines} lines</span>
        </p>
        <hr className="mb-2 border-custom-teal" />
      </>
    );
  }

  return (
    <div className={clsx('flex flex-col pt-4 px-4', isAlertVisible ? 'mt-[112px]' : 'mt-[72px]')}>
      {data &&
        data.map((item: History) => {
          return (
            <>
              {currentDate !== item.occuredAt ? updateAndRenderCurrentDate(item) : <></>}
              <Card key={item.id} {...item} />
            </>
          );
        })}
    </div>
  );
};

export default View;
