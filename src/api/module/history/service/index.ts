import * as entity from '@/api/module/history/entity';
import * as repo from '@/api/module/history/repository/indexeddb';
import { create } from '@/api/module/history/service/create';

export { create };

export function index(): Promise<entity.History[]> {
  return repo.findAll();
}

export function destroy(item: entity.History): Promise<number> {
  return repo.deleteRecord(item);
}

export function exportData(): Promise<Blob> {
  return repo.exportData();
}

export function importData(jsonString: Blob): Promise<void> {
  return repo.importData(jsonString);
}

export function dropDb(): Promise<void> {
  return repo.dropDb();
}
