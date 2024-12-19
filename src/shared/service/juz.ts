import * as entity from '../entity';

export const getJuzById = (id: number): entity.JuzType | undefined => {
  return entity.juz.find((obj: entity.JuzType) => obj.id === id);
};

export const getTotalJuzFromLines = (n: number): number => {
  const juz: string = (n / 300).toFixed(3);
  return juz.endsWith('.00') ? parseInt(juz) : parseFloat(juz);
};
