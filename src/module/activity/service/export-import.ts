import * as repo from '../repository/indexeddb';

export const exportData = (): Promise<Blob> => {
  return repo.exportData();
};

export const importData = (jsonString: Blob): Promise<void> => {
  return repo.importData(jsonString);
};

export const dropDb = (): Promise<void> => {
  return repo.dropDb();
};
