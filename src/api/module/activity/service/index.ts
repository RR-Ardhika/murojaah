import { DateTime } from 'luxon';

import * as entity from '@/api/module/activity/entity';
import * as entityHistory from '@/api/module/history/entity';
import * as repoHistory from '@/api/module/history/repository/indexeddb';
import * as entityStat from '@/api/module/stat/entity';
import * as repoStat from '@/api/module/stat/repository/indexeddb';
import * as sharedEntity from '@/api/shared/entity';

export const index = async (): Promise<entity.Activity[]> => {
  const activities: entity.Activity[] = [];
  const mapHistoryStats: Map<string, entityStat.HistoryStat> = new Map();
  const mapIsProcessed: Map<string, boolean> = new Map();

  const data: entityHistory.History[] = await repoHistory.findAll();
  if (!data) return Promise.reject(new Error('Error 400 empty history'));

  data.forEach((item: entityHistory.History) => {
    const key: string = formatDate(item.occuredAt);
    const itemId: string = item.id;

    if (!mapHistoryStats.has(key)) {
      mapHistoryStats.set(key, repoStat.getHistoryStat(item));
      mapIsProcessed.set(itemId, true);
      return;
    }

    const stat: entityStat.HistoryStat | undefined = mapHistoryStats.get(key);
    const isProcessed: boolean | undefined = mapIsProcessed.get(itemId);

    if (isProcessed || !stat) return;

    const newStat: entityStat.HistoryStat = repoStat.getHistoryStat(item);
    stat.ayah += newStat.ayah;
    stat.lines += newStat.lines;
    stat.juz = sharedEntity.getTotalJuzFromLines(stat.lines);

    mapHistoryStats.set(key, stat);
    mapIsProcessed.set(itemId, true);
  });

  for (const [k, v] of mapHistoryStats.entries()) {
    activities.push({ date: k, juz: v.juz });
  }

  return activities;
};

const formatDate = (date: Date): string => {
  const parsedTime: DateTime = DateTime.fromJSDate(date);
  if (!parsedTime.isValid) return '';
  return parsedTime.toFormat('yyyy-MM-dd EEE');
};
