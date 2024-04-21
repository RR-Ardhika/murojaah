import { useState, useEffect } from 'react';
import { History } from '@/api/module/history/entity';
import { useData } from '@/web/module/history/context/DataContext';
import { useAlert } from '@/web/shared/context/AlertContext';
import { Card } from '@/web/module/history/component/Card';
import { formatDate } from '@/web/shared/util/datetime';
import { DateTime } from 'luxon';
import { clsx } from 'clsx';

export const View = (): JSX.Element => {
  // @ts-expect-error useAlert
  const { isAlertVisible } = useAlert();
  const { data, fetchData } = useData();
  const [mapDateData, setMapDateData] = useState<Map<string, DateData>>(new Map());
  const [mapIsProcessed, setMapIsProcessed] = useState<Map<number, boolean>>(new Map());
  let currentDate: Date;

  type DateData = {
    juz: number;
    ayah: number;
    lines: number;
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      const newMapDateData: Map<string, DateData> = new Map(mapDateData);
      const newMapIsProcessed: Map<number, boolean> = new Map(mapIsProcessed);

      data.forEach((item: History) => {
        const formattedDate: string = formatDate(item.occuredAt);
        // @ts-expect-error expected type
        const itemId: number = item.id;

        if (!newMapDateData.has(formattedDate)) {
          newMapDateData.set(formattedDate, { juz: 1, ayah: 1, lines: 1 });
          newMapIsProcessed.set(itemId, true);
          return;
        }

        const dateData: DateData | undefined = newMapDateData.get(formattedDate);
        const isProcessed: boolean | undefined = newMapIsProcessed.get(itemId);

        if (isProcessed || !dateData) return;

        dateData.juz++;
        dateData.ayah++;
        dateData.lines++;
        newMapDateData.set(formattedDate, dateData);
        newMapIsProcessed.set(itemId, true);
      });

      setMapDateData(newMapDateData);
      setMapIsProcessed(newMapIsProcessed);
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
    return (
      <>
        <p className="text-2xl font-medium text-custom-teal">{formatDate(item.occuredAt)}</p>
        <p className="font-light text-custom-teal">
          <span>{mapDateData.get(formatDate(item.occuredAt))?.juz} juz, </span>
          <span>{mapDateData.get(formatDate(item.occuredAt))?.ayah} ayah, </span>
          <span>{mapDateData.get(formatDate(item.occuredAt))?.lines} lines</span>
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
