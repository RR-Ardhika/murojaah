import * as entity from '@/api/module/counter/entity';
import * as entityHistory from '@/api/module/history/entity';
import * as entityJuz from '@/api/shared/entity/juz';
import * as entitySurah from '@/api/shared/entity/surah';

export function CalculateCounters(histories: entityHistory.History[]): entity.Counter[] {
  const counters: entity.Counter[] = [];
  const mapCounter: Map<number, entity.Counter> = new Map();

  for (const history of histories) {
    switch (history.historyType) {
      case entityHistory.HistoryType.Juz:
        calculateByJuz(history, mapCounter);
        break;
      case entityHistory.HistoryType.Surah:
        calculateBySurah(history, mapCounter);
        break;
      // TODO Implement this
      // case entityHistory.HistoryType.Ayah:
      //   return calculateByAyah(history);
    }
  }

  // eslint-disable-next-line @typescript-eslint/typedef
  const sortedKeys: number[] = Array.from(mapCounter.keys()).sort((a, b) => a - b);
  // @ts-expect-error known type
  for (const key of sortedKeys) counters.push(mapCounter.get(key));

  return counters;
}

function calculateByJuz(
  history: entityHistory.History,
  mapCounter: Map<number, entity.Counter>
): void {
  // @ts-expect-error known type
  const juz: entityJuz.JuzType = entityJuz.GetJuzById(history.juz);

  // eslint-disable-next-line @typescript-eslint/typedef
  for (let i = juz.startSurah; i <= juz.endSurah; i++) {
    // @ts-expect-error known type
    const surah: entitySurah.SurahType = entitySurah.GetSurahById(i);

    const counter: entity.Counter = {
      id: surah.id,
      juz: surah.juz[0],
      name: surah.name,
      lastRead: history.occuredAt,
    };

    if (!mapCounter.get(surah.id)) mapCounter.set(surah.id, counter);
  }
}

function calculateBySurah(
  history: entityHistory.History,
  mapCounter: Map<number, entity.Counter>
): void {
  // @ts-expect-error known type
  const surah: entitySurah.SurahType = entitySurah.GetSurahById(history.surah);

  const counter: entity.Counter = {
    id: surah.id,
    juz: surah.juz[0],
    name: surah.name,
    lastRead: history.occuredAt,
  };

  if (!mapCounter.get(surah.id)) mapCounter.set(surah.id, counter);
}
