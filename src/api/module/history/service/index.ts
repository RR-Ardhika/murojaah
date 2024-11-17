import * as entity from '@/api/module/history/entity';
import * as repo from '@/api/module/history/repository/indexeddb';
import { create } from '@/api/module/history/service/create';

export { create };

export const index = (): Promise<entity.History[]> => {
  return repo.findAll();
};

export const destroy = (item: entity.History): Promise<number> => {
  return repo.deleteRecord(item);
};

export const exportData = (): Promise<Blob> => {
  return repo.exportData();
};

export const importData = (jsonString: Blob): Promise<void> => {
  return repo.importData(jsonString);
};

export const dropDb = (): Promise<void> => {
  return repo.dropDb();
};
