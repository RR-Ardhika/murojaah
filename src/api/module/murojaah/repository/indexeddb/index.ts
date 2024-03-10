import { idbCon } from '@/api/database/indexeddb/connection';
import { History } from '@/api/module/murojaah/entity';

export function FindAll(): Promise<unknown> {
  return idbCon.select<History>({ from: 'histories', order: { by: 'id', type: 'desc' } });
}

export function Insert(item: History): Promise<unknown> {
  return idbCon.insert({ into: 'histories', values: [item] });
}

export function DeleteRecord(id: number): Promise<unknown> {
  return idbCon.remove({
    from: 'histories',
    where: { id: id },
  });
}
