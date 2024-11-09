import { Connection } from 'jsstore';

import { initJsStore } from '@/api/database/indexeddb/connection';
import { History } from '@/api/module/history/entity';

const idbCon: Connection = initJsStore();

export function FindAll(): Promise<History[]> {
  return idbCon.select<History>({ from: 'histories', order: { by: 'occuredAt', type: 'desc' } });
}

export function Insert(item: History): Promise<unknown> {
  return idbCon.insert({ into: 'histories', values: [item] });
}

export function DeleteRecord(item: History): Promise<number> {
  if (!item.id) return Promise.reject(new Error('Invalid id'));
  return idbCon.remove({
    from: 'histories',
    where: { id: item.id },
  });
}
