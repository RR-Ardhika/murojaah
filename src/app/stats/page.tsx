import { Stat } from '@/api/module/stat/entity';
import { clsx } from 'clsx';

const Stat = (): JSX.Element => {
  const classNames: Record<string, string> = {
    container: 'gap-[20px] mt-[72px] pt-4 px-4',
    card: 'p-4 bg-custom-teal text-white rounded-lg',
    marginTop: 'mt-4',
    title: 'text-xl font-black',
    dataContainer: 'grid grid-cols-12 gap-x-2 items-center',
    fieldNameCol: 'col-span-9',
    fieldValueCol: 'col-span-2',
  };

  // TODO Remove dummy data
  const dummy: Stat[] = [
    {
      statType: 0,
      totalLinesRead: 100,
      totalJuzFromLines: 1.5,
      totalMarkedJuzAsDone: 1,
    },
    {
      statType: 1,
      totalLinesRead: 100,
      totalJuzFromLines: 1.5,
      totalMarkedJuzAsDone: 1,
    },
    {
      statType: 2,
      totalLinesRead: 100,
      totalJuzFromLines: 1.5,
      totalMarkedJuzAsDone: 1,
    },
    {
      statType: 4,
      totalLinesRead: 100,
      totalJuzFromLines: 1.5,
      totalMarkedJuzAsDone: 1,
    },
  ];

  return (
    <div className={classNames.container}>
      <div className={classNames.card}>
        <p className={classNames.title}>All Times</p>
        <hr />
        <div className={classNames.dataContainer}>
          <p className={classNames.fieldNameCol}>Total lines read</p>
          <p>:</p>
          <p className={classNames.fieldValueCol}>100</p>

          <p className={classNames.fieldNameCol}>Total juz done from lines</p>
          <p>:</p>
          <p className={classNames.fieldValueCol}>1</p>

          <p className={classNames.fieldNameCol}>Total marked juz as done</p>
          <p>:</p>
          <p className={classNames.fieldValueCol}>1</p>
        </div>

        <p className={clsx(classNames.marginTop, classNames.title)}>Daily</p>
        <hr />
        <div className={classNames.dataContainer}>
          <p className={classNames.fieldNameCol}>Total lines read</p>
          <p>:</p>
          <p>100</p>

          <p className={classNames.fieldNameCol}>Total juz done from lines</p>
          <p>:</p>
          <p>1</p>

          <p className={classNames.fieldNameCol}>Total marked juz as done</p>
          <p>:</p>
          <p>1</p>
        </div>

        <p className={clsx(classNames.marginTop, classNames.title)}>Weekly</p>
        <hr />
        <div className={classNames.dataContainer}>
          <p className={classNames.fieldNameCol}>Total lines read</p>
          <p>:</p>
          <p>100</p>

          <p className={classNames.fieldNameCol}>Total juz done from lines</p>
          <p>:</p>
          <p>1</p>

          <p className={classNames.fieldNameCol}>Total marked juz as done</p>
          <p>:</p>
          <p>1</p>
        </div>

        <p className={clsx(classNames.marginTop, classNames.title)}>Monthly</p>
        <hr />
        <div className={classNames.dataContainer}>
          <p className={classNames.fieldNameCol}>Total lines read</p>
          <p>:</p>
          <p>100</p>

          <p className={classNames.fieldNameCol}>Total juz done from lines</p>
          <p>:</p>
          <p>1</p>

          <p className={classNames.fieldNameCol}>Total marked juz as done</p>
          <p>:</p>
          <p>1</p>
        </div>
      </div>
    </div>
  );
};

export default Stat;
