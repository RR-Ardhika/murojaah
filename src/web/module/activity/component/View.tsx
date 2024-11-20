import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';

import { History } from '@/api/module/history/entity';
import { HistoryStat } from '@/api/module/stat/entity';
import { getHistoryStat } from '@/api/module/stat/service';
import { getTotalJuzFromLines } from '@/api/shared/entity/juz';
import { useData } from '@/web/module/activity/context/DataContext';
import { formatDate } from '@/web/shared/util/datetime';

interface InternalProps {
  mapHistoryStats: Map<string, HistoryStat>;
  currentDate: Date;
}

const updateAndRenderCurrentDate = (i: InternalProps, item: History): JSX.Element => {
  if (i.currentDate) {
    const parsedCurrentDate: DateTime = DateTime.fromJSDate(i.currentDate);
    const parsedOccuredAt: DateTime = DateTime.fromJSDate(item.occuredAt);
    if (parsedCurrentDate.hasSame(parsedOccuredAt, 'day')) return <></>;
  }

  i.currentDate = item.occuredAt;
  const formattedDate: string = formatDate(item.occuredAt);
  return (
    <div className="flex justify-between">
      <p className="text-lg text-custom-teal">{formattedDate}</p>
      <p className="text-lg text-custom-teal">{i.mapHistoryStats.get(formattedDate)?.juz} juz</p>
    </div>
  );
};

export const View = (): JSX.Element => {
  const { data, fetchData } = useData();
  const [mapHistoryStats, setMapHistoryStats] = useState<Map<string, HistoryStat>>(new Map());
  let currentDate: Date;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      const newMapHistoryStats: Map<string, HistoryStat> = new Map();
      const newMapIsProcessed: Map<number, boolean> = new Map();

      data.forEach((item: History) => {
        const formattedDate: string = formatDate(item.occuredAt);
        // @ts-expect-error expected type
        const itemId: number = item.id;

        if (!newMapHistoryStats.has(formattedDate)) {
          newMapHistoryStats.set(formattedDate, getHistoryStat(item));
          newMapIsProcessed.set(itemId, true);
          return;
        }

        const stat: HistoryStat | undefined = newMapHistoryStats.get(formattedDate);
        const isProcessed: boolean | undefined = newMapIsProcessed.get(itemId);

        if (isProcessed || !stat) return;

        const newStat: HistoryStat = getHistoryStat(item);
        stat.ayah += newStat.ayah;
        stat.lines += newStat.lines;
        stat.juz = getTotalJuzFromLines(stat.lines);

        newMapHistoryStats.set(formattedDate, stat);
        newMapIsProcessed.set(itemId, true);
      });

      setMapHistoryStats(newMapHistoryStats);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const i: InternalProps = {
    mapHistoryStats,
    // @ts-expect-error expected assigned
    currentDate,
  };

  return (
    <div className="flex flex-col pt-4 px-4 mt-[72px]">
      {data &&
        data.map((item: History) => {
          return (
            // TD-5 Refactor random after fix multiple render
            <div key={Math.random()}>
              {currentDate !== item.occuredAt ? updateAndRenderCurrentDate(i, item) : <></>}
            </div>
          );
        })}
    </div>
  );
};
