import * as entityHistory from '@/module/history/entity';
import * as entityJuz from '@/shared/entity/juz';
import * as entitySurah from '@/shared/entity/surah';

import * as calculate from './calculate';
import * as entity from '../../entity';

export * from './calculate';

export const getHistoryStat = (history: entityHistory.History): entity.HistoryStat => {
  const lines: number = calculate.calculateTotalLinesFromHistory(history);
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

export const findStatType = (id: number): entity.StatType => {
  // @ts-expect-error access enum value with index
  return entity.StatType[Object.keys(entity.StatType)[id]];
};
