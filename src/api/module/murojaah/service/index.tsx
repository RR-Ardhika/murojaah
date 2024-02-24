import { Option, History, MurojaahType } from '@/api/module/murojaah/entity/murojaah';
import { FindAll, Insert } from '@/api/module/murojaah/repository/indexeddb';
import { DateTime } from 'luxon';

export function Index(): History[] {
  return FindAll();
}

export function Create(payload: Option): [History, Error] {
  // TODO Implement payload validation

  const history: History = {
    murojaahType: MurojaahType.Juz,
    juz: payload.value,
    murojaahMethod: 'Memory', // TODO remove hardcoded
    totalMurojaah: 100, // TODO remove hardcoded
    occuredAt: DateTime.now().toJSDate(),
  };

  return Insert(history);
}
