// import { Counter } from '@/api/module/counter/entity';
// import { GetCounterType } from '@/api/module/counter/service';

const Card = (item: Counter): JSX.Element => {
  const cardClassnames: Record<string, string> = {
    container: 'flex justify-between gap-2 p-4 mb-2 bg-custom-teal text-white rounded-lg',
    data: 'font-normal',
    date: 'font-light',
  };

  return (
    <div className={cardClassnames.container}>
      <p className={cardClassnames.data}>{item.name}</p>
      <p className={cardClassnames.date}>Sun, May 26 '24</p>
    </div>
  );
};

export default Card;
