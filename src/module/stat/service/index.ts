import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

import * as entityActivity from '@/module/activity/entity';
import * as repoActivity from '@/module/activity/repository/indexeddb';
import * as entityJuz from '@/shared/entity/juz';
import * as entitySurah from '@/shared/entity/surah';
import * as serviceJuz from '@/shared/service/juz';
import * as serviceSurah from '@/shared/service/surah';

import * as entity from '../entity';

export const index = async (): Promise<entity.Stat[]> => {
  const activities: entityActivity.Activity[] = await repoActivity.findAll();
  return calculateStats(activities);
};

const calculateStats = (activities: entityActivity.Activity[]): entity.Stat[] => {
  const stats: entity.Stat[] = [];
  stats.push(calculateAllTimeStat(activities));
  stats.push(calculateDailyStat(activities));
  return stats;
};

const calculateAllTimeStat = (activities: entityActivity.Activity[]): entity.Stat => {
  let totalLinesRead: number = 0;

  for (const activity of activities) totalLinesRead += calculateTotalLinesFromActivity(activity);

  return {
    id: uuidv4(),
    statType: Object.values(entity.StatType).indexOf(entity.StatType.All),
    totalLinesRead: totalLinesRead,
    totalJuzFromLines: serviceJuz.getTotalJuzFromLines(totalLinesRead),
    totalMarkedJuzAsDone: 0, // TD-10 Implement totalMarkedJuzAsDone calculation in module stat
  };
};

const calculateDailyStat = (activities: entityActivity.Activity[]): entity.Stat => {
  const now: DateTime = DateTime.now();
  let totalLinesRead: number = 0;

  for (const activity of activities) {
    const occuredAt: DateTime = DateTime.fromJSDate(activity.occuredAt);
    if (!occuredAt.hasSame(now, 'day')) continue;
    totalLinesRead += calculateTotalLinesFromActivity(activity);
  }

  return {
    id: uuidv4(),
    statType: Object.values(entity.StatType).indexOf(entity.StatType.Daily),
    totalLinesRead: totalLinesRead,
    totalJuzFromLines: serviceJuz.getTotalJuzFromLines(totalLinesRead),
    totalMarkedJuzAsDone: 0, // TD-10 Implement totalMarkedJuzAsDone calculation in module stat
  };
};

const calculateTotalLinesFromActivity = (activity: entityActivity.Activity): number => {
  switch (activity.activityType) {
    case entityActivity.ActivityType.Juz:
      return calculateTotalLinesForJuz(activity);
    case entityActivity.ActivityType.Surah:
      return calculateTotalLinesForSurah(activity);
    case entityActivity.ActivityType.Ayah:
      return calculateTotalLinesForAyah(activity);
    default:
      return 0;
  }
};

const calculateTotalLinesForJuz = (activity: entityActivity.Activity): number => {
  // @ts-expect-error known type
  const juz: entityJuz.JuzType = serviceJuz.getJuzById(activity.juz);
  let totalLines: number = 0;

  // eslint-disable-next-line @typescript-eslint/typedef
  for (let i = juz.startSurah; i <= juz.endSurah; i++) {
    // @ts-expect-error known type
    totalLines += serviceSurah.getSurahById(i).totalLines;
  }

  return totalLines;
};

const calculateTotalLinesForSurah = (activity: entityActivity.Activity): number => {
  // @ts-expect-error known type
  const surah: entitySurah.SurahType = serviceSurah.getSurahById(activity.surah);
  return surah.totalLines * activity.repeat;
};

const calculateTotalLinesForAyah = (activity: entityActivity.Activity): number => {
  // @ts-expect-error known type
  const surah: entitySurah.SurahType = serviceSurah.getSurahById(activity.surah);
  // @ts-expect-error known type
  const surahJuz: number[] | SurahJuz[] = serviceSurah.getJuzBySurahId(activity.surah);
  let totalLines: number = 0;

  if (activity.markJuzDone) {
    // eslint-disable-next-line @typescript-eslint/typedef
    if (surahJuz.every((i) => typeof i === 'number')) {
      const juzId: number = surahJuz[0];
      const juz: entityJuz.JuzType | undefined = serviceJuz.getJuzById(juzId);
      if (!juz) return totalLines;
      // eslint-disable-next-line @typescript-eslint/typedef
      for (let i = juz.startSurah; i <= juz.endSurah; i++) {
        // @ts-expect-error known type
        totalLines += serviceSurah.getSurahById(i).totalLines;
      } // TD-9 Implement handler for type SurahJuz in module stat
    }
  } else if (activity.markSurahDone) {
    totalLines += surah.totalLines;
  }

  return totalLines;
};

export const getActivityStat = (activity: entityActivity.Activity): entity.ActivityStat => {
  const lines: number = calculateTotalLinesFromActivity(activity);
  return {
    juz: serviceJuz.getTotalJuzFromLines(lines),
    ayah: getTotalAyah(activity),
    lines: lines,
  };
};

const getTotalAyah = (activity: entityActivity.Activity): number => {
  let totalAyah: number = 0;

  switch (activity.activityType) {
    case entityActivity.ActivityType.Juz:
      // @ts-expect-error known type
      const juz: entityJuz.JuzType = serviceJuz.getJuzById(activity.juz);
      // eslint-disable-next-line @typescript-eslint/typedef
      for (let i = juz.startSurah; i <= juz.endSurah; i++) {
        // @ts-expect-error known type
        totalAyah += serviceSurah.getSurahById(i)?.totalAyah;
      }
      break;
    case entityActivity.ActivityType.Surah:
      // @ts-expect-error expected undefined
      const surah: entitySurah.SurahType = serviceSurah.getSurahById(activity.surah);
      totalAyah = surah.totalAyah * activity.repeat;
      break;
    case entityActivity.ActivityType.Ayah:
      // @ts-expect-error expected undefined
      totalAyah = (activity.endAyah - activity.startAyah + 1) * activity.repeat;
      break;
  }

  return totalAyah;
};

export const getStatType = (id: number): entity.StatType => {
  // @ts-expect-error access enum value with index
  return entity.StatType[Object.keys(entity.StatType)[id]];
};
