import { show } from '@/module/approach/service';
import { History, HistoryType } from '@/module/history/entity';
import { HistoryStat } from '@/module/stat/entity';
import { getHistoryStat } from '@/module/stat/service';
import { getSurahById, SurahType } from '@/shared/entity';
import { formatDatetime } from '@/web/shared/util/datetime';

import { Container } from './Container';

interface InternalProps {
  item: History;
  historyStat: HistoryStat;
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
        <span>{i.historyStat.juz} juz, </span>
        <span>{i.historyStat.ayah} ayah, </span>
        <span>{i.historyStat.lines} lines</span>
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
        <span>{i.historyStat.juz} juz, </span>
        <span>{i.historyStat.ayah} ayah, </span>
        <span>{i.historyStat.lines} lines</span>
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
        <span>{i.historyStat.juz} juz, </span>
        <span>{i.historyStat.ayah} ayah, </span>
        <span>{i.historyStat.lines} lines</span>
      </p>
      <p className={CLASS_NAMES.date}>{formatDatetime(i.item.occuredAt)}</p>
    </>
  );
};

export const Card = (item: History): JSX.Element => {
  const historyStat: HistoryStat = getHistoryStat(item);

  const i: InternalProps = {
    item,
    historyStat,
  };

  // TD-1 Utilize useMemo
  switch (item.historyType) {
    case HistoryType.Juz:
      return Container(item, JuzCard(i));
    case HistoryType.Surah:
      return Container(item, SurahCard(i));
    case HistoryType.Ayah:
      return Container(item, AyahCard(i));
    default:
      return <></>;
  }
};
