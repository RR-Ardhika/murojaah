import { v4 as uuidv4 } from 'uuid';

import * as entity from '@/api/module/history/entity';
import * as repo from '@/api/module/history/repository/indexeddb';
import * as util from '@/api/shared/util/validator';

export function create(payload: entity.Payload): Promise<number | unknown[]> {
  switch (payload.historyType) {
    case entity.HistoryType.Juz:
      return createByJuz(payload);
    case entity.HistoryType.Surah:
      return createBySurah(payload);
    case entity.HistoryType.Ayah:
      return createByAyah(payload);
    default:
      return Promise.reject(new Error('Error 422 Unprocessable Entity HistoryType not defined'));
  }
}

function createByJuz(payload: entity.Payload): Promise<number | unknown[]> {
  if (util.findEmpty(payload))
    return Promise.reject(new Error('Error 422 Unprocessable Entity error validating juz payload'));

  const history: entity.History = {
    id: uuidv4(),
    historyType: payload.historyType,
    juz: payload.juz,
    approachId: payload.approachId,
    repeat: payload.repeat,
    occuredAt: payload.occuredAt,
  };

  return repo.insert(history);
}

function createBySurah(payload: entity.Payload): Promise<number | unknown[]> {
  if (util.findEmpty(payload))
    return Promise.reject(
      new Error('Error 422 Unprocessable Entity error validating surah payload')
    );

  // @ts-expect-error handled undefined value
  for (const [i, opt] of payload.surahOptions.entries()) {
    const history: entity.History = {
      id: uuidv4(),
      historyType: payload.historyType,
      surah: opt.value,
      approachId: payload.approachId,
      repeat: payload.repeat,
      occuredAt: payload.occuredAt,
    };

    // @ts-expect-error handled undefined value
    if (i === payload.surahOptions.length - 1 && payload.markJuzDone)
      history.markJuzDone = payload.markJuzDone;

    repo.insert(history);
  }

  return Promise.resolve(-1);
}

function createByAyah(payload: entity.Payload): Promise<number | unknown[]> {
  if (util.findEmpty(payload))
    return Promise.reject(
      new Error('Error 422 Unprocessable Entity error validating surah payload')
    );

  const history: entity.History = {
    id: uuidv4(),
    historyType: payload.historyType,
    surah: payload.surah,
    startAyah: payload.startAyah,
    endAyah: payload.endAyah,
    markSurahDone: payload.markSurahDone,
    markJuzDone: payload.markJuzDone,
    approachId: payload.approachId,
    repeat: payload.repeat,
    occuredAt: payload.occuredAt,
  };

  return repo.insert(history);
}
