import Dexie from 'dexie';
import { Connection } from 'jsstore';
import { v4 as uuidv4 } from 'uuid';

import { initJsStore } from '@/database/indexeddb/connection';

const idbCon: Connection = initJsStore();

export const exportData = async (): Promise<Blob> => {
  if (typeof window === 'undefined')
    return Promise.reject(new Error('Cannot export in server side'));

  const db: Dexie = new Dexie('murojaah');

  // TD-12 Handle different version export / import
  db.version(0.1).stores({
    histories:
      'id, historyType, juz, surah, startAyah, endAyah, markSurahDone, markJuzDone, approachId, repeat, occuredAt',
  });

  try {
    const { exportDB: exportDb } = await import('dexie-export-import');
    await db.open();
    const blob: Blob = await exportDb(db);
    return blob;
  } catch (err) {
    console.error('Export failed:', err);
    throw err;
  }
};

export const importData = async (blob: Blob): Promise<void> => {
  if (typeof window === 'undefined')
    return Promise.reject(new Error('Cannot import in server side'));

  const db: Dexie = new Dexie('murojaah');

  // TD-12 Handle different version export / import
  db.version(0.1).stores({
    histories:
      'id, historyType, juz, surah, startAyah, endAyah, markSurahDone, markJuzDone, approachId, repeat, occuredAt',
  });

  try {
    const { importDB: importDb } = await import('dexie-export-import');
    await db.open();
    // @ts-expect-error db is exist
    await importDb(blob, { db });
  } catch (err) {
    console.error('Import failed:', err);
    throw err;
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const transformImportedData = async (blob: Blob): Promise<Blob> => {
  const jsonString: string = await blob.text();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jsonObject: Record<string, any> = JSON.parse(jsonString);
  const rows: Array<unknown> = jsonObject?.data?.data[0]?.rows;

  if (Array.isArray(rows)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jsonObject.data.data[0].rows = rows.map((history: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, surahName, ...rest } = history; // Remove surahName

      // Convert id to UUID v4
      return { id: uuidv4(), ...rest };
    });
  }

  return new Blob([JSON.stringify(jsonObject)], { type: 'application/json' });
};

export const dropDb = (): Promise<void> => {
  return idbCon.dropDb();
};
