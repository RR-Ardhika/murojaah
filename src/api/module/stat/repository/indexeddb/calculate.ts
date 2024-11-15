import * as entity from '@/api/module/stat/entity';
import * as entityHistory from '@/api/module/history/entity';
import * as entityJuz from '@/api/shared/entity/juz';
import * as entitySurah from '@/api/shared/entity/surah';
import { DateTime } from 'luxon';

export function CalculateStats(histories: entityHistory.History[]): entity.Stat[] {
  const stats: entity.Stat[] = [];
  stats.push(calculateAllTimeStat(histories));
  stats.push(calculateDailyStat(histories));
  return stats;
}

function calculateAllTimeStat(histories: entityHistory.History[]): entity.Stat {
  let totalLinesRead: number = 0;

  for (const history of histories) totalLinesRead += CalculateTotalLinesFromHistory(history);

  return {
    id: Math.floor(Math.random() * 10),
    statType: Object.values(entity.StatType).indexOf(entity.StatType.All),
    totalLinesRead: totalLinesRead,
    totalJuzFromLines: entityJuz.GetTotalJuzFromLines(totalLinesRead),
    totalMarkedJuzAsDone: 0, // TD-10 Implement totalMarkedJuzAsDone calculation in module stat
  };
}

function calculateDailyStat(histories: entityHistory.History[]): entity.Stat {
  const now: DateTime = DateTime.now();
  let totalLinesRead: number = 0;

  for (const history of histories) {
    const occuredAt: DateTime = DateTime.fromJSDate(history.occuredAt);
    if (!occuredAt.hasSame(now, 'day')) continue;
    totalLinesRead += CalculateTotalLinesFromHistory(history);
  }

  return {
    id: Math.floor(Math.random() * 10),
    statType: Object.values(entity.StatType).indexOf(entity.StatType.Daily),
    totalLinesRead: totalLinesRead,
    totalJuzFromLines: entityJuz.GetTotalJuzFromLines(totalLinesRead),
    totalMarkedJuzAsDone: 0, // TD-10 Implement totalMarkedJuzAsDone calculation in module stat
  };
}

export function CalculateTotalLinesFromHistory(history: entityHistory.History): number {
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
}

function calculateTotalLinesForJuz(history: entityHistory.History): number {
  // @ts-expect-error known type
  const juz: entityJuz.JuzType = entityJuz.GetJuzById(history.juz);
  let totalLines: number = 0;

  // eslint-disable-next-line @typescript-eslint/typedef
  for (let i = juz.startSurah; i <= juz.endSurah; i++) {
    // @ts-expect-error known type
    totalLines += entitySurah.GetSurahById(i).totalLines;
  }

  return totalLines;
}

function calculateTotalLinesForSurah(history: entityHistory.History): number {
  // @ts-expect-error known type
  const surah: entitySurah.SurahType = entitySurah.GetSurahById(history.surah);
  return surah.totalLines * history.repeat;
}

function calculateTotalLinesForAyah(history: entityHistory.History): number {
  // @ts-expect-error known type
  const surah: entitySurah.SurahType = entitySurah.GetSurahById(history.surah);
  // @ts-expect-error known type
  const surahJuz: number[] | SurahJuz[] = entitySurah.GetJuzBySurahId(history.surah);
  let totalLines: number = 0;

  if (history.markJuzDone) {
    // eslint-disable-next-line @typescript-eslint/typedef
    if (surahJuz.every((i) => typeof i === 'number')) {
      const juzId: number = surahJuz[0];
      const juz: entityJuz.JuzType | undefined = entityJuz.GetJuzById(juzId);
      if (!juz) return totalLines;
      // eslint-disable-next-line @typescript-eslint/typedef
      for (let i = juz.startSurah; i <= juz.endSurah; i++) {
        // @ts-expect-error known type
        totalLines += entitySurah.GetSurahById(i).totalLines;
      } // TD-9 Implement handler for type SurahJuz in module stat
    }
  } else if (history.markSurahDone) {
    totalLines += surah.totalLines;
  }

  return totalLines;
}
