import * as entity from '@/api/module/stat/entity';
import * as entityHistory from '@/api/module/history/entity';
import * as entityJuz from '@/api/shared/entity/juz';
import * as entitySurah from '@/api/shared/entity/surah';

export function CalculateStats(histories: entityHistory.History[]): entity.Stat[] {
  const stats: entity.Stat[] = [];
  stats.push(calculateAllTimeStat(histories));
  return stats;
}

function calculateAllTimeStat(histories: entityHistory.History[]): entity.Stat {
  let totalLinesRead: number = 0;

  for (const history of histories) {
    switch (history.historyType) {
      case entityHistory.HistoryType.Juz:
        totalLinesRead += calculateTotalLinesForJuz(history);
        break;
      case entityHistory.HistoryType.Surah:
        totalLinesRead += calculateTotalLinesForSurah(history);
        break;
      case entityHistory.HistoryType.Ayah:
        totalLinesRead += calculateTotalLinesForAyah(history);
        break;
    }
  }

  return {
    id: Math.floor(Math.random() * 10),
    statType: Object.values(entity.StatType).indexOf(entity.StatType.All),
    totalLinesRead: totalLinesRead,
    totalJuzFromLines: (totalLinesRead / 300).toFixed(2),
    totalMarkedJuzAsDone: 0, // TODO Implement this
  };
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
      } // TODO Handle for type SurahJuz
    }
  } else if (history.markSurahDone) {
    totalLines += surah.totalLines;
  }

  return totalLines;
}
