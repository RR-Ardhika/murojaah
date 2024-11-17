import * as entityHistory from '@/api/module/history/entity';
import * as repoHistory from '@/api/module/history/repository/indexeddb';
import * as entity from '@/api/module/stat/entity';
import * as repo from '@/api/module/stat/repository/indexeddb';
import * as entityJuz from '@/api/shared/entity/juz';
import * as entitySurah from '@/api/shared/entity/surah';

// @ts-expect-error expected return value type
export const index = async (): entity.Stat[] => {
  const histories: entityHistory.History[] = await repoHistory.findAll();
  return repo.calculateStats(histories);
};

export const getHistoryStat = (history: entityHistory.History): entity.HistoryStat => {
  const lines: number = repo.calculateTotalLinesFromHistory(history);
  return {
    juz: entityJuz.getTotalJuzFromLines(lines),
    ayah: getTotalAyah(history),
    lines: lines,
  };
};

const getTotalAyah = (history: entityHistory.History): number => {
  let totalAyah: number = 0;

  switch (history.historyType) {
    case entityHistory.HistoryType.Juz:
      // @ts-expect-error known type
      const juz: entityJuz.JuzType = entityJuz.getJuzById(history.juz);
      // eslint-disable-next-line @typescript-eslint/typedef
      for (let i = juz.startSurah; i <= juz.endSurah; i++) {
        // @ts-expect-error known type
        totalAyah += entitySurah.getSurahById(i)?.totalAyah;
      }
      break;
    case entityHistory.HistoryType.Surah:
      // @ts-expect-error expected undefined
      const surah: entitySurah.SurahType = entitySurah.getSurahById(history.surah);
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
  return repo.findStatType(id);
};
