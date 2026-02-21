import Dexie, { type EntityTable } from 'dexie';

export interface Activity {
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

export const db: Dexie & { activities: EntityTable<Activity, 'id'> } = new Dexie(
  'murojaah'
) as Dexie & { activities: EntityTable<Activity, 'id'> };

db.version(1).stores({
  activities: 'id, occuredAt, activityType, juz, surah, approachId',
});

db.open().then(async () => {
  const count: number = await db.activities.count();
  console.log(`[DB] Connected: ${count} activities`);
});
