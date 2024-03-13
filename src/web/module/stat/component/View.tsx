import { useEffect } from 'react';
import { Stat } from '@/api/module/stat/entity';
import { Card } from '@/web/module/stat/component/Card';
import { useData } from '@/web/module/stat/context/DataContext';

export const View = (): JSX.Element => {
  // TODO Remove dummy data
  const dummy: Stat[] = [
    {
      id: 1,
      statType: 0,
      totalLinesRead: 100,
      totalJuzFromLines: '1.5',
      totalMarkedJuzAsDone: 1,
    },
    {
      id: 2,
      statType: 1,
      totalLinesRead: 100,
      totalJuzFromLines: '1.5',
      totalMarkedJuzAsDone: 1,
    },
    {
      id: 3,
      statType: 2,
      totalLinesRead: 100,
      totalJuzFromLines: '1.5',
      totalMarkedJuzAsDone: 1,
    },
    {
      id: 4,
      statType: 4,
      totalLinesRead: 100,
      totalJuzFromLines: '1.5',
      totalMarkedJuzAsDone: 1,
    },
  ];

  const { data, fetchData } = useData();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="gap-[20px] mt-[72px] pt-4 px-4">
      <div className="flex flex-col gap-4 p-4 bg-custom-teal text-white rounded-lg">
        {data ? data.map((item: Stat) => <Card key={item.id} {...item} />) : <></>}

        {/* TODO Remove dummy data */}
        {dummy ? dummy.map((item: Stat) => <Card key={item.id} {...item} />) : <></>}
      </div>
    </div>
  );
};
