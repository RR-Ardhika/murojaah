import { Payload, History, HistoryType } from '@/api/module/history/entity';
import { Insert } from '@/api/module/history/repository/indexeddb';
import { DateTime } from 'luxon';

export function Create(payload: Payload): Promise<unknown> {
  switch (payload.historyType) {
    case HistoryType.Juz:
      return CreateJuz(payload);
    case HistoryType.Surah:
      return CreateSurah(payload);
    default:
      return Promise.reject(new Error('Error 422 Unprocessable Entity HistoryType not defined'));
  }
}

function CreateJuz(payload: Payload): Promise<unknown> {
  if (!payload.juz || !payload.approachId || !payload.repeat)
    return Promise.reject(new Error('Error 422 Unprocessable Entity error validating juz payload'));

  const history: History = {
    // @ts-expect-error handled undefined value
    historyType: payload.historyType,
    juz: payload.juz,
    approachId: payload.approachId,
    repeat: payload.repeat,
    occuredAt: DateTime.now().toJSDate(),
  };

  return Insert(history);
}

function CreateSurah(payload: Payload): Promise<unknown> {
  // TODO handle markJuzDone when value is false
  if (!payload.surah || !payload.surahName || !payload.approachId || !payload.repeat)
    return Promise.reject(
      new Error('Error 422 Unprocessable Entity error validating surah payload')
    );

  const history: History = {
    // @ts-expect-error handled undefined value
    historyType: payload.historyType,
    surah: payload.surah,
    surahName: payload.surahName,
    markJuzDone: payload.markJuzDone,
    approachId: payload.approachId,
    repeat: payload.repeat,
    occuredAt: DateTime.now().toJSDate(),
  };

  return Insert(history);
}
