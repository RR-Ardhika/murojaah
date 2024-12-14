import { clsx } from 'clsx';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

export const NumberStepper = (p: Props): JSX.Element => {
  const baseClass: string = 'border px-4 py-2';
  const txtClass: string = 'bg-gray-100';

  return (
    <div className="flex">
      <button className={baseClass} onClick={() => decrease(p)}>
        -
      </button>
      <p className={clsx(baseClass, txtClass)}>{p.value}</p>
      <button className={baseClass} onClick={() => increase(p)}>
        +
      </button>
    </div>
  );
};

const increase = (p: Props): void => {
  p.setValue(p.value + 1);
};

const decrease = (p: Props): void => {
  if (p.value - 1 < 1) return;
  p.setValue(p.value - 1);
};
