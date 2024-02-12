import { CardType } from '../api/card';

export interface Props {
  cardType: number;
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
  container: 'p-4 mb-5 bg-teal text-white rounded-lg',
  title: 'text-xl font-black',
  data: 'font-normal',
  date: 'font-extralight',
};

export function Card(props: Props): JSX.Element {
  switch (props.cardType) {
    case CardType.Juz:
      return juzCard(props);
    case CardType.Surah:
      return surahCard(props);
    case CardType.Ayah:
      return ayahCard(props);
    default:
      return <></>;
  }
}

function juzCard(props: Props): JSX.Element {
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
}

function surahCard(props: Props): JSX.Element {
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
}

function ayahCard(props: Props): JSX.Element {
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
}
