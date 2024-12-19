import { DateTime } from 'luxon';

import * as entity from '@/api/module/activity/entity';
import * as entityHistory from '@/api/module/history/entity';
import * as repoHistory from '@/api/module/history/repository/indexeddb';
import * as entityStat from '@/api/module/stat/entity';
import * as repoStat from '@/api/module/stat/repository/indexeddb';
import * as sharedEntity from '@/api/shared/entity';

export const index = async (): Promise<entity.Activity[]> => {
  const mapActivities: Map<string, entity.Activity> = new Map();

  const data: entityHistory.History[] = await repoHistory.findAll();
  if (!data || data.length === 0) {
    return Promise.reject(new Error('Error 400 empty activity'));
  }

  for (const item of data) {
    const key: string = formatDate(item.occuredAt);

    if (!mapActivities.has(key)) {
      const newStat: entityStat.HistoryStat = repoStat.getHistoryStat(item);
      mapActivities.set(key, {
        date: key,
        stat: newStat,
      });
      continue;
    }

    const activity: entity.Activity = mapActivities.get(key)!;
    const newStat: entityStat.HistoryStat = repoStat.getHistoryStat(item);
    activity.stat.ayah += newStat.ayah;
    activity.stat.lines += newStat.lines;
    activity.stat.juz = sharedEntity.getTotalJuzFromLines(activity.stat.lines);
  }

  return Array.from(mapActivities.values());
};

const formatDate = (date: Date): string => {
  const parsedTime: DateTime = DateTime.fromJSDate(date);
  if (!parsedTime.isValid) return '';
  return parsedTime.toFormat('yyyy-MM-dd EEE');
};
