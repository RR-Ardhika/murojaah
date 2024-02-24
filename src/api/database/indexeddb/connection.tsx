import { Connection } from 'jsstore';
import workerInjector from 'jsstore/dist/worker_injector';
import { getDatabase } from '@/api/database/indexeddb/schema';

export const idbCon = new Connection();
idbCon.addPlugin(workerInjector);

export function initJsStore() {
  try {
    const dataBase = getDatabase();
    idbCon.initDb(dataBase);
  } catch (err) {
    console.error(err);
  }
}
