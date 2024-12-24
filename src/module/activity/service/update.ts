import * as util from '@/shared/util/validator';

import * as entity from '../entity';
import * as repo from '../repository/indexeddb';

export const update = (payload: entity.Payload): Promise<number | unknown[]> => {
  if (util.findEmpty(payload) || !payload.id)
    return Promise.reject(new Error('Error 422 Unprocessable Entity error validating payload'));

  switch (payload.activityType) {
    case entity.ActivityType.Juz:
      return updateByJuz(payload);
    case entity.ActivityType.Surah:
      return updateBySurah(payload);
    case entity.ActivityType.Ayah:
      return updateByAyah(payload);
    default:
      return Promise.reject(new Error('Error 422 Unprocessable Entity ActivityType not defined'));
  }
};

const updateByJuz = (payload: entity.Payload): Promise<number | unknown[]> => {
  const activity: entity.Activity = {
    // @ts-expect-error validated value
    id: payload.id,
    activityType: payload.activityType,
    juz: payload.juz,
    approachId: payload.approachId,
    repeat: payload.repeat,
    occuredAt: payload.occuredAt,
  };

  return repo.update(activity);
};

const updateBySurah = (payload: entity.Payload): Promise<number | unknown[]> => {
  const activity: entity.Activity = {
    // @ts-expect-error validated value
    id: payload.id,
    activityType: payload.activityType,
    surah: payload.surah,
    approachId: payload.approachId,
    repeat: payload.repeat,
    occuredAt: payload.occuredAt,
  };

  repo.update(activity);

  return Promise.resolve(-1);
};

const updateByAyah = (payload: entity.Payload): Promise<number | unknown[]> => {
  const activity: entity.Activity = {
    // @ts-expect-error validated value
    id: payload.id,
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

  return repo.update(activity);
};
