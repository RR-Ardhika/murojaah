const classCardDiv = 'p-4 mb-5 bg-teal text-white rounded-lg';
const classCardTitle = 'text-xl font-black';
const classCardData = 'font-normal';
const classCardDate = 'font-extralight';

function repeat(cards: React.JSX.Element[], repetition: number = 10) {
  const items = [];
  for (let i = 0; i < repetition; ++i)
    items.push(cards[Math.floor(Math.random() * cards.length)]);
  return items;
}

function juzCard() {
  return (
    <div className={classCardDiv}>
      <p className={classCardTitle}>Juz 28</p>
      <p className={classCardData}>Murojaah by using Memory</p>
      <p className={classCardData}>Total Murojaah is 100</p>
      <p className={classCardDate}>Sat, Feb 10 &apos;24</p>
    </div>
  );
}

function surahCard() {
  return (
    <div className={classCardDiv}>
      <p className={classCardTitle}>Surah 188 Al-Mumtahanah</p>
      <p className={classCardData}>Murojaah by using Memory</p>
      <p className={classCardData}>Total Murojaah is 100</p>
      <p className={classCardDate}>Sat, Feb 10 &apos;24</p>
    </div>
  );
}

function ayahCard() {
  return (
    <div className={classCardDiv}>
      <p className={classCardTitle}>Ayah 200 to 208</p>
      <p className={classCardData}>Surah 1 Al-Baqarah</p>
      <p className={classCardData}>Murojaah by using Memory</p>
      <p className={classCardData}>Total Murojaah is 100</p>
      <p className={classCardDate}>Sat, Feb 10 &apos;24</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col mt-[72px] pt-4 px-4">
      {juzCard()}
      {surahCard()}
      {ayahCard()}
      {repeat([juzCard(), surahCard(), ayahCard()], 7)}
    </div>
  );
}
