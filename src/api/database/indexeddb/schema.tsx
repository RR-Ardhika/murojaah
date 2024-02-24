import { IDataBase, DATA_TYPE, ITable } from 'jsstore';

const dbname = 'murojaah';

export function getDatabase() {
  const dataBase: IDataBase = {
    name: dbname,
    tables: [histories],
  };

  return dataBase;
}

const histories: ITable = {
  name: 'histories',
  columns: {
    id: { primaryKey: true, autoIncrement: true },
    murojaahType: { dataType: DATA_TYPE.Number, notNull: true },
    juz: { dataType: DATA_TYPE.Number },
    surah: { dataType: DATA_TYPE.Number },
    surahName: { dataType: DATA_TYPE.String },
    start: { dataType: DATA_TYPE.Number },
    end: { dataType: DATA_TYPE.Number },
    murojaahMethod: { dataType: DATA_TYPE.String, notNull: true },
    totalMurojaah: { dataType: DATA_TYPE.Number, notNull: true },
    occuredAt: { dataType: DATA_TYPE.DateTime, notNull: true },
  },
};
