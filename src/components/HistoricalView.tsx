import { useEffect } from 'react';
import { History, HistoryType } from '@/api/module/history/entity';
import { useData } from '@/context/DataContext';
import { useAlert } from '@/context/AlertContext';
import { Card } from '@/components/Card';
import { clsx } from 'clsx';
import { DateTime } from 'luxon';

export const HistoricalView = (): JSX.Element => {
  // @ts-expect-error useAlert
  const { isAlertVisible } = useAlert();
  const { data, fetchData } = useData();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO Remove this mockup data
  const showMockup: boolean = false;
  const mockup: History[] = [
    {
      historyType: HistoryType.Juz,
      juz: 28,
      historyMethodId: 0,
      totalHistory: 100,
      occuredAt: DateTime.now().toJSDate(),
    },
    {
      historyType: HistoryType.Surah,
      surah: 188,
      surahName: 'Al-Mumtahanah',
      historyMethodId: 0,
      totalHistory: 100,
      occuredAt: DateTime.now().toJSDate(),
    },
    {
      historyType: HistoryType.Ayah,
      start: 200,
      end: 208,
      surah: 1,
      surahName: 'Al-Baqarah',
      historyMethodId: 0,
      totalHistory: 100,
      occuredAt: DateTime.now().toJSDate(),
    },
  ];

  return (
    <div className={clsx('flex flex-col pt-4 px-4', isAlertVisible ? 'mt-[112px]' : 'mt-[72px]')}>
      {data ? data.map((item: History) => <Card key={item.id} {...item} />) : <></>}

      {/* TODO Remove this mockup data */}
      {showMockup ? (
        <>
          <Card {...mockup[0]} />
          <Card {...mockup[1]} />
          <Card {...mockup[2]} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
