import * as entity from '@/api/module/stat/entity';
import * as entityHistory from '@/api/module/history/entity';
import * as entitySurah from '@/api/shared/entity/surah';
import * as entityJuz from '@/api/shared/entity/juz';
import * as repo from '@/api/module/stat/repository/indexeddb';
import * as repoHistory from '@/api/module/history/repository/indexeddb';

// @ts-expect-error expected return value type
export async function Index(): entity.Stat[] {
  const histories: entityHistory.History[] = await repoHistory.FindAll();
  return repo.CalculateStats(histories);
}

export function GetHistoryStat(history: entityHistory.History): entity.HistoryStat {
  const lines: number = repo.CalculateTotalLinesFromHistory(history);
  return {
    juz: entityJuz.GetTotalJuzFromLines(lines),
    ayah: getTotalAyah(history),
    lines: lines,
  };
}

function getTotalAyah(history: entityHistory.History): number {
  let totalAyah: number = 0;

  switch (history.historyType) {
    case entityHistory.HistoryType.Juz:
      // @ts-expect-error known type
      const juz: entityJuz.JuzType = entityJuz.GetJuzById(history.juz);
      // eslint-disable-next-line @typescript-eslint/typedef
      for (let i = juz.startSurah; i <= juz.endSurah; i++) {
        // @ts-expect-error known type
        totalAyah += entitySurah.GetSurahById(i)?.totalAyah;
      }
      break;
    case entityHistory.HistoryType.Surah:
      // @ts-expect-error expected undefined
      const surah: entitySurah.SurahType = entitySurah.GetSurahById(history.surah);
      totalAyah = surah.totalAyah * history.repeat;
      break;
    case entityHistory.HistoryType.Ayah:
      // @ts-expect-error expected undefined
      totalAyah = (history.endAyah - history.startAyah + 1) * history.repeat;
      break;
  }

  return totalAyah;
}

export function GetStatType(id: number): entity.StatType {
  return repo.FindStatType(id);
}
