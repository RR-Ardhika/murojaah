export type Stat = {
  id?: number;
  totalLinesRead: number;
  totalJuzFromLines: number;
  totalMarkedJuzAsDone: number;
};

export enum StatType {
  All = 0,
  Daily = 1,
  Weekly = 2,
  BiWeekly = 3,
  Monthly = 4,
  Quarterly = 5,
  Yearly = 6,
}
