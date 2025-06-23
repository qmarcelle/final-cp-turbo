import React, { useState, useEffect } from 'react';
import { cn } from '../../../utils';

export interface NumberInputProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  placeholder?: string;
  allowNegative?: boolean;
  showControls?: boolean;
  className?: string;
  onChange?: (value: number | undefined) => void;
  disabled?: boolean;
}

export const NumberInput = React.forwardRef<HTMLDivElement, NumberInputProps>(
  ({
    value,
    min,
    max,
    step = 1,
    precision = 0,
    placeholder,
    allowNegative = true,
    showControls = true,
    className,
    onChange,
    disabled = false,
  }, ref) => {
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
      if (value !== undefined) {
        setInputValue(value.toFixed(precision));
      }
    }, [value, precision]);

    const validateNumber = (num: number): number | undefined => {
      if (min !== undefined && num < min) return min;
      if (max !== undefined && num > max) return max;
      if (!allowNegative && num < 0) return 0;
      return num;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInputValue(val);

      if (val === '' || val === '-') {
        onChange?.(undefined);
        return;
      }

      const num = parseFloat(val);
      if (!isNaN(num)) {
        const validatedNum = validateNumber(num);
        if (validatedNum !== undefined) {
          onChange?.(Number(validatedNum.toFixed(precision)));
        }
      }
    };

    const handleIncrement = () => {
      const currentValue = inputValue === '' ? 0 : parseFloat(inputValue);
      if (!isNaN(currentValue)) {
        const newValue = validateNumber(currentValue + step);
        if (newValue !== undefined) {
          setInputValue(newValue.toFixed(precision));
          onChange?.(newValue);
        }
      }
    };

    const handleDecrement = () => {
      const currentValue = inputValue === '' ? 0 : parseFloat(inputValue);
      if (!isNaN(currentValue)) {
        const newValue = validateNumber(currentValue - step);
        if (newValue !== undefined) {
          setInputValue(newValue.toFixed(precision));
          onChange?.(newValue);
        }
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'w-full rounded-l-md px-3 py-2 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            !showControls && 'rounded-r-md',
            disabled && 'cursor-not-allowed'
          )}
        />
        {showControls && (
          <div className="flex flex-col border-l">
            <button
              type="button"
              onClick={handleIncrement}
              disabled={disabled || (max !== undefined && value !== undefined && value >= max)}
              className={cn(
                'flex h-5 w-6 items-center justify-center rounded-tr-md border-b text-xs',
                'hover:bg-accent hover:text-accent-foreground',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                disabled && 'cursor-not-allowed'
              )}
            >
              ▲
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              disabled={disabled || (min !== undefined && value !== undefined && value <= min)}
              className={cn(
                'flex h-5 w-6 items-center justify-center rounded-br-md text-xs',
                'hover:bg-accent hover:text-accent-foreground',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                disabled && 'cursor-not-allowed'
              )}
            >
              ▼
            </button>
          </div>
        )}
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput'; 