import * as entityHistory from '@/module/history/entity';
import * as repoHistory from '@/module/history/repository/indexeddb';

import * as entity from '../entity';
import * as repo from '../repository/indexeddb';

export const index = async (): Promise<entity.Stat[]> => {
  const histories: entityHistory.History[] = await repoHistory.findAll();
  return repo.calculateStats(histories);
};

export const getHistoryStat = (history: entityHistory.History): entity.HistoryStat => {
  return repo.getHistoryStat(history);
};

export const getStatType = (id: number): entity.StatType => {
  return repo.findStatType(id);
};
