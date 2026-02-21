import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

import * as util from '@/shared/util/validator';

import * as entity from '../entity';
import * as repo from '../repository/indexeddb';

export const create = (payload: entity.Payload): Promise<string> => {
  if (util.findEmpty(payload))
    return Promise.reject(new Error('Error 422 Unprocessable Entity error validating payload'));

  switch (payload.activityType) {
    case entity.ActivityType.Juz:
      return createByJuz(payload);
    case entity.ActivityType.Surah:
      return createBySurah(payload);
    case entity.ActivityType.Ayah:
      return createByAyah(payload);
    default:
      return Promise.reject(new Error('Error 422 Unprocessable Entity ActivityType not defined'));
  }
};

const createByJuz = (payload: entity.Payload): Promise<string> => {
  const activity: entity.Activity = {
    id: uuidv4(),
    activityType: payload.activityType,
    juz: payload.juz,
    approachId: payload.approachId,
    repeat: payload.repeat,
    occuredAt: payload.occuredAt,
  };

  return repo.insert(activity);
};

const createBySurah = (payload: entity.Payload): Promise<string> => {
  if (!payload.surahOptions)
    return Promise.reject(
      new Error('Error 422 Unprocessable Entity error validating surah payload')
    );

  let occuredAt: DateTime = DateTime.fromJSDate(payload.occuredAt);
  let lastId: string = '';

  for (const [i, opt] of payload.surahOptions.entries()) {
    const id: string = uuidv4();
    const activity: entity.Activity = {
      id,
      activityType: payload.activityType,
      surah: opt.value,
      approachId: payload.approachId,
      repeat: payload.repeat,
      occuredAt: occuredAt.toJSDate(),
    };

    if (payload.surahOptions && i === payload.surahOptions.length - 1 && payload.markJuzDone)
      activity.markJuzDone = payload.markJuzDone;

    repo.insert(activity);
    lastId = id;

    occuredAt = occuredAt.plus({ milliseconds: 1 });
  }

  return Promise.resolve(lastId);
};

const createByAyah = (payload: entity.Payload): Promise<string> => {
  const activity: entity.Activity = {
    id: uuidv4(),
    activityType: payload.activityType,
    surah: payload.surah,
    startAyah: payload.startAyah,
    endAyah: payload.endAyah,
    markSurahDone: payload.markSurahDone,
    markJuzDone: payload.markJuzDone,
    approachId: payload.approachId,
    repeat: payload.repeat,
    occuredAt: payload.occuredAt,
  };

  return repo.insert(activity);
};
