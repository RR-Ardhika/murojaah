import * as entityHistory from '@/api/module/history/entity';
import * as repoHistory from '@/api/module/history/repository/indexeddb';
import * as entity from '@/api/module/stat/entity';
import * as repo from '@/api/module/stat/repository/indexeddb';

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
