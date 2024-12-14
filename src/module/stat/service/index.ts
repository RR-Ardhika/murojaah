import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

import * as entityHistory from '@/module/history/entity';
import * as repoHistory from '@/module/history/repository/indexeddb';
import * as entityJuz from '@/shared/entity/juz';
import * as entitySurah from '@/shared/entity/surah';
import * as serviceJuz from '@/shared/service/juz';
import * as serviceSurah from '@/shared/service/surah';

import * as entity from '../entity';

export const index = async (): Promise<entity.Stat[]> => {
  const histories: entityHistory.History[] = await repoHistory.findAll();
  return calculateStats(histories);
};

const calculateStats = (histories: entityHistory.History[]): entity.Stat[] => {
  const stats: entity.Stat[] = [];
  stats.push(calculateAllTimeStat(histories));
  stats.push(calculateDailyStat(histories));
  return stats;
};

const calculateAllTimeStat = (histories: entityHistory.History[]): entity.Stat => {
  let totalLinesRead: number = 0;

  for (const history of histories) totalLinesRead += calculateTotalLinesFromHistory(history);

  return {
    id: uuidv4(),
    statType: Object.values(entity.StatType).indexOf(entity.StatType.All),
    totalLinesRead: totalLinesRead,
    totalJuzFromLines: serviceJuz.getTotalJuzFromLines(totalLinesRead),
    totalMarkedJuzAsDone: 0, // TD-10 Implement totalMarkedJuzAsDone calculation in module stat
  };
};

const calculateDailyStat = (histories: entityHistory.History[]): entity.Stat => {
  const now: DateTime = DateTime.now();
  let totalLinesRead: number = 0;

  for (const history of histories) {
    const occuredAt: DateTime = DateTime.fromJSDate(history.occuredAt);
    if (!occuredAt.hasSame(now, 'day')) continue;
    totalLinesRead += calculateTotalLinesFromHistory(history);
  }

  return {
    id: uuidv4(),
    statType: Object.values(entity.StatType).indexOf(entity.StatType.Daily),
    totalLinesRead: totalLinesRead,
    totalJuzFromLines: serviceJuz.getTotalJuzFromLines(totalLinesRead),
    totalMarkedJuzAsDone: 0, // TD-10 Implement totalMarkedJuzAsDone calculation in module stat
  };
};

const calculateTotalLinesFromHistory = (history: entityHistory.History): number => {
  switch (history.historyType) {
    case entityHistory.HistoryType.Juz:
      return calculateTotalLinesForJuz(history);
    case entityHistory.HistoryType.Surah:
      return calculateTotalLinesForSurah(history);
    case entityHistory.HistoryType.Ayah:
      return calculateTotalLinesForAyah(history);
    default:
      return 0;
  }
};

const calculateTotalLinesForJuz = (history: entityHistory.History): number => {
  // @ts-expect-error known type
  const juz: entityJuz.JuzType = serviceJuz.getJuzById(history.juz);
  let totalLines: number = 0;

  // eslint-disable-next-line @typescript-eslint/typedef
  for (let i = juz.startSurah; i <= juz.endSurah; i++) {
    // @ts-expect-error known type
    totalLines += serviceSurah.getSurahById(i).totalLines;
  }

  return totalLines;
};

const calculateTotalLinesForSurah = (history: entityHistory.History): number => {
  // @ts-expect-error known type
  const surah: entitySurah.SurahType = serviceSurah.getSurahById(history.surah);
  return surah.totalLines * history.repeat;
};

const calculateTotalLinesForAyah = (history: entityHistory.History): number => {
  // @ts-expect-error known type
  const surah: entitySurah.SurahType = serviceSurah.getSurahById(history.surah);
  // @ts-expect-error known type
  const surahJuz: number[] | SurahJuz[] = serviceSurah.getJuzBySurahId(history.surah);
  let totalLines: number = 0;

  if (history.markJuzDone) {
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
  } else if (history.markSurahDone) {
    totalLines += surah.totalLines;
  }

  return totalLines;
};

export const getHistoryStat = (history: entityHistory.History): entity.HistoryStat => {
  const lines: number = calculateTotalLinesFromHistory(history);
  return {
    juz: serviceJuz.getTotalJuzFromLines(lines),
    ayah: getTotalAyah(history),
    lines: lines,
  };
};

const getTotalAyah = (history: entityHistory.History): number => {
  let totalAyah: number = 0;

  switch (history.historyType) {
    case entityHistory.HistoryType.Juz:
      // @ts-expect-error known type
      const juz: entityJuz.JuzType = serviceJuz.getJuzById(history.juz);
      // eslint-disable-next-line @typescript-eslint/typedef
      for (let i = juz.startSurah; i <= juz.endSurah; i++) {
        // @ts-expect-error known type
        totalAyah += serviceSurah.getSurahById(i)?.totalAyah;
      }
      break;
    case entityHistory.HistoryType.Surah:
      // @ts-expect-error expected undefined
      const surah: entitySurah.SurahType = serviceSurah.getSurahById(history.surah);
      totalAyah = surah.totalAyah * history.repeat;
      break;
    case entityHistory.HistoryType.Ayah:
      // @ts-expect-error expected undefined
      totalAyah = (history.endAyah - history.startAyah + 1) * history.repeat;
      break;
  }

  return totalAyah;
};

export const getStatType = (id: number): entity.StatType => {
  // @ts-expect-error access enum value with index
  return entity.StatType[Object.keys(entity.StatType)[id]];
};
