import Card from './components/Card';

function repeat(cards: JSX.Element[], repetition: number = 10): JSX.Element[] {
  const items: JSX.Element[] = [];
  for (let i: number = 0; i < repetition; ++i)
    items.push(cards[Math.floor(Math.random() * cards.length)]);

  return items;
}

export default function Home(): JSX.Element {
  const cards: JSX.Element[] = [
    Card({ cardType: 0 }),
    Card({ cardType: 1 }),
    Card({ cardType: 2 }),
  ];

  return (
    <div className="flex flex-col mt-[72px] pt-4 px-4">
      <Card cardType={0} />
      <Card cardType={1} />
      <Card cardType={2} />
      {repeat(cards, 7)}
    </div>
  );
}
