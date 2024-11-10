import { Connection } from 'jsstore';
import { v4 as uuidv4 } from 'uuid';
import Dexie from 'dexie';

import { initJsStore } from '@/api/database/indexeddb/connection';
import * as entity from '@/api/module/history/entity';

const idbCon: Connection = initJsStore();

export function FindAll(): Promise<entity.History[]> {
  return idbCon.select<entity.History>({
    from: 'histories',
    order: { by: 'occuredAt', type: 'desc' },
  });
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

export async function Export(): Promise<Blob> {
  if (typeof window === 'undefined')
    return Promise.reject(new Error('Cannot export in server side'));

  const db: Dexie = new Dexie('murojaah');

  db.version(0.1).stores({
    histories:
      'id, historyType, juz, surah, startAyah, endAyah, markSurahDone, markJuzDone, approachId, repeat, occuredAt',
  });

  try {
    const { exportDB } = await import('dexie-export-import');
    await db.open();
    const blob: Blob = await exportDB(db);
    return blob;
  } catch (err) {
    console.error('Export failed:', err);
    throw err;
  }
}

export async function Import(blob: Blob): Promise<void> {
  if (typeof window === 'undefined')
    return Promise.reject(new Error('Cannot import in server side'));

  const db: Dexie = new Dexie('murojaah');

  db.version(0.1).stores({
    histories:
      'id, historyType, juz, surah, startAyah, endAyah, markSurahDone, markJuzDone, approachId, repeat, occuredAt',
  });

  try {
    const { importDB } = await import('dexie-export-import');
    await db.open();
    const transformedData: Blob = await transformImportedData(blob);
    // @ts-expect-error db is exist
    await importDB(transformedData, { db });
  } catch (err) {
    console.error('Import failed:', err);
    throw err;
  }
}

async function transformImportedData(blob: Blob): Promise<Blob> {
  const jsonString: string = await blob.text();
  const jsonObject: Record<string, unknown> = JSON.parse(jsonString);

  if (Array.isArray(jsonObject.histories)) {
    // eslint-disable-next-line @typescript-eslint/typedef
    jsonObject.histories = jsonObject.histories.map((history) => {
      // Remove surahName
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, surahName, occuredAt, ...rest } = history;

      // Convert id to UUID v4
      return { id: uuidv4(), ...rest };
    });
  }

  return new Blob([JSON.stringify(jsonObject)], { type: 'application/json' });
}
