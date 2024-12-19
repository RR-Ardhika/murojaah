import { Connection } from 'jsstore';

import { initJsStore } from '@/database/indexeddb/connection';

import * as entity from '../../entity';

export * from './export-import';

const idbCon: Connection = initJsStore();

export const findAll = (): Promise<entity.History[]> => {
  return idbCon.select<entity.History>({
    from: 'histories',
    order: { by: 'occuredAt', type: 'desc' },
  });
};

export const insert = (item: entity.History): Promise<number | unknown[]> => {
  return idbCon.insert({ into: 'histories', values: [item] });
};

export const deleteRecord = (item: entity.History): Promise<number> => {
  return idbCon.remove({
    from: 'histories',
    where: { id: item.id },
  });
};
