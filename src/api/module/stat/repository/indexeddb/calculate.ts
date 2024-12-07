import { DateTime } from 'luxon';

import * as entityHistory from '@/api/module/history/entity';
import * as entity from '@/api/module/stat/entity';
import * as entityJuz from '@/api/shared/entity/juz';
import * as entitySurah from '@/api/shared/entity/surah';

export const calculateStats = (histories: entityHistory.History[]): entity.Stat[] => {
  const stats: entity.Stat[] = [];
  stats.push(calculateAllTimeStat(histories));
  stats.push(calculateDailyStat(histories));
  return stats;
};

const calculateAllTimeStat = (histories: entityHistory.History[]): entity.Stat => {
  let totalLinesRead: number = 0;

  for (const history of histories) totalLinesRead += calculateTotalLinesFromHistory(history);

  return {
    id: Math.floor(Math.random() * 10),
    statType: Object.values(entity.StatType).indexOf(entity.StatType.All),
    totalLinesRead: totalLinesRead,
    totalJuzFromLines: entityJuz.getTotalJuzFromLines(totalLinesRead),
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
    id: Math.floor(Math.random() * 10),
    statType: Object.values(entity.StatType).indexOf(entity.StatType.Daily),
    totalLinesRead: totalLinesRead,
    totalJuzFromLines: entityJuz.getTotalJuzFromLines(totalLinesRead),
    totalMarkedJuzAsDone: 0, // TD-10 Implement totalMarkedJuzAsDone calculation in module stat
  };
};

export const calculateTotalLinesFromHistory = (history: entityHistory.History): number => {
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
  const juz: entityJuz.JuzType = entityJuz.getJuzById(history.juz);
  let totalLines: number = 0;

  // eslint-disable-next-line @typescript-eslint/typedef
  for (let i = juz.startSurah; i <= juz.endSurah; i++) {
    // @ts-expect-error known type
    totalLines += entitySurah.getSurahById(i).totalLines;
  }

  return totalLines;
};

const calculateTotalLinesForSurah = (history: entityHistory.History): number => {
  // @ts-expect-error known type
  const surah: entitySurah.SurahType = entitySurah.getSurahById(history.surah);
  return surah.totalLines * history.repeat;
};

const calculateTotalLinesForAyah = (history: entityHistory.History): number => {
  // @ts-expect-error known type
  const surah: entitySurah.SurahType = entitySurah.getSurahById(history.surah);
  // @ts-expect-error known type
  const surahJuz: number[] | SurahJuz[] = entitySurah.getJuzBySurahId(history.surah);
  let totalLines: number = 0;

  if (history.markJuzDone) {
    // eslint-disable-next-line @typescript-eslint/typedef
    if (surahJuz.every((i) => typeof i === 'number')) {
      const juzId: number = surahJuz[0];
      const juz: entityJuz.JuzType | undefined = entityJuz.getJuzById(juzId);
      if (!juz) return totalLines;
      // eslint-disable-next-line @typescript-eslint/typedef
      for (let i = juz.startSurah; i <= juz.endSurah; i++) {
        // @ts-expect-error known type
        totalLines += entitySurah.getSurahById(i).totalLines;
      } // TD-9 Implement handler for type SurahJuz in module stat
    }
  } else if (history.markSurahDone) {
    totalLines += surah.totalLines;
  }

  return totalLines;
};
