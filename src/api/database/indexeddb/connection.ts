import { IDataBase, Connection } from 'jsstore';
import workerInjector from 'jsstore/dist/worker_injector';
import { getDatabase } from '@/api/database/indexeddb/schema';

export function initJsStore(): Connection {
  const idbCon: Connection = new Connection();
  idbCon.addPlugin(workerInjector);

  try {
    const dataBase: IDataBase = getDatabase();
    idbCon.initDb(dataBase);
  } catch (err) {
    console.error(err);
  }

  return idbCon;
}
