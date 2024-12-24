import * as entityStat from '@/module/stat/entity';
import * as serviceStat from '@/module/stat/service';
import * as serviceJuz from '@/shared/service/juz';
import * as serviceSurah from '@/shared/service/surah';
import * as util from '@/shared/util';

import * as entity from '../entity';
import * as repo from '../repository/indexeddb';

export * from './create';
export * from './export-import';
export * from './update';

export const index = async (): Promise<entity.ActivityGroup[]> => {
  const mapActivityGroups: Map<string, entity.ActivityGroup> = new Map();

  const data: entity.Activity[] = await repo.findAll();
  if (!data || data.length === 0) {
    return [];
  }

  for (const item of data) {
    const key: string = util.formatDate(item.occuredAt);

    if (!mapActivityGroups.has(key)) {
      const newStat: entityStat.ActivityStat = serviceStat.getActivityStat(item);
      mapActivityGroups.set(key, {
        date: key,
        activities: [item],
        stat: newStat,
      });
      continue;
    }

    const group: entity.ActivityGroup = mapActivityGroups.get(key)!;
    const newStat: entityStat.ActivityStat = serviceStat.getActivityStat(item);
    group.stat.ayah += newStat.ayah;
    group.stat.lines += newStat.lines;
    group.stat.juz = serviceJuz.getTotalJuzFromLines(group.stat.lines);
    group.activities.push(item);
  }

  return Array.from(mapActivityGroups.values());
};

export const destroy = (item: entity.Activity): Promise<number> => {
  return repo.deleteRecord(item);
};

export const getCompactDate = async (): Promise<entity.CompactDate[]> => {
  const mapActivities: Map<string, entity.CompactDate> = new Map();

  const data: entity.Activity[] = await repo.findAll();
  if (!data || data.length === 0) {
    return Promise.reject(new Error('Error 400 empty compact date'));
  }

  for (const item of data) {
    const key: string = util.formatDateYearFirst(item.occuredAt);

    if (!mapActivities.has(key)) {
      const newStat: entityStat.ActivityStat = serviceStat.getActivityStat(item);
      mapActivities.set(key, {
        date: key,
        stat: newStat,
      });
      continue;
    }

    const obj: entity.CompactDate = mapActivities.get(key)!;
    const newStat: entityStat.ActivityStat = serviceStat.getActivityStat(item);
    obj.stat.ayah += newStat.ayah;
    obj.stat.lines += newStat.lines;
    obj.stat.juz = serviceJuz.getTotalJuzFromLines(obj.stat.lines);
  }

  return Array.from(mapActivities.values());
};

export const getListSurah = async (): Promise<entity.ListSurah[]> => {
  const activities: entity.Activity[] = await repo.findAll();
  return calculateCounters(activities);
};

const calculateCounters = (activities: entity.Activity[]): entity.ListSurah[] => {
  const counters: entity.ListSurah[] = [];
  const mapCounter: Map<number, entity.ListSurah> = new Map();

  for (const activity of activities) {
    switch (activity.activityType) {
      case entity.ActivityType.Juz:
        calculateByJuz(activity, mapCounter);
        break;
      case entity.ActivityType.Surah:
        calculateBySurah(activity, mapCounter);
        break;
      // TD-8 Implement calculateByAyah() for module counter
      // case activity.ActivityType.Ayah:
      //   return calculateByAyah(activity);
    }
  }

  // eslint-disable-next-line @typescript-eslint/typedef
  const sortedKeys: number[] = Array.from(mapCounter.keys()).sort((a, b) => a - b);
  // @ts-expect-error known type
  for (const key of sortedKeys) counters.push(mapCounter.get(key));

  return counters;
};

const calculateByJuz = (
  activity: entity.Activity,
  mapCounter: Map<number, entity.ListSurah>
): void => {
  // @ts-expect-error known type
  const juz: entityJuz.JuzType = serviceJuz.getJuzById(activity.juz);

  // eslint-disable-next-line @typescript-eslint/typedef
  for (let i = juz.startSurah; i <= juz.endSurah; i++) {
    // @ts-expect-error known type
    const surah: entitySurah.SurahType = serviceSurah.getSurahById(i);

    const listSurah: entity.ListSurah = {
      id: surah.id,
      juz: surah.juz[0],
      name: surah.name,
      lastRead: activity.occuredAt,
    };

    if (!mapCounter.get(surah.id)) mapCounter.set(surah.id, listSurah);
  }
};

const calculateBySurah = (
  activity: entity.Activity,
  mapCounter: Map<number, entity.ListSurah>
): void => {
  // @ts-expect-error known type
  const surah: entitySurah.SurahType = serviceSurah.getSurahById(activity.surah);

  const listSurah: entity.ListSurah = {
    id: surah.id,
    juz: surah.juz[0],
    name: surah.name,
    lastRead: activity.occuredAt,
  };

  if (!mapCounter.get(surah.id)) mapCounter.set(surah.id, listSurah);
};
