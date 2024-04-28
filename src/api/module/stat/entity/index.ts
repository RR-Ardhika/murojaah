export type Stat = {
  id?: number;
  statType: number;
  totalLinesRead: number;
  totalJuzFromLines: number;
  totalMarkedJuzAsDone: number;
};

export type HistoryStat = {
  juz: number;
  ayah: number;
  lines: number;
};

export enum StatType {
  All = 'All Times',
  Daily = 'Daily',
  Weekly = 'Weekly',
  BiWeekly = 'Bi-Weekly',
  Monthly = 'Monthly',
  Quarterly = 'Quarterly',
  Yearly = 'Yearly',
}
