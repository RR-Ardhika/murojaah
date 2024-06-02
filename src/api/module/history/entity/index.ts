import { Option } from '@/api/shared/entity';

export type History = {
  id?: number;
  historyType: number;
  juz?: number;
  surah?: number;
  surahName?: string;
  startAyah?: number;
  endAyah?: number;
  markSurahDone?: boolean;
  markJuzDone?: boolean;
  approachId: number;
  repeat: number;
  occuredAt: Date;
};

export type Payload = {
  historyType: number;
  juz?: number | undefined;
  surah?: number | undefined;
  surahOptions?: Option[] | undefined;
  surahName?: string | undefined;
  startAyah?: number | undefined;
  endAyah?: number | undefined;
  markSurahDone?: boolean | undefined;
  markJuzDone?: boolean | undefined;
  approachId: number;
  repeat: number;
  occuredAt: Date;
};

export enum HistoryType {
  Juz = 0,
  Surah = 1,
  Ayah = 2,
}
