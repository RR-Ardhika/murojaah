import * as entity from '@/api/module/history/entity';
import { Connection } from 'jsstore';

import { initJsStore } from '@/api/database/indexeddb/connection';
import Dexie from 'dexie';
// @ts-expect-error valid import
import * as IDBExportImport from 'indexeddb-export-import';

const idbCon: Connection = initJsStore();

export function FindAll(): Promise<History[]> {
  return idbCon.select<History>({ from: 'histories', order: { by: 'occuredAt', type: 'desc' } });
}

export function Insert(item: entity.History): Promise<unknown> {
  return idbCon.insert({ into: 'histories', values: [item] });
}

export function DeleteRecord(item: History): Promise<number> {
  return idbCon.remove({
    from: 'histories',
    where: { id: item.id },
  });
}

export async function Export(): Promise<string> {
  const db: Dexie = new Dexie('murojaah');

  db.version(0.1).stores({
    histories:
      'id, historyType, juz, surah, surahName, startAyah, endAyah, markSurahDone, markJuzDone, approachId, repeat, occuredAt',
  });

  try {
    await db.open();
    const idbDatabase: IDBDatabase = db.backendDB(); // Get native IndexedDB Database object
    const jsonString: string = await new Promise<string>((resolve, reject) => {
      IDBExportImport.exportToJsonString(idbDatabase, (err: Error, result: string) => {
        if (err) {
          console.error('Export failed:', err);
          return reject(err);
        }

        resolve(result);
      });
    });

    return jsonString;
  } catch (err) {
    throw err;
  }
}

export function Import(): void {
  console.log('import');
}
