import * as entity from '@/api/module/history/entity';
import { Connection } from 'jsstore';

import { initJsStore } from '@/api/database/indexeddb/connection';

const idbCon: Connection = initJsStore();

export function FindAll(): Promise<History[]> {
  return idbCon.select<History>({ from: 'histories', order: { by: 'occuredAt', type: 'desc' } });
}

export function Insert(item: entity.History): Promise<unknown> {
  return idbCon.insert({ into: 'histories', values: [item] });
}

export function DeleteRecord(item: History): Promise<number> {
  return idbCon.remove({
    from: 'histories',
    where: { id: item.id },
  });
}

export function Export(): void {
  console.log('export');
}

export function Import(): void {
  console.log('import');
}
