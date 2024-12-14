import * as entityStat from '@/module/stat/entity';
import * as serviceStat from '@/module/stat/service';
import * as sharedEntity from '@/shared/entity';
import * as util from '@/shared/util';

import { create } from './create';
import * as entity from '../entity';
import * as repo from '../repository/indexeddb';

export { create };

export const index = async (): Promise<entity.HistoryGroup[]> => {
  const mapHistoryGroups: Map<string, entity.HistoryGroup> = new Map();

  const data: entity.History[] = await repo.findAll();
  if (!data || data.length === 0) {
    return Promise.reject(new Error('Error 400 empty activity'));
  }

  for (const item of data) {
    const key: string = util.formatDate(item.occuredAt);

    if (!mapHistoryGroups.has(key)) {
      const newStat: entityStat.HistoryStat = serviceStat.getHistoryStat(item);
      mapHistoryGroups.set(key, {
        date: key,
        histories: [item],
        stat: newStat,
      });
      continue;
    }

    const group: entity.HistoryGroup = mapHistoryGroups.get(key)!;
    const newStat: entityStat.HistoryStat = serviceStat.getHistoryStat(item);
    group.stat.ayah += newStat.ayah;
    group.stat.lines += newStat.lines;
    group.stat.juz = sharedEntity.getTotalJuzFromLines(group.stat.lines);
    group.histories.push(item);
  }

  return Array.from(mapHistoryGroups.values());
};

export const destroy = (item: entity.History): Promise<number> => {
  return repo.deleteRecord(item);
};

export const exportData = (): Promise<Blob> => {
  return repo.exportData();
};

export const importData = (jsonString: Blob): Promise<void> => {
  return repo.importData(jsonString);
};

export const dropDb = (): Promise<void> => {
  return repo.dropDb();
};
