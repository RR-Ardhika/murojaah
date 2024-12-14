import { Base } from '@/web/shared/component/Base';

import { Stat } from '../entity';
import { getStatType } from '../service';

const CLASS_NAMES: Record<string, string> = {
  title: 'text-xl font-black',
  dataContainer: 'grid grid-cols-12 gap-x-2 items-center',
  fieldNameCol: 'col-span-9',
  fieldValueCol: 'col-span-2',
};

export const Card = (item: Stat): JSX.Element => {
  return (
    <Base module="stat" name="Card">
      <div>
        <p className={CLASS_NAMES.title}>{getStatType(item.statType)}</p>
        <hr />
        <div className={CLASS_NAMES.dataContainer}>
          <p className={CLASS_NAMES.fieldNameCol}>Total lines read</p>
          <p>:</p>
          <p className={CLASS_NAMES.fieldValueCol}>{item.totalLinesRead}</p>

          <p className={CLASS_NAMES.fieldNameCol}>Total juz done from lines</p>
          <p>:</p>
          <p className={CLASS_NAMES.fieldValueCol}>{item.totalJuzFromLines}</p>

          <p className={CLASS_NAMES.fieldNameCol}>Total marked juz as done</p>
          <p>:</p>
          <p className={CLASS_NAMES.fieldValueCol}>{item.totalMarkedJuzAsDone}</p>
        </div>
      </div>
    </Base>
  );
};
