interface Props {
  cardType: number;
}

const cardClassnames: Record<string, string> = {
  container: 'p-4 mb-5 bg-teal text-white rounded-lg',
  title: 'text-xl font-black',
  data: 'font-normal',
  date: 'font-extralight',
};

export default function Card({ cardType }: Props): JSX.Element {
  let el: JSX.Element = <></>;
  switch (cardType) {
    case 0:
      el = juzCard();
      break;
    case 1:
      el = surahCard();
      break;
    case 2:
      el = ayahCard();
      break;
  }

  return el;
}

function juzCard(): JSX.Element {
  return (
    <div className={cardClassnames.container}>
      <p className={cardClassnames.title}>Juz 28</p>
      <p className={cardClassnames.data}>Murojaah by using Memory</p>
      <p className={cardClassnames.data}>Total Murojaah is 100</p>
      <p className={cardClassnames.date}>Sat, Feb 10 &apos;24</p>
    </div>
  );
}

function surahCard(): JSX.Element {
  return (
    <div className={cardClassnames.container}>
      <p className={cardClassnames.title}>Surah 188 Al-Mumtahanah</p>
      <p className={cardClassnames.data}>Murojaah by using Memory</p>
      <p className={cardClassnames.data}>Total Murojaah is 100</p>
      <p className={cardClassnames.date}>Sat, Feb 10 &apos;24</p>
    </div>
  );
}

function ayahCard(): JSX.Element {
  return (
    <div className={cardClassnames.container}>
      <p className={cardClassnames.title}>Ayah 200 to 208</p>
      <p className={cardClassnames.data}>Surah 1 Al-Baqarah</p>
      <p className={cardClassnames.data}>Murojaah by using Memory</p>
      <p className={cardClassnames.data}>Total Murojaah is 100</p>
      <p className={cardClassnames.date}>Sat, Feb 10 &apos;24</p>
    </div>
  );
}
