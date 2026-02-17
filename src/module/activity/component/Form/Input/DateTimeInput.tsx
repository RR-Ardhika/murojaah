import { ArrowPathIcon } from '@heroicons/react/16/solid';
import { DateTime } from 'luxon';
import { Dispatch, SetStateAction } from 'react';

import { formFormatDatetimes, fromDatetimeLocal, toDatetimeLocal } from '@/shared/util';

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const DateTimeInput = (p: Props): React.JSX.Element => {
  return (
    <div className="flex">
      <input
        className="w-full px-2 py-1 border border-gray-300"
        type="datetime-local"
        value={toDatetimeLocal(p.value)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => p.setValue(fromDatetimeLocal(e.target.value))}
      />
      <button
        type="button"
        className="bg-blue-500 text-white px-2"
        onClick={() => p.setValue(DateTime.now().toFormat(formFormatDatetimes[0]))}
      >
        <ArrowPathIcon className="size-5 fill-white/50" />
      </button>
    </div>
  );
};
