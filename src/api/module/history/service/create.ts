import { FindEmpty } from '@/api/shared/util/validator';
import { Payload, History, HistoryType } from '@/api/module/history/entity';
import { Insert } from '@/api/module/history/repository/indexeddb';
import { DateTime } from 'luxon';

export function Create(payload: Payload): Promise<unknown> {
  switch (payload.historyType) {
    case HistoryType.Juz:
      return CreateByJuz(payload);
    case HistoryType.Surah:
      return CreateBySurah(payload);
    case HistoryType.Ayah:
      return CreateByAyah(payload);
    default:
      return Promise.reject(new Error('Error 422 Unprocessable Entity HistoryType not defined'));
  }
}

function CreateByJuz(payload: Payload): Promise<unknown> {
  if (FindEmpty(payload))
    return Promise.reject(new Error('Error 422 Unprocessable Entity error validating juz payload'));

  const history: History = {
    // @ts-expect-error handled undefined value
    historyType: payload.historyType,
    juz: payload.juz,
    // @ts-expect-error handled undefined value
    approachId: payload.approachId,
    // @ts-expect-error handled undefined value
    repeat: payload.repeat,
    occuredAt: DateTime.now().toJSDate(),
  };

  return Insert(history);
}

function CreateBySurah(payload: Payload): Promise<unknown> {
  if (FindEmpty(payload))
    return Promise.reject(
      new Error('Error 422 Unprocessable Entity error validating surah payload')
    );

  // @ts-expect-error handled undefined value
  for (const option of payload.surahOptions) {
    const history: History = {
      // @ts-expect-error handled undefined value
      historyType: payload.historyType,
      surah: option.value,
      // @ts-expect-error handled undefined value
      surahName: option.label,
      markJuzDone: payload.markJuzDone,
      // @ts-expect-error handled undefined value
      approachId: payload.approachId,
      // @ts-expect-error handled undefined value
      repeat: payload.repeat,
      occuredAt: DateTime.now().toJSDate(),
    };

    Insert(history);
  }

  return Promise.resolve();
}

function CreateByAyah(payload: Payload): Promise<unknown> {
  if (FindEmpty(payload))
    return Promise.reject(
      new Error('Error 422 Unprocessable Entity error validating surah payload')
    );

  const history: History = {
    // @ts-expect-error handled undefined value
    historyType: payload.historyType,
    surah: payload.surah,
    surahName: payload.surahName,
    startAyah: payload.startAyah,
    endAyah: payload.endAyah,
    markSurahDone: payload.markSurahDone,
    markJuzDone: payload.markJuzDone,
    // @ts-expect-error handled undefined value
    approachId: payload.approachId,
    // @ts-expect-error handled undefined value
    repeat: payload.repeat,
    occuredAt: DateTime.now().toJSDate(),
  };

  return Insert(history);
}
