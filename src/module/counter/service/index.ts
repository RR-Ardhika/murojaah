import * as entityHistory from '@/module/history/entity';
import * as repoHistory from '@/module/history/repository/indexeddb';
import * as entityJuz from '@/shared/entity/juz';
import * as entitySurah from '@/shared/entity/surah';
import * as serviceJuz from '@/shared/service/juz';
import * as serviceSurah from '@/shared/service/surah';

import * as entity from '../entity';

export const index = async (): Promise<entity.Counter[]> => {
  const histories: entityHistory.History[] = await repoHistory.findAll();
  return calculateCounters(histories);
};

const calculateCounters = (histories: entityHistory.History[]): entity.Counter[] => {
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
      // TD-8 Implement calculateByAyah() for module counter
      // case entityHistory.HistoryType.Ayah:
      //   return calculateByAyah(history);
    }
  }

  // eslint-disable-next-line @typescript-eslint/typedef
  const sortedKeys: number[] = Array.from(mapCounter.keys()).sort((a, b) => a - b);
  // @ts-expect-error known type
  for (const key of sortedKeys) counters.push(mapCounter.get(key));

  return counters;
};

const calculateByJuz = (
  history: entityHistory.History,
  mapCounter: Map<number, entity.Counter>
): void => {
  // @ts-expect-error known type
  const juz: entityJuz.JuzType = serviceJuz.getJuzById(history.juz);

  // eslint-disable-next-line @typescript-eslint/typedef
  for (let i = juz.startSurah; i <= juz.endSurah; i++) {
    // @ts-expect-error known type
    const surah: entitySurah.SurahType = serviceSurah.getSurahById(i);

    const counter: entity.Counter = {
      id: surah.id,
      juz: surah.juz[0],
      name: surah.name,
      lastRead: history.occuredAt,
    };

    if (!mapCounter.get(surah.id)) mapCounter.set(surah.id, counter);
  }
};

const calculateBySurah = (
  history: entityHistory.History,
  mapCounter: Map<number, entity.Counter>
): void => {
  // @ts-expect-error known type
  const surah: entitySurah.SurahType = serviceSurah.getSurahById(history.surah);

  const counter: entity.Counter = {
    id: surah.id,
    juz: surah.juz[0],
    name: surah.name,
    lastRead: history.occuredAt,
  };

  if (!mapCounter.get(surah.id)) mapCounter.set(surah.id, counter);
};
