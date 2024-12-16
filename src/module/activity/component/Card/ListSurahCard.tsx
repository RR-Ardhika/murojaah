import { clsx } from 'clsx';

import { Base } from '@/shared/component/Base';
import { formatDate, formatDurationFromNow, getDurationFromNow } from '@/shared/util/datetime';

import * as entity from '../../entity';

interface Props {
  item: entity.ListSurah;
  showForm: (item: entity.ListSurah) => void;
}

const CLASS_NAMES: Record<string, string> = {
  container: 'flex justify-between gap-2 p-4 mb-2 text-white rounded-lg',
  data: 'font-normal',
  duration: 'text-xs pt-1 font-light',
  date: 'text-sm pt-0.5 font-normal',
};

const getContainerColor = (duration: number): string => {
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
};

export const ListSurahCard = ({ item, showForm }: Props): React.JSX.Element => {
  return (
    <Base module="activity" name="ListSurahCard">
      <div
        className={clsx(
          CLASS_NAMES.container,
          getContainerColor(getDurationFromNow(item.lastRead))
        )}
        onClick={() => showForm(item)}
      >
        <p className={CLASS_NAMES.data}>{item.name}</p>
        <div className="flex gap-1">
          <p className={CLASS_NAMES.duration}>({formatDurationFromNow(item.lastRead)})</p>
          <p className={CLASS_NAMES.date}>{formatDate(item.lastRead)}</p>
        </div>
      </div>
    </Base>
  );
};
