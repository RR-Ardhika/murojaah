import { v4 as uuidv4 } from 'uuid';

import { juz, surah, SurahType } from '@/shared/entity';

import * as entity from '../entity';
import * as repo from '../repository/indexeddb';

export type JuzConversion = {
  juzId: number;
  surahIds: number[];
};

export const getEligibleJuzConversions = (activities: entity.Activity[]): JuzConversion[] => {
  const surahActivities: entity.Activity[] = activities.filter(
    (a: entity.Activity): boolean => a.activityType === entity.ActivityType.Surah
  );

  if (surahActivities.length === 0) return [];

  const completedSurahIds: Set<number> = new Set<number>();
  for (const activity of surahActivities) {
    if (activity.surah) completedSurahIds.add(activity.surah);
  }

  const eligibleJuzs: JuzConversion[] = [];

  for (const j of juz) {
    const requiredSurahs: number[] = [];
    // eslint-disable-next-line @typescript-eslint/typedef
    for (let s = j.startSurah; s <= j.endSurah; s++) {
      const surahData: SurahType | undefined = surah.find((x: SurahType): boolean => x.id === s);
      if (surahData && surahData.juz[surahData.juz.length - 1] === j.id) {
        requiredSurahs.push(s);
      }
    }

    if (requiredSurahs.length === 0) continue;

    const allPresent: boolean = requiredSurahs.every((s: number): boolean => completedSurahIds.has(s));
    if (allPresent) {
      eligibleJuzs.push({
        juzId: j.id,
        surahIds: requiredSurahs,
      });
    }
  }

  return eligibleJuzs;
};

export const createJuzFromSurahs = async (
  juzId: number,
  occuredAt: Date,
  approachId: number,
  repeat: number
): Promise<number | unknown[]> => {
  const activity: entity.Activity = {
    id: uuidv4(),
    activityType: entity.ActivityType.Juz,
    juz: juzId,
    approachId,
    repeat,
    occuredAt,
  };

  return repo.insert(activity);
};
