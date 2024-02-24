import { Option } from '@/api/module/murojaah/entity/murojaah';
import { FindAll, Insert } from '@/api/module/murojaah/repository/indexeddb';
import { History } from '@/api/module/murojaah/entity/murojaah';

export function Index(): History[] {
  return FindAll();
}

export function Create(payload: Option): [History, Error] {
  const history: History = {
    juz: payload.value,
  };

  Insert(history);
}
