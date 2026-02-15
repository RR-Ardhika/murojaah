import { clsx } from 'clsx';
import { useState } from 'react';

interface Props {
  value: string;
  setValue: (value: string) => void;
  id?: string;
  min?: number;
  max?: number;
  onError?: (error: string | null) => void;
}

export const NumberInput = (p: Props): React.JSX.Element => {
  const [error, setError] = useState<string | null>(null);

  const validate = (value: string): string | null => {
    if (!value.trim()) return null;

    const num: number = parseInt(value, 10);
    if (isNaN(num)) return 'Must be a number';

    if (p.min !== undefined && num < p.min) return `Must be at least ${p.min}`;
    if (p.max !== undefined && num > p.max) return `Must be at most ${p.max}`;

    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue: string = e.target.value;
    p.setValue(newValue);

    if (error !== null) {
      const newError: string | null = validate(newValue);
      setError(newError);
      p.onError?.(newError);
    }
  };

  const handleBlur = (): void => {
    const newError: string | null = validate(p.value);
    setError(newError);
    p.onError?.(newError);
  };

  const hasError: boolean = error !== null;

  return (
    <div>
      <input
        id={p.id}
        className={clsx(
          'w-full px-2 py-1 border [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
          hasError ? 'border-red-500' : 'border-gray-300'
        )}
        type="number"
        value={p.value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {hasError && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
