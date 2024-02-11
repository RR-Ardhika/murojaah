import Card from './components/Card';
import { CardType } from './api/card';

export default function Home(): JSX.Element {
  const cards: JSX.Element[] = [
    <Card key={Math.floor(Math.random())} cardType={CardType.Juz} />,
    <Card key={Math.floor(Math.random())} cardType={CardType.Surah} />,
    <Card key={Math.floor(Math.random())} cardType={CardType.Ayah} />,
  ];

  return (
    <div className="flex flex-col mt-[72px] pt-4 px-4">
      <Card cardType={CardType.Juz} />
      <Card cardType={CardType.Surah} />
      <Card cardType={CardType.Ayah} />
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
