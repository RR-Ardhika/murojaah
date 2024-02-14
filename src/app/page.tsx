import { MurojaahType } from '@/api/murojaah';
import { Card, Props } from '@/components/Card';
import { CreateButton } from '@/components/CreateButton';

const Home = (): JSX.Element => {
  // TODO Remove this mockup data
  const data: Props[] = [
    {
      murojaahType: MurojaahType.Juz,
      juz: 28,
      murojaahMethod: 'Memory',
      totalMurojaah: 100,
      occuredAt: "Sat, Feb 10 '24",
    },
    {
      murojaahType: MurojaahType.Surah,
      surah: 188,
      surahName: 'Al-Mumtahanah',
      murojaahMethod: 'Memory',
      totalMurojaah: 100,
      occuredAt: "Sat, Feb 10 '24",
    },
    {
      murojaahType: MurojaahType.Ayah,
      start: 200,
      end: 208,
      surah: 1,
      surahName: 'Al-Baqarah',
      murojaahMethod: 'Memory',
      totalMurojaah: 100,
      occuredAt: "Sat, Feb 10 '24",
    },
  ];

  // TODO Remove this mockup data
  const cards: JSX.Element[] = [Card({ ...data[0] }), Card({ ...data[1] }), Card({ ...data[2] })];

  // TODO Remove this mockup data
  function repeat(cards: JSX.Element[], repetition: number = 10): JSX.Element[] {
    const items: JSX.Element[] = [];
    for (let i: number = 0; i < repetition; ++i)
      items.push(cards[Math.floor(Math.random() * cards.length)]);

    return items;
  }

  return (
    <div className="flex flex-col mt-[72px] pt-4 px-4">
      {/* TODO Remove this mockup data */}
      <Card {...data[0]} />
      <Card {...data[1]} />
      <Card {...data[2]} />
      {repeat(cards, 7)}
      <CreateButton />
    </div>
  );
};

export default Home;
