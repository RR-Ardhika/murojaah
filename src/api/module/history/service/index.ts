import * as entity from '@/api/module/history/entity';
import * as repo from '@/api/module/history/repository/indexeddb';
import { Create } from '@/api/module/history/service/create';

export { Create };

export function Index(): Promise<unknown> {
  return repo.FindAll();
}

export function Destroy(item: entity.History): Promise<unknown> {
  return repo.DeleteRecord(item);
}

export function Export(): Promise<unknown> {
  return repo.Export();
}

export function Import(): void {
  return repo.Import();
}
