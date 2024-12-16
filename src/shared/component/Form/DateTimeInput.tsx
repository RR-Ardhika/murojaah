import { Dispatch, SetStateAction } from 'react';

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const DateTimeInput = (p: Props): React.JSX.Element => {
  return (
    <div>
      <input
        className="w-full px-2 py-1 border border-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        type="text"
        value={p.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => p.setValue(e.target.value)}
      />
    </div>
  );
};
