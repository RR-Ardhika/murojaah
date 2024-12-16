import { show } from '@/module/approach/service';
import { ActivityStat } from '@/module/stat/entity';
import { getActivityStat } from '@/module/stat/service';
import { SurahType } from '@/shared/entity';
import { getSurahById } from '@/shared/service/surah';
import { formatDatetime } from '@/shared/util/datetime';

import { Container } from './CardContainer';
import { Activity, ActivityType } from '../../entity';

interface InternalProps {
  item: Activity;
  activityStat: ActivityStat;
}

const CLASS_NAMES: Record<string, string> = {
  title: 'text-xl font-black',
  data: 'font-normal',
  date: 'font-extralight',
};

const getRepeatString = (i: InternalProps): string => {
  if (i.item.repeat <= 1) return '';
  return `${i.item.repeat}x`;
};

const convertSurahIdToName = (id: number | undefined): string => {
  if (!id) return '';
  const surah: SurahType | undefined = getSurahById(id);
  if (!surah) return '';
  return surah.name;
};

const JuzCard = (i: InternalProps): JSX.Element => {
  return (
    <>
      <p className={CLASS_NAMES.title}>Juz {i.item.juz}</p>
      <p className={CLASS_NAMES.data}>Murojaah {show(i.item.approachId)}</p>
      <p className={CLASS_NAMES.data}>
        <span>{i.activityStat.juz} juz, </span>
        <span>{i.activityStat.ayah} ayah, </span>
        <span>{i.activityStat.lines} lines</span>
      </p>
      <p className={CLASS_NAMES.date}>{formatDatetime(i.item.occuredAt)}</p>
    </>
  );
};

const SurahCard = (i: InternalProps): JSX.Element => {
  return (
    <>
      <p className={CLASS_NAMES.title}>
        {getRepeatString(i)} Surah {convertSurahIdToName(i.item.surah)}
      </p>
      <p className={CLASS_NAMES.data}>Murojaah {show(i.item.approachId)}</p>
      {i.item.markJuzDone && <p className={CLASS_NAMES.data}>Juz was marked as done</p>}
      <p className={CLASS_NAMES.data}>
        <span>{i.activityStat.juz} juz, </span>
        <span>{i.activityStat.ayah} ayah, </span>
        <span>{i.activityStat.lines} lines</span>
      </p>
      <p className={CLASS_NAMES.date}>{formatDatetime(i.item.occuredAt)}</p>
    </>
  );
};

const AyahCard = (i: InternalProps): JSX.Element => {
  return (
    <>
      <p className={CLASS_NAMES.title}>
        {getRepeatString(i)} Ayah {i.item.startAyah} to {i.item.endAyah}
      </p>
      <p className={CLASS_NAMES.data}>Surah {convertSurahIdToName(i.item.surah)}</p>
      <p className={CLASS_NAMES.data}>Murojaah {show(i.item.approachId)}</p>
      {i.item.markSurahDone && <p className={CLASS_NAMES.data}>Surah was marked as done</p>}
      {i.item.markJuzDone && <p className={CLASS_NAMES.data}>Juz was marked as done</p>}
      <p className={CLASS_NAMES.data}>
        <span>{i.activityStat.juz} juz, </span>
        <span>{i.activityStat.ayah} ayah, </span>
        <span>{i.activityStat.lines} lines</span>
      </p>
      <p className={CLASS_NAMES.date}>{formatDatetime(i.item.occuredAt)}</p>
    </>
  );
};

export const Card = (item: Activity): JSX.Element => {
  const activityStat: ActivityStat = getActivityStat(item);

  const i: InternalProps = {
    item,
    activityStat,
  };

  // TD-1 Utilize useMemo
  switch (item.historyType) {
    case ActivityType.Juz:
      return Container(item, JuzCard(i));
    case ActivityType.Surah:
      return Container(item, SurahCard(i));
    case ActivityType.Ayah:
      return Container(item, AyahCard(i));
    default:
      return <></>;
  }
};
