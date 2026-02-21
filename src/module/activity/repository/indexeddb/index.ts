import { db, type Activity } from '@/database/indexeddb/db';

export * from './export-import';

export const findAll = (): Promise<Activity[]> => {
  return db.activities.orderBy('occuredAt').reverse().toArray();
};

export const insert = (item: Activity): Promise<string> => {
  return db.activities.add(item);
};

export const update = async (item: Activity): Promise<number> => {
  return db.activities.update(item.id, item);
};

export const deleteRecord = (item: Activity): Promise<void> => {
  return db.activities.delete(item.id);
};
