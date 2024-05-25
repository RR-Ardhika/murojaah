import { Connection } from 'jsstore';
import { initJsStore } from '@/api/database/indexeddb/connection';
import { History } from '@/api/module/history/entity';

const idbCon: Connection = initJsStore();

export function FindAll(): Promise<unknown> {
  const pageSize = 5;
  const pageNumber = 1;

  return idbCon.select<History>({
    from: 'histories',
    limit: pageSize,
    skip: (pageNumber - 1) * pageSize,
    order: { by: 'id', type: 'desc' },
  });
}

export function Insert(item: History): Promise<unknown> {
  return idbCon.insert({ into: 'histories', values: [item] });
}

export function DeleteRecord(item: History): Promise<unknown> {
  const id: number = item.id ?? -1;
  return idbCon.remove({
    from: 'histories',
    where: { id: id },
  });
}
