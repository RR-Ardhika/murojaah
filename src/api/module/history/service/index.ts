import { History } from '@/api/module/history/entity';
import { FindAll, DeleteRecord } from '@/api/module/history/repository/indexeddb';
import { Create } from '@/api/module/history/service/create';

export { Create };

export function Index(): Promise<unknown> {
  return FindAll();
}

export function Destroy(item: History): Promise<unknown> {
  return DeleteRecord(item);
}
