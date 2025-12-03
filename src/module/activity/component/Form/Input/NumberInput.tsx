import { Dispatch, SetStateAction, useCallback, memo } from 'react';

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  min?: number;
  max?: number;
  placeholder?: string;
  ariaLabel?: string;
}

// Memoized number input component for ayah input with validation
export const NumberInput: React.FC<Props> = memo((p: Props): React.JSX.Element => {
  const { value, setValue, min = 1, max, placeholder, ariaLabel } = p;

  // Validate and handle input change with proper number constraints
  const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const inputValue: string = e.target.value;

      // Allow empty string for clearing input
      if (inputValue === '') {
        setValue('');
        return;
      }

      const numValue: number = parseInt(inputValue, 10);

      // Validate: must be a valid number >= min
      if (!isNaN(numValue) && numValue >= min) {
        // Check max constraint if provided
        if (max !== undefined && numValue > max) {
          setValue(max.toString());
          return;
        }
        setValue(inputValue);
      }
    },
    [setValue, min, max]
  );

  // Handle blur to ensure valid value
  const handleBlur: () => void = useCallback((): void => {
    if (value === '' || parseInt(value, 10) < min) {
      setValue('');
    }
  }, [value, min, setValue]);

  return (
    <div>
      <input
        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent transition-shadow [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        aria-label={ariaLabel || 'Number input'}
        inputMode="numeric"
        pattern="[0-9]*"
      />
    </div>
  );
});

NumberInput.displayName = 'NumberInput';
