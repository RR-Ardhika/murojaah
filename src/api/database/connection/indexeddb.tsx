import { IDataBase, DATA_TYPE, ITable, Connection } from 'jsstore';
import workerInjector from 'jsstore/dist/worker_injector';

export const idbCon = new Connection();
idbCon.addPlugin(workerInjector);

export const dbname = 'murojaah';

const getDatabase = () => {
  const histories: ITable = {
    name: 'histories',
    columns: {
      id: {
        primaryKey: true,
        autoIncrement: true,
      },
      juzId: {
        notNull: true,
        dataType: DATA_TYPE.Number,
      },
    },
  };

  const dataBase: IDataBase = {
    name: dbname,
    tables: [histories],
  };

  return dataBase;
};

export function initJsStore() {
  try {
    const dataBase = getDatabase();
    idbCon.initDb(dataBase);
  } catch (err) {
    console.error(err);
  }
}
