import { ActivityStat } from '@/module/stat/entity';
import { Option } from '@/shared/entity';

export enum ActivityType {
  Uninitialized = -1,
  Juz = 0,
  Surah = 1,
  Ayah = 2,
}

export type Activity = {
  id: string;
  activityType: number;
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

export type ActivityGroup = {
  date: string;
  activities: Activity[];
  stat: ActivityStat;
};

export type Payload = {
  id?: string;
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

export const TABLE_NAME: string = 'activities' as const;

export const TABLE_FIELDS: string[] = Object.keys({} as Activity) as Array<keyof Activity>;
