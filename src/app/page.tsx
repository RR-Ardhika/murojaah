import { Card, Props } from './components/Card';
import { CardType } from './api/card';

const data: Props[] = [
  {
    cardType: CardType.Juz,
    juz: 28,
    murojaahMethod: 'Memory',
    totalMurojaah: 100,
    occuredAt: "Sat, Feb 10 '24",
  },
  {
    cardType: CardType.Surah,
    surah: 188,
    surahName: 'Al-Mumtahanah',
    murojaahMethod: 'Memory',
    totalMurojaah: 100,
    occuredAt: "Sat, Feb 10 '24",
  },
  {
    cardType: CardType.Ayah,
    start: 200,
    end: 208,
    surah: 1,
    surahName: 'Al-Baqarah',
    murojaahMethod: 'Memory',
    totalMurojaah: 100,
    occuredAt: "Sat, Feb 10 '24",
  },
];

export default function Home(): JSX.Element {
  const cards: JSX.Element[] = [
    <Card key={Math.floor(Math.random())} {...data[0]} />,
    <Card key={Math.floor(Math.random())} {...data[1]} />,
    <Card key={Math.floor(Math.random())} {...data[2]} />,
  ];

  return (
    <div className="flex flex-col mt-[72px] pt-4 px-4">
      <Card {...data[0]} />
      <Card {...data[1]} />
      <Card {...data[2]} />
      {repeat(cards, 7)}
    </div>
  );
}

function repeat(cards: JSX.Element[], repetition: number = 10): JSX.Element[] {
  const items: JSX.Element[] = [];
  for (let i: number = 0; i < repetition; ++i)
    items.push(cards[Math.floor(Math.random() * cards.length)]);

  return items;
}
