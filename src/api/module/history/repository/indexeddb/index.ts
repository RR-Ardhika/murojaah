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

export function Insert(item: entity.History): Promise<number | unknown[]> {
  return idbCon.insert({ into: 'histories', values: [item] });
}

export function DeleteRecord(item: entity.History): Promise<number> {
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
    const idbDatabase: IDBDatabase = db.backendDB();

    // eslint-disable-next-line @typescript-eslint/typedef
    const jsonString: string = await new Promise<string>((resolve, reject) => {
      IDBExportImport.exportToJsonString(idbDatabase, (err: Error, result: string) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    return jsonString;
  } catch (err) {
    console.error('Export failed:', err);
    throw err;
  }
}

export async function Import(jsonString: string): Promise<void> {
  const db: Dexie = new Dexie('murojaah');

  db.version(0.1).stores({
    histories:
      'id, historyType, juz, surah, surahName, startAyah, endAyah, markSurahDone, markJuzDone, approachId, repeat, occuredAt',
  });

  try {
    await db.open();
    const idbDatabase: IDBDatabase = db.backendDB();

    // eslint-disable-next-line @typescript-eslint/typedef
    await new Promise<boolean>((resolve, reject) => {
      IDBExportImport.importFromJsonString(
        idbDatabase,
        transformImportedData(jsonString),
        function (err: Error) {
          if (err) return reject(err);
          resolve(true);
        }
      );
    });
  } catch (err) {
    console.error('Import failed:', err);
    throw err;
  }
}

function transformImportedData(jsonString: string): string {
  const jsonObject: Record<string, string> = JSON.parse(jsonString);
  delete jsonObject.JsStore_Meta; // TD-11 Handle when version is different
  return JSON.stringify(jsonObject);
}
