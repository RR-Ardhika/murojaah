import * as entityStat from '@/module/stat/entity';
import * as serviceStat from '@/module/stat/service';
import * as serviceJuz from '@/shared/service/juz';
import * as serviceSurah from '@/shared/service/surah';
import * as util from '@/shared/util';

import * as entity from '../entity';
import * as repo from '../repository/indexeddb';

export * from './create';
export * from './export-import';

export const index = async (): Promise<entity.HistoryGroup[]> => {
  const mapHistoryGroups: Map<string, entity.HistoryGroup> = new Map();

  const data: entity.History[] = await repo.findAll();
  if (!data || data.length === 0) {
    return Promise.reject(new Error('Error 400 empty activity'));
  }

  for (const item of data) {
    const key: string = util.formatDate(item.occuredAt);

    if (!mapHistoryGroups.has(key)) {
      const newStat: entityStat.HistoryStat = serviceStat.getHistoryStat(item);
      mapHistoryGroups.set(key, {
        date: key,
        histories: [item],
        stat: newStat,
      });
      continue;
    }

    const group: entity.HistoryGroup = mapHistoryGroups.get(key)!;
    const newStat: entityStat.HistoryStat = serviceStat.getHistoryStat(item);
    group.stat.ayah += newStat.ayah;
    group.stat.lines += newStat.lines;
    group.stat.juz = serviceJuz.getTotalJuzFromLines(group.stat.lines);
    group.histories.push(item);
  }

  return Array.from(mapHistoryGroups.values());
};

export const destroy = (item: entity.History): Promise<number> => {
  return repo.deleteRecord(item);
};

export const getCompactDate = async (): Promise<entity.CompactDate[]> => {
  const mapActivities: Map<string, entity.CompactDate> = new Map();

  const data: entity.History[] = await repo.findAll();
  if (!data || data.length === 0) {
    return Promise.reject(new Error('Error 400 empty compact date'));
  }

  for (const item of data) {
    const key: string = util.formatDateYearFirst(item.occuredAt);

    if (!mapActivities.has(key)) {
      const newStat: entityStat.HistoryStat = serviceStat.getHistoryStat(item);
      mapActivities.set(key, {
        date: key,
        stat: newStat,
      });
      continue;
    }

    const obj: entity.CompactDate = mapActivities.get(key)!;
    const newStat: entityStat.HistoryStat = serviceStat.getHistoryStat(item);
    obj.stat.ayah += newStat.ayah;
    obj.stat.lines += newStat.lines;
    obj.stat.juz = serviceJuz.getTotalJuzFromLines(obj.stat.lines);
  }

  return Array.from(mapActivities.values());
};

export const getListSurah = async (): Promise<entity.ListSurah[]> => {
  const histories: entity.History[] = await repo.findAll();
  return calculateCounters(histories);
};

const calculateCounters = (histories: entity.History[]): entity.ListSurah[] => {
  const counters: entity.ListSurah[] = [];
  const mapCounter: Map<number, entity.ListSurah> = new Map();

  for (const history of histories) {
    switch (history.historyType) {
      case entity.HistoryType.Juz:
        calculateByJuz(history, mapCounter);
        break;
      case entity.HistoryType.Surah:
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
  history: entity.History,
  mapCounter: Map<number, entity.ListSurah>
): void => {
  // @ts-expect-error known type
  const juz: entityJuz.JuzType = serviceJuz.getJuzById(history.juz);

  // eslint-disable-next-line @typescript-eslint/typedef
  for (let i = juz.startSurah; i <= juz.endSurah; i++) {
    // @ts-expect-error known type
    const surah: entitySurah.SurahType = serviceSurah.getSurahById(i);

    const listSurah: entity.ListSurah = {
      id: surah.id,
      juz: surah.juz[0],
      name: surah.name,
      lastRead: history.occuredAt,
    };

    if (!mapCounter.get(surah.id)) mapCounter.set(surah.id, listSurah);
  }
};

const calculateBySurah = (
  history: entity.History,
  mapCounter: Map<number, entity.ListSurah>
): void => {
  // @ts-expect-error known type
  const surah: entitySurah.SurahType = serviceSurah.getSurahById(history.surah);

  const listSurah: entity.ListSurah = {
    id: surah.id,
    juz: surah.juz[0],
    name: surah.name,
    lastRead: history.occuredAt,
  };

  if (!mapCounter.get(surah.id)) mapCounter.set(surah.id, listSurah);
};
