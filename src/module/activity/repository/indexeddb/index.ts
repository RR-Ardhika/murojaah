import { Connection } from 'jsstore';

import { initJsStore } from '@/database/indexeddb/connection';

import * as entity from '../../entity';

export * from './export-import';

const idbCon: Connection = initJsStore();

export const findAll = (): Promise<entity.Activity[]> => {
  return idbCon.select<entity.Activity>({
    from: entity.TABLE_NAME,
    order: { by: 'occuredAt', type: 'desc' },
  });
};

export const insert = (item: entity.Activity): Promise<number | unknown[]> => {
  return idbCon.insert({ into: entity.TABLE_NAME, values: [item] });
};

export const update = (item: entity.Activity): Promise<number> => {
  return idbCon.update({
    in: entity.TABLE_NAME,
    where: { id: item.id },
    set: {
      id: item.id,
      activityType: item.activityType,
      juz: item.juz,
      surah: item.surah,
      startAyah: item.startAyah,
      endAyah: item.endAyah,
      markSurahDone: item.markSurahDone,
      markJuzDone: item.markJuzDone,
      approachId: item.approachId,
      repeat: item.repeat,
      occuredAt: item.occuredAt,
    },
  });
};

export const deleteRecord = (item: entity.Activity): Promise<number> => {
  return idbCon.remove({
    from: entity.TABLE_NAME,
    where: { id: item.id },
  });
};
