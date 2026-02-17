import { ArrowPathIcon } from '@heroicons/react/16/solid';
import { DateTime } from 'luxon';
import { Dispatch, SetStateAction } from 'react';

import { formFormatDatetimes, splitDatetime } from '@/shared/util';

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const DateTimeInput = (p: Props): React.JSX.Element => {
  const { date, time }: { date: string; time: string } = splitDatetime(p.value);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newDate: string = e.target.value;
    const currentTime: string = time || '00:00';
    p.setValue(`${newDate} ${currentTime}`);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newTime: string = e.target.value;
    const currentDate: string = date || DateTime.now().toFormat('yyyy-MM-dd');
    p.setValue(`${currentDate} ${newTime}`);
  };

  const handleReset = (): void => {
    p.setValue(DateTime.now().toFormat(formFormatDatetimes[0]));
  };

  return (
    <div className="flex gap-2">
      <input
        className="flex-1 px-2 py-1 border border-gray-300"
        type="date"
        value={date}
        onChange={handleDateChange}
      />
      <input
        className="flex-1 px-2 py-1 border border-gray-300"
        type="time"
        value={time}
        onChange={handleTimeChange}
      />
      <button
        type="button"
        className="bg-blue-500 text-white px-2"
        onClick={handleReset}
      >
        <ArrowPathIcon className="size-5 fill-white/50" />
      </button>
    </div>
  );
};
