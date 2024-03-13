import * as entity from '@/api/module/stat/entity';
import * as entityHistory from '@/api/module/history/entity';
import * as entitySurah from '@/api/shared/entity/surah';

export function CalculateStats(histories: entityHistory.History[]): entity.Stat[] {
  const stats: entity.Stat[] = [];
  stats.push(CalculateAllTimeStat(histories));
  return stats;
}

function CalculateAllTimeStat(histories: entityHistory.History[]): entity.Stat {
  let totalLinesRead: number = 0;

  for (const history of histories) {
    // @ts-expect-error expected
    const surah: entitySurah.SurahType = entitySurah.GetSurahById(history.surah);
    totalLinesRead += surah.totalLines;
  }

  return {
    id: Math.floor(Math.random() * 10),
    statType: Object.values(entity.StatType).indexOf(entity.StatType.All),
    totalLinesRead: totalLinesRead,
    totalJuzFromLines: (totalLinesRead / 300).toFixed(2),
    totalMarkedJuzAsDone: 0, // TODO Implement this
  };
}

export function FindStatType(id: number): entity.StatType {
  // @ts-expect-error access enum value with index
  return entity.StatType[Object.keys(entity.StatType)[id]];
}
