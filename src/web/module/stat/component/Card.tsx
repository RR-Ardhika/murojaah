import { Stat } from '@/api/module/stat/entity';
import { GetStatType } from '@/api/module/stat/service';

export const Card = (item: Stat): JSX.Element => {
  const classNames: Record<string, string> = {
    title: 'text-xl font-black',
    dataContainer: 'grid grid-cols-12 gap-x-2 items-center',
    fieldNameCol: 'col-span-9',
    fieldValueCol: 'col-span-2',
  };

  return (
    <div>
      <p className={classNames.title}>{GetStatType(item.statType)}</p>
      <hr />
      <div className={classNames.dataContainer}>
        <p className={classNames.fieldNameCol}>Total lines read</p>
        <p>:</p>
        <p className={classNames.fieldValueCol}>{item.totalLinesRead}</p>

        <p className={classNames.fieldNameCol}>Total juz done from lines</p>
        <p>:</p>
        <p className={classNames.fieldValueCol}>{item.totalJuzFromLines}</p>

        <p className={classNames.fieldNameCol}>Total marked juz as done</p>
        <p>:</p>
        <p className={classNames.fieldValueCol}>{item.totalMarkedJuzAsDone}</p>
      </div>
    </div>
  );
};
