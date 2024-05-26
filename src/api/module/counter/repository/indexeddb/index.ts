import * as entity from '@/api/module/counter/entity';
import * as entityHistory from '@/api/module/history/entity';
import * as entitySurah from '@/api/shared/entity/surah';

export function CalculateCounters(histories: entityHistory.History[]): entity.Counter[] {
  const counters: entity.Counter[] = [];
  const mapCounter: Map<number, entity.Counter> = new Map();

  for (const history of histories) {
    if (history.historyType !== entityHistory.HistoryType.Surah) continue;

    // @ts-expect-error known type
    const surah: entitySurah.SurahType = entitySurah.GetSurahById(history.surah);

    const counter: entity.Counter = {
      id: surah.id,
      name: surah.name,
      lastRead: history.occuredAt,
    };

    if (!mapCounter.get(surah.id)) mapCounter.set(surah.id, counter);
  }

  const sortedKeys: number[] = Array.from(mapCounter.keys()).sort();
  // @ts-expect-error known type
  for (const key of sortedKeys) counters.push(mapCounter.get(key));

  return counters;
}
