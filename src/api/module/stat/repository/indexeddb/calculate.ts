import * as entity from '@/api/module/stat/entity';
import * as entityHistory from '@/api/module/history/entity';
import * as entitySurah from '@/api/shared/entity/surah';

export function CalculateStats(histories: entityHistory.History[]): entity.Stat[] {
  const stats: entity.Stat[] = [];
  stats.push(calculateAllTimeStat(histories));
  return stats;
}

function calculateAllTimeStat(histories: entityHistory.History[]): entity.Stat {
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
