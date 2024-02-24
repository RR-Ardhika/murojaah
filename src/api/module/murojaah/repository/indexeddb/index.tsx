import { idbCon } from '@/api/database/indexeddb/connection';
import { History } from '@/api/module/murojaah/entity/murojaah';

export function FindAll(): Promise<unknown> {
  return idbCon.select<History>({ from: 'histories', order: { by: 'id', type: 'desc' } });
}

export function Insert(history: History): Promise<unknown> {
  return idbCon.insert({ into: 'histories', values: [history] });
}
