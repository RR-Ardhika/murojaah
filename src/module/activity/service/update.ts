import * as util from '@/shared/util/validator';

import * as entity from '../entity';
import * as repo from '../repository/indexeddb';

export const update = (payload: entity.Payload): Promise<number | unknown[]> => {
  if (util.findEmpty(payload))
    return Promise.reject(new Error('Error 422 Unprocessable Entity error validating payload'));

  switch (payload.activityType) {
    // case entity.ActivityType.Juz:
    //   return updateByJuz(payload);
    case entity.ActivityType.Surah:
      return updateBySurah(payload);
    // case entity.ActivityType.Ayah:
    //   return updateByAyah(payload);
    default:
      return Promise.reject(new Error('Error 422 Unprocessable Entity ActivityType not defined'));
  }
};

const updateBySurah = (payload: entity.Payload): Promise<number | unknown[]> => {
  if (!payload.id)
    return Promise.reject(
      new Error('Error 422 Unprocessable Entity error validating surah payload')
    );

  const activity: entity.Activity = {
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
