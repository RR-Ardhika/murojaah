import { DateTime } from 'luxon';

import * as entity from '@/api/module/history/entity';
import * as repo from '@/api/module/history/repository/indexeddb';
import { create } from '@/api/module/history/service/create';
import * as repoStat from '@/api/module/stat/repository/indexeddb';
import * as sharedEntity from '@/api/shared/entity';

export { create };

export const index = async (): Promise<entity.HistoryGroup[]> => {
  const mapHistoryGroups = new Map<string, entity.HistoryGroup>();

  const data: entity.History[] = await repo.findAll();
  if (!data || data.length === 0) {
    return Promise.reject(new Error('Error 400 empty activity'));
  }

  for (const item of data) {
    const key = formatDate(item.occuredAt);

    if (!mapHistoryGroups.has(key)) {
      const newStat = repoStat.getHistoryStat(item);
      mapHistoryGroups.set(key, {
        date: key,
        histories: [item],
        stat: newStat,
      });
      continue;
    }

    const group = mapHistoryGroups.get(key)!;
    const newStat = repoStat.getHistoryStat(item);
    group.stat.ayah += newStat.ayah;
    group.stat.lines += newStat.lines;
    group.stat.juz = sharedEntity.getTotalJuzFromLines(group.stat.lines);
    group.histories.push(item);
  }

  return Array.from(mapHistoryGroups.values());
};

const formatDate = (date: Date): string => {
  const parsedTime: DateTime = DateTime.fromJSDate(date);
  if (!parsedTime.isValid) return '';
  return parsedTime.toFormat('yyyy-MM-dd EEE');
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
