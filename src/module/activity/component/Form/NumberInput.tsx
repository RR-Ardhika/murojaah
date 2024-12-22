import { Dispatch, SetStateAction } from 'react';

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const NumberInput = (p: Props): React.JSX.Element => {
  // TD-3 Implement proper number input for ayah
  return (
    <div>
      <input
        className="w-full px-2 py-1 border border-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        type="number"
        value={p.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => p.setValue(e.target.value)}
      />
    </div>
  );
};
