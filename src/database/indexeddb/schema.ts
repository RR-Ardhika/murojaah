import { IDataBase, DATA_TYPE, ITable } from 'jsstore';

const dbname: string = 'murojaah';

export const getDatabase = (): IDataBase => {
  const dataBase: IDataBase = {
    name: dbname,
    tables: [histories],
  };

  return dataBase;
};

const histories: ITable = {
  name: 'histories',
  columns: {
    id: { primaryKey: true, dataType: DATA_TYPE.String },
    historyType: { dataType: DATA_TYPE.Number, notNull: true },
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
