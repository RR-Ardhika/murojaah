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
    const idbDatabase: IDBDatabase = db.backendDB();

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

export async function Import(jsonString: string): Promise<boolean> {
  const db: Dexie = new Dexie('murojaah');

  db.version(0.1).stores({
    histories:
      'id, historyType, juz, surah, surahName, startAyah, endAyah, markSurahDone, markJuzDone, approachId, repeat, occuredAt',
  });

  try {
    await db.open();
    const idbDatabase: IDBDatabase = db.backendDB();

    const success: boolean = await new Promise<boolean>((resolve, reject) => {
      IDBExportImport.clearDatabase(idbDatabase, function (err: Error) {
        if (err) return reject(err);

        IDBExportImport.importFromJsonString(idbDatabase, jsonString, function (err: Error) {
          if (err) return reject(err);
          resolve(true);
        });
      });
    });

    return success;
  } catch (err) {
    console.error('Import failed:', err);
    throw err;
  }
}
