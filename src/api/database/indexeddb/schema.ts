import { IDataBase, DATA_TYPE, ITable } from 'jsstore';

const dbname: string = 'murojaah';

export function getDatabase(): IDataBase {
  const dataBase: IDataBase = {
    name: dbname,
    tables: [histories],
  };

  return dataBase;
}

const histories: ITable = {
  name: 'histories',
  columns: {
    id: { primaryKey: true, dataType: DATA_TYPE.String },
    historyType: { dataType: DATA_TYPE.Number, notNull: true },
    juz: { dataType: DATA_TYPE.Number },
    surah: { dataType: DATA_TYPE.Number },
    startAyah: { dataType: DATA_TYPE.Number, enableSearch: false },
    endAyah: { dataType: DATA_TYPE.Number, enableSearch: false },
    markSurahDone: { dataType: DATA_TYPE.Boolean, enableSearch: false },
    markJuzDone: { dataType: DATA_TYPE.Boolean, enableSearch: false },
    approachId: { dataType: DATA_TYPE.Number, notNull: true },
    repeat: { dataType: DATA_TYPE.Number, notNull: true, enableSearch: false },
    occuredAt: { dataType: DATA_TYPE.DateTime, notNull: true },
  },
};
