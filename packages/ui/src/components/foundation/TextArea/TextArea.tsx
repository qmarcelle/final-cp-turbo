import React from 'react';
import { FieldValues, Controller, Control, type Path } from 'react-hook-form';
import { cn } from '../../../utils/cn';
import type { FormFieldProps, FormFieldValues } from '@portals/types';

export interface TextAreaProps<T extends FormFieldValues = FieldValues> 
extends Omit<FormFieldProps<T>, 'control'> {
  label?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  resize?: boolean;
  className?: string;
  'data-cy'?: string;
  onBlur?: () => void;
  onChange?: (value: string) => void;
  value?: string;
  error?: string;
}

export interface ControlledTextAreaProps<T extends FormFieldValues = FieldValues> 
extends Omit<TextAreaProps<T>, 'validation'> {
  control: Control<T>;
  name: Path<T>;
  validation?: any; // Using 'any' here to avoid complex type issues
}

// Simple version of TextArea without forwardRef to avoid type issues
export function TextArea({
  name,
  label,
  description,
  required,
  disabled,
  placeholder,
  rows = 4,
  maxLength,
  resize = true,
  className,
  'data-cy': dataCy,
  onBlur,
  onChange,
  value: controlledValue,
  error,
  ...rest
}: TextAreaProps<any>) {
  const [value, setValue] = React.useState(controlledValue || '');

  // Handle value changes
  const handleChange = React.useCallback((e: any) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  }, [onChange]);

  // Update controlled value
  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <label
          htmlFor={name}
          className={cn(
            'text-sm font-medium text-gray-700 dark:text-gray-200',
            'transition-colors duration-200',
            required && 'after:ml-0.5 after:text-red-500 after:content-["*"]',
            disabled && 'opacity-50'
          )}
        >
          {label}
        </label>
      )}
      
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        data-cy={dataCy || name}
        className={cn(
          'block w-full rounded-md border border-gray-300 px-3 py-2 text-sm',
          'transition-all duration-200 ease-in-out',
          'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
          'hover:border-gray-400',
          'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
          'dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200',
          'dark:focus:border-blue-500 dark:focus:ring-blue-500',
          'dark:disabled:bg-gray-800 dark:disabled:text-gray-400',
          !resize && 'resize-none',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500'
        )}
        aria-required={required}
        aria-invalid={!!error}
        {...rest}
      />
      
      {description && !error && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
      
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

TextArea.displayName = 'TextArea';

export const ControlledTextArea = <T extends FormFieldValues = FieldValues>({
  control,
  name,
  validation,
  error,
  ...props
}: ControlledTextAreaProps<T>): JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      rules={validation}
      render={({ field, fieldState }) => (
        <TextArea
          {...props}
          {...field}
          name={name}
          error={error || fieldState.error?.message}
        />
      )}
    />
  );
}; 