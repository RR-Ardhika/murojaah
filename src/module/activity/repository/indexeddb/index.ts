import { Connection } from 'jsstore';

import { initJsStore } from '@/database/indexeddb/connection';

import * as entity from '../../entity';

export * from './export-import';

const idbCon: Connection = initJsStore();

export const findAll = (): Promise<entity.Activity[]> => {
  return idbCon.select<entity.Activity>({
    from: 'histories',
    order: { by: 'occuredAt', type: 'desc' },
  });
};

export const insert = (item: entity.Activity): Promise<number | unknown[]> => {
  return idbCon.insert({ into: 'histories', values: [item] });
};

export const deleteRecord = (item: entity.Activity): Promise<number> => {
  return idbCon.remove({
    from: 'histories',
    where: { id: item.id },
  });
};
