import { Counter } from '@/api/module/counter/entity';
import { formatDate } from '@/web/shared/util/datetime';

const Card = (item: Counter): JSX.Element => {
  const cardClassnames: Record<string, string> = {
    container: 'flex justify-between gap-2 p-4 mb-2 bg-custom-teal text-white rounded-lg',
    data: 'font-normal',
    date: 'font-light',
  };

  return (
    <div className={cardClassnames.container}>
      <p className={cardClassnames.data}>{item.name}</p>
      <p className={cardClassnames.date}>{formatDate(item.lastRead)}</p>
    </div>
  );
};

export default Card;
