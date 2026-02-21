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
    const jsonString: string = await blob.text();
    const json: ImportJson = JSON.parse(jsonString);

    const rows: ActivityRow[] = json.data.data[0].rows;

    const activities: Activity[] = rows.map((row: ActivityRow): Activity => {
      const data: ActivityData = row.$[1] as ActivityData;
      return {
        id: data.id,
        activityType: data.activityType,
        juz: data.juz,
        surah: data.surah,
        startAyah: data.startAyah,
        endAyah: data.endAyah,
        markSurahDone: data.markSurahDone,
        markJuzDone: data.markJuzDone,
        approachId: data.approachId,
        repeat: data.repeat,
        occuredAt: new Date(data.occuredAt),
      };
    });

    await db.open();
    await db.activities.clear();
    await db.activities.bulkAdd(activities);
  } catch (err) {
    console.error('Import failed:', err);
    throw err;
  }
};

interface Activity {
  id: string;
  activityType: number;
  juz?: number;
  surah?: number;
  startAyah?: number;
  endAyah?: number;
  markSurahDone?: boolean;
  markJuzDone?: boolean;
  approachId: number;
  repeat: number;
  occuredAt: Date;
}

interface ActivityRow {
  $: [string, ActivityData];
}

interface ActivityData {
  id: string;
  activityType: number;
  juz?: number;
  surah?: number;
  startAyah?: number;
  endAyah?: number;
  markSurahDone?: boolean;
  markJuzDone?: boolean;
  approachId: number;
  repeat: number;
  occuredAt: number;
}

interface ImportJson {
  data: {
    data: Array<{
      rows: ActivityRow[];
    }>;
  };
}

export const dropDb = async (): Promise<void> => {
  try {
    await db.delete();
    await db.open();
  } catch (err) {
    console.error('Failed to delete database:', err);
    throw err;
  }
};
