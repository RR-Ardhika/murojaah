import { Payload, History, MurojaahType } from '@/api/module/murojaah/entity';
import { FindAll, Insert, DeleteRecord } from '@/api/module/murojaah/repository/indexeddb';
import { DateTime } from 'luxon';

export function Index(): Promise<unknown> {
  return FindAll();
}

export function Create(payload: Payload): Promise<unknown> {
  if (!payload.juz || !payload.murojaahMethodId)
    return Promise.reject(new Error('Error 422 Unprocessable Entity'));

  const history: History = {
    murojaahType: MurojaahType.Juz,
    juz: payload.juz,
    murojaahMethodId: payload.murojaahMethodId,
    totalMurojaah: 100, // TODO remove hardcoded
    occuredAt: DateTime.now().toJSDate(),
  };

  console.log(history);

  return Insert(history);
}

export function Destroy(item: History): Promise<unknown> {
  return DeleteRecord(item);
}
