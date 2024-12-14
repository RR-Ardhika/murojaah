import * as entityHistory from '@/module/history/entity';
import * as repoHistory from '@/module/history/repository/indexeddb';
import * as entityStat from '@/module/stat/entity';
import * as serviceStat from '@/module/stat/service';
import * as sharedEntity from '@/shared/entity';
import * as util from '@/shared/util';

import * as entity from '../entity';

export const index = async (): Promise<entity.Activity[]> => {
  const mapActivities: Map<string, entity.Activity> = new Map();

  const data: entityHistory.History[] = await repoHistory.findAll();
  if (!data || data.length === 0) {
    return Promise.reject(new Error('Error 400 empty activity'));
  }

  for (const item of data) {
    const key: string = util.formatDateYearFirst(item.occuredAt);

    if (!mapActivities.has(key)) {
      const newStat: entityStat.HistoryStat = serviceStat.getHistoryStat(item);
      mapActivities.set(key, {
        date: key,
        stat: newStat,
      });
      continue;
    }

    const activity: entity.Activity = mapActivities.get(key)!;
    const newStat: entityStat.HistoryStat = serviceStat.getHistoryStat(item);
    activity.stat.ayah += newStat.ayah;
    activity.stat.lines += newStat.lines;
    activity.stat.juz = sharedEntity.getTotalJuzFromLines(activity.stat.lines);
  }

  return Array.from(mapActivities.values());
};
