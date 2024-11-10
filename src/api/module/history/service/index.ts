import * as entity from '@/api/module/history/entity';
import * as repo from '@/api/module/history/repository/indexeddb';
import { Create } from '@/api/module/history/service/create';

export { Create };

export function Index(): Promise<entity.History[]> {
  return repo.FindAll();
}

export function Destroy(item: entity.History): Promise<number> {
  return repo.DeleteRecord(item);
}

export function Export(): Promise<Blob> {
  return repo.Export();
}

export function Import(jsonString: Blob): Promise<void> {
  return repo.Import(jsonString);
}
