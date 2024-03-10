import { Payload, History, HistoryType } from '@/api/module/history/entity';
import { FindAll, Insert, DeleteRecord } from '@/api/module/history/repository/indexeddb';
import { DateTime } from 'luxon';

export function Index(): Promise<unknown> {
  return FindAll();
}

export function Create(payload: Payload): Promise<unknown> {
  if (!payload.juz || !payload.approachId)
    return Promise.reject(new Error('Error 422 Unprocessable Entity'));

  const history: History = {
    historyType: HistoryType.Juz,
    juz: payload.juz,
    approachId: payload.approachId,
    repeat: 1, // Hardcoded to 1 for juz
    occuredAt: DateTime.now().toJSDate(),
  };

  return Insert(history);
}

export function Destroy(item: History): Promise<unknown> {
  return DeleteRecord(item);
}
