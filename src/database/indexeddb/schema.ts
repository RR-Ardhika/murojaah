import { IDataBase, DATA_TYPE, ITable } from 'jsstore';

import { TABLE_NAME as TABLE_ACTIVITY } from '@/module/activity/entity';

const dbname: string = 'murojaah';

export const getDatabase = (): IDataBase => {
  const dataBase: IDataBase = {
    name: dbname,
    tables: [activities],
  };

  return dataBase;
};

const activities: ITable = {
  name: TABLE_ACTIVITY,
  columns: {
    id: { primaryKey: true, dataType: DATA_TYPE.String },
    activityType: { dataType: DATA_TYPE.Number, notNull: true },
    juz: { dataType: DATA_TYPE.Number },
    surah: { dataType: DATA_TYPE.Number },
    startAyah: { dataType: DATA_TYPE.Number },
    endAyah: { dataType: DATA_TYPE.Number },
    markSurahDone: { dataType: DATA_TYPE.Boolean },
    markJuzDone: { dataType: DATA_TYPE.Boolean },
    approachId: { dataType: DATA_TYPE.Number, notNull: true },
    repeat: { dataType: DATA_TYPE.Number, notNull: true },
    occuredAt: { dataType: DATA_TYPE.DateTime, notNull: true },
  },
};
