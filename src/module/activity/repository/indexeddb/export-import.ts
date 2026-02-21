import { db } from '@/database/indexeddb/db';

export const exportData = async (): Promise<Blob> => {
  if (typeof window === 'undefined')
    return Promise.reject(new Error('Cannot export in server side'));

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

  try {
    const { importDB: importDb } = await import('dexie-export-import');
    await db.open();
    // @ts-expect-error db is exist in import options
    await importDb(blob, { db });
  } catch (err) {
    console.error('Import failed:', err);
    throw err;
  }
};

export const dropDb = async (): Promise<void> => {
  try {
    await db.delete();
  } catch (err) {
    console.error('Failed to delete database:', err);
    throw err;
  }
};
