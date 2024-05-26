import { Counter } from '@/api/module/counter/entity';
import { formatDate } from '@/web/shared/util/datetime';

const Card = (item: Counter): JSX.Element => {
  const cardClassnames: Record<string, string> = {
    container: 'flex justify-between gap-2 p-4 mb-2 bg-custom-teal text-white rounded-lg',
    data: 'font-normal',
    duration: 'text-xs pt-1 font-light',
    date: 'text-sm pt-0.5 font-normal',
  };

  return (
    <div className={cardClassnames.container}>
      <p className={cardClassnames.data}>{item.name}</p>
      <div className="flex gap-1">
        <p className={cardClassnames.duration}>(7d)</p>
        <p className={cardClassnames.date}>{formatDate(item.lastRead)}</p>
      </div>
    </div>
  );
};

export default Card;
