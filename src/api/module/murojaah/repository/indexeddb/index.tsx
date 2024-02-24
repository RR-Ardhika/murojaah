import { idbCon } from '@/api/database/connection/indexeddb';
import { History } from '@/api/module/murojaah/entity/murojaah';

export function FindAll(): History[] {
  return idbCon.select<History>({
    from: 'histories',
  });
}

export function Insert(history: History) {
  return idbCon.insert({
    into: 'histories',
    values: [history],
  });
}
