import * as entity from '@/api/module/counter/entity';
import * as entityHistory from '@/api/module/history/entity';
import * as entitySurah from '@/api/shared/entity/surah';

export function CalculateCounters(histories: entityHistory.History[]): entity.Counter[] {
  const counters: entity.Counter[] = [];

  for (const history of histories) {
    if (history.historyType !== entityHistory.HistoryType.Surah) continue;

    // @ts-expect-error known type
    const surah: entitySurah.SurahType = entitySurah.GetSurahById(history.surah);

    const counter = {
      id: Math.floor(Math.random() * 10),
      name: surah.name,
      lastRead: history.occuredAt,
    };

    // @ts-expect-error known type
    counters.push(counter);
  }

  return counters;
}
