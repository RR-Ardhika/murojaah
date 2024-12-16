import { ActivityStat } from '@/module/stat/entity';
import { Option } from '@/shared/entity';

export enum ActivityType {
  Juz = 0,
  Surah = 1,
  Ayah = 2,
}

export type History = {
  id: string;
  historyType: number;
  juz?: number;
  surah?: number;
  startAyah?: number;
  endAyah?: number;
  markSurahDone?: boolean;
  markJuzDone?: boolean;
  approachId: number;
  repeat: number;
  occuredAt: Date;
};

export type HistoryGroup = {
  date: string;
  histories: History[];
  stat: ActivityStat;
};

export type Payload = {
  activityType: number;
  juz?: number | undefined;
  surah?: number | undefined;
  surahOptions?: Option[] | undefined;
  startAyah?: number | undefined;
  endAyah?: number | undefined;
  markSurahDone?: boolean | undefined;
  markJuzDone?: boolean | undefined;
  approachId: number;
  repeat: number;
  occuredAt: Date;
};

export type CompactDate = {
  date: string;
  stat: ActivityStat;
};

export type ListSurah = {
  id: number;
  juz: number;
  name: string;
  lastRead: Date;
};
