import * as entityHistory from '@/module/history/entity';
import * as repoHistory from '@/module/history/repository/indexeddb';

import * as entity from '../entity';
import * as repo from '../repository/indexeddb';

export const index = async (): Promise<entity.Counter[]> => {
  const histories: entityHistory.History[] = await repoHistory.findAll();
  return repo.calculateCounters(histories);
};
