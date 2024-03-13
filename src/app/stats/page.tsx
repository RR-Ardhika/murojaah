import { Stat } from '@/api/module/stat/entity';
import { Card } from '@/web/module/stat/component/Card';

const Stat = (): JSX.Element => {
  // TODO Remove dummy data
  const dummy: Stat[] = [
    {
      id: 1,
      statType: 0,
      totalLinesRead: 100,
      totalJuzFromLines: 1.5,
      totalMarkedJuzAsDone: 1,
    },
    {
      id: 2,
      statType: 1,
      totalLinesRead: 100,
      totalJuzFromLines: 1.5,
      totalMarkedJuzAsDone: 1,
    },
    {
      id: 3,
      statType: 2,
      totalLinesRead: 100,
      totalJuzFromLines: 1.5,
      totalMarkedJuzAsDone: 1,
    },
    {
      id: 4,
      statType: 4,
      totalLinesRead: 100,
      totalJuzFromLines: 1.5,
      totalMarkedJuzAsDone: 1,
    },
  ];

  return (
    <div className="gap-[20px] mt-[72px] pt-4 px-4">
      <div className="flex flex-col gap-4 p-4 bg-custom-teal text-white rounded-lg">
        {/* TODO Remove dummy data */}
        {dummy ? dummy.map((item: Stat) => <Card key={item.id} {...item} />) : <></>}
      </div>
    </div>
  );
};

export default Stat;
