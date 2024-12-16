export enum StatType {
  All = 'All Times',
  Daily = 'Daily',
  Weekly = 'Weekly',
  BiWeekly = 'Bi-Weekly',
  Monthly = 'Monthly',
  Quarterly = 'Quarterly',
  Yearly = 'Yearly',
}

export type Stat = {
  id: string;
  statType: number;
  totalLinesRead: number;
  totalJuzFromLines: number;
  totalMarkedJuzAsDone: number;
};

export type ActivityStat = {
  juz: number;
  ayah: number;
  lines: number;
};
