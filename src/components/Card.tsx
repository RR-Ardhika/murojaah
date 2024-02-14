import { MurojaahType } from '@/api/murojaah';

// TODO Remove export after not use mockup
export interface Props {
  murojaahType: number;
  juz?: number;
  surah?: number;
  surahName?: string;
  start?: number;
  end?: number;
  murojaahMethod: string;
  totalMurojaah: number;
  occuredAt: string;
}

const cardClassnames: Record<string, string> = {
  container: 'p-4 mb-5 bg-custom-teal text-white rounded-lg',
  title: 'text-xl font-black',
  data: 'font-normal',
  date: 'font-extralight',
};

const JuzCard = (props: Props): JSX.Element => {
  return (
    <div className={cardClassnames.container}>
      <p className={cardClassnames.title}>Juz {props.juz}</p>
      <p className={cardClassnames.data}>
        Murojaah by using {props.murojaahMethod}
      </p>
      <p className={cardClassnames.data}>
        Total Murojaah is {props.totalMurojaah}
      </p>
      <p className={cardClassnames.date}>{props.occuredAt}</p>
    </div>
  );
};

const SurahCard = (props: Props): JSX.Element => {
  return (
    <div className={cardClassnames.container}>
      <p className={cardClassnames.title}>
        Surah {props.surah} {props.surahName}
      </p>
      <p className={cardClassnames.data}>
        Murojaah by using {props.murojaahMethod}
      </p>
      <p className={cardClassnames.data}>
        Total Murojaah is {props.totalMurojaah}
      </p>
      <p className={cardClassnames.date}>{props.occuredAt}</p>
    </div>
  );
};

const AyahCard = (props: Props): JSX.Element => {
  return (
    <div className={cardClassnames.container}>
      <p className={cardClassnames.title}>
        Ayah {props.start} to {props.end}
      </p>
      <p className={cardClassnames.data}>
        Surah {props.surah} {props.surahName}
      </p>
      <p className={cardClassnames.data}>
        Murojaah by using {props.murojaahMethod}
      </p>
      <p className={cardClassnames.data}>
        Total Murojaah is {props.totalMurojaah}
      </p>
      <p className={cardClassnames.date}>{props.occuredAt}</p>
    </div>
  );
};

export const Card = (props: Props): JSX.Element => {
  switch (props.murojaahType) {
    case MurojaahType.Juz:
      return JuzCard(props);
    case MurojaahType.Surah:
      return SurahCard(props);
    case MurojaahType.Ayah:
      return AyahCard(props);
    default:
      return <></>;
  }
};
