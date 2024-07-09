import { Counter } from '@/api/module/counter/entity';
import { formatDate, formatDurationFromNow, getDurationFromNow } from '@/web/shared/util/datetime';
import { clsx } from 'clsx';

const Card = (item: Counter): JSX.Element => {
  const cardClassnames: Record<string, string> = {
    container: 'flex justify-between gap-2 p-4 mb-2 text-white rounded-lg',
    data: 'font-normal',
    duration: 'text-xs pt-1 font-light',
    date: 'text-sm pt-0.5 font-normal',
  };

  function getContainerColor(duration: number): string {
    switch (true) {
      case duration < 3:
        return 'bg-custom-teal';
      case duration < 7:
        return 'bg-yellow-400';
      case duration < 30:
        return 'bg-amber-600';
      default:
        return 'bg-red-700';
    }
  }

  return (
    <div
      className={clsx(
        cardClassnames.container,
        getContainerColor(getDurationFromNow(item.lastRead))
      )}
    >
      <p className={cardClassnames.data}>{item.name}</p>
      <div className="flex gap-1">
        <p className={cardClassnames.duration}>({formatDurationFromNow(item.lastRead)})</p>
        <p className={cardClassnames.date}>{formatDate(item.lastRead)}</p>
      </div>
    </div>
  );
};

export default Card;
