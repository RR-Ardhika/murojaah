import * as entity from '../entity';

export const getSurahById = (id: number): entity.SurahType | undefined => {
  return entity.surah.find((obj: entity.SurahType) => obj.id === id);
};

export const getJuzBySurahId = (id: number): number[] | entity.SurahJuz[] => {
  const surah: entity.SurahType | undefined = getSurahById(id);
  if (!surah) return [];
  return surah.juz;
};
