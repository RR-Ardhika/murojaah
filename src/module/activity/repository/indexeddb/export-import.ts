import { db, type Activity } from '@/database/indexeddb/db';

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

    const tableData: TableData = json.data.data[0];

    const activities: Activity[] = tableData.rows.map((row: RowData): Activity => {
      if (tableData.inbound === false && '$' in row) {
        return parseOldFormat(row as OldFormatRow);
      }
      return parseNewFormat(row as NewFormatRow);
    });

    await db.open();
    await db.activities.clear();
    await db.activities.bulkAdd(activities);
  } catch (err) {
    console.error('Import failed:', err);
    throw err;
  }
};

const parseOldFormat = (row: OldFormatRow): Activity => {
  const data: ActivityData = row.$[1];
  const types: Record<string, string> | undefined = row.$types?.$;
  const isUndef = (field: string): boolean => types?.[`1.${field}`] === 'undef';
  const parseNumber = (field: string, value: number | undefined): number | undefined => {
    if (isUndef(field) || value === 0) return undefined;
    return value;
  };
  const parseBoolean = (value: boolean | number | undefined): boolean | undefined => {
    if (value === undefined || value === 0 || value === false) return undefined;
    return true;
  };

  return {
    id: data.id,
    activityType: data.activityType,
    juz: parseNumber('juz', data.juz),
    surah: data.surah,
    startAyah: parseNumber('startAyah', data.startAyah),
    endAyah: parseNumber('endAyah', data.endAyah),
    markSurahDone: parseBoolean(data.markSurahDone),
    markJuzDone: parseBoolean(data.markJuzDone),
    approachId: data.approachId,
    repeat: data.repeat,
    occuredAt: new Date(data.occuredAt),
  };
};

const parseNewFormat = (row: NewFormatRow): Activity => {
  const types: Record<string, string> | undefined = row.$types;
  const isUndef = (field: string): boolean => types?.[field] === 'undef';
  const parseBoolean = (field: string, value: boolean | number | undefined): boolean | undefined => {
    if (isUndef(field) || value === undefined || value === 0 || value === false) return undefined;
    return true;
  };

  return {
    id: row.id,
    activityType: row.activityType,
    juz: isUndef('juz') || row.juz === 0 ? undefined : row.juz,
    surah: isUndef('surah') ? undefined : row.surah,
    startAyah: isUndef('startAyah') || row.startAyah === 0 ? undefined : row.startAyah,
    endAyah: isUndef('endAyah') || row.endAyah === 0 ? undefined : row.endAyah,
    markSurahDone: parseBoolean('markSurahDone', row.markSurahDone),
    markJuzDone: parseBoolean('markJuzDone', row.markJuzDone),
    approachId: row.approachId,
    repeat: row.repeat,
    occuredAt: new Date(row.occuredAt),
  };
};

interface ActivityData {
  id: string;
  activityType: number;
  juz?: number;
  surah?: number;
  startAyah?: number;
  endAyah?: number;
  markSurahDone?: boolean | number;
  markJuzDone?: boolean | number;
  approachId: number;
  repeat: number;
  occuredAt: number;
}

interface OldFormatRow {
  $: [string, ActivityData];
  $types?: { $?: Record<string, string> };
}

interface NewFormatRow {
  id: string;
  activityType: number;
  juz?: number;
  surah?: number;
  startAyah?: number;
  endAyah?: number;
  markSurahDone?: boolean | number;
  markJuzDone?: boolean | number;
  approachId: number;
  repeat: number;
  occuredAt: number | string;
  $types?: Record<string, string>;
}

type RowData = OldFormatRow | NewFormatRow;

interface TableData {
  inbound: boolean;
  rows: RowData[];
}

interface ImportJson {
  data: {
    data: TableData[];
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
