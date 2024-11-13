import { Option } from '@/api/shared/entity';

export type JuzType = {
  id: number;
  startSurah: number;
  endSurah: number;
};

export const juz: JuzType[] = [
  { id: 1, startSurah: 1, endSurah: 2 },
  { id: 2, startSurah: 2, endSurah: 2 },
  { id: 3, startSurah: 2, endSurah: 3 },
  { id: 4, startSurah: 3, endSurah: 4 },
  { id: 5, startSurah: 4, endSurah: 4 },
  { id: 6, startSurah: 4, endSurah: 5 },
  { id: 7, startSurah: 5, endSurah: 6 },
  { id: 8, startSurah: 6, endSurah: 7 },
  { id: 9, startSurah: 7, endSurah: 8 },
  { id: 10, startSurah: 8, endSurah: 9 },
  { id: 11, startSurah: 9, endSurah: 11 },
  { id: 12, startSurah: 11, endSurah: 12 },
  { id: 13, startSurah: 12, endSurah: 14 },
  { id: 14, startSurah: 15, endSurah: 16 },
  { id: 15, startSurah: 17, endSurah: 18 },
  { id: 16, startSurah: 18, endSurah: 20 },
  { id: 17, startSurah: 21, endSurah: 22 },
  { id: 18, startSurah: 23, endSurah: 25 },
  { id: 19, startSurah: 25, endSurah: 27 },
  { id: 20, startSurah: 27, endSurah: 29 },
  { id: 21, startSurah: 29, endSurah: 33 },
  { id: 22, startSurah: 33, endSurah: 36 },
  { id: 23, startSurah: 36, endSurah: 39 },
  { id: 24, startSurah: 39, endSurah: 41 },
  { id: 25, startSurah: 41, endSurah: 45 },
  { id: 26, startSurah: 46, endSurah: 51 },
  { id: 27, startSurah: 51, endSurah: 57 },
  { id: 28, startSurah: 58, endSurah: 66 },
  { id: 29, startSurah: 67, endSurah: 77 },
  { id: 30, startSurah: 78, endSurah: 114 },
];

export function getJuzById(id: number): JuzType | undefined {
  return juz.find((obj: JuzType) => obj.id === id);
}

export function juzOptions(): Option[] {
  const options: Option[] = [];

  // eslint-disable-next-line @typescript-eslint/typedef
  for (let i = 0; i < juz.length; i++) {
    const option: Option = { value: juz[i].id, label: juz[i].id };
    options.push(option);
  }

  return options;
}

export function getTotalJuzFromLines(n: number): number {
  const juz: string = (n / 300).toFixed(3);
  return juz.endsWith('.00') ? parseInt(juz) : parseFloat(juz);
}
