export type Stat = {
  id?: number;
  statType: number;
  totalLinesRead: number;
  totalJuzFromLines: string;
  totalMarkedJuzAsDone: number;
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
