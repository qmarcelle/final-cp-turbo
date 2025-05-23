import * as React from 'react';
import { useController, Control, FieldValues, Path } from 'react-hook-form'
import { cn } from '../../../utils/cn'

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: string
  options: SelectOption[]
  required?: boolean
  disabled?: boolean
  placeholder?: string
  className?: string
  'data-cy'?: string
}

export type SelectComponent = <TFieldValues extends FieldValues = FieldValues>(
  props: SelectProps<TFieldValues> & { ref?: React.ForwardedRef<HTMLSelectElement> }
) => React.ReactElement;

export const Select = React.forwardRef<
  HTMLElement,
  SelectProps<any>
>(({
    name,
    control,
    label,
    options,
    required,
    disabled,
    placeholder,
    className,
    'data-cy': dataCy,
  }, ref) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={name}
          className={cn(
            'text-sm font-medium text-gray-700',
            required && 'after:ml-0.5 after:text-red-500 after:content-["*"]',
            disabled && 'text-gray-400'
          )}
        >
          {label}
        </label>
      )}
      <select
        {...field}
        ref={ref}
        id={name}
        disabled={disabled}
        data-cy={dataCy}
        className={cn(
          'block w-full rounded-md border border-gray-300 px-3 py-2 text-sm',
          'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
          'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          className
        )}
        aria-invalid={!!error}
        aria-required={required}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(({ value, label, disabled }) => (
          <option key={value} value={value} disabled={disabled}>
            {label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500" role="alert" id={`${name}-error`}>
          {error.message}
        </p>
      )}
    </div>
  )
}) as SelectComponent

Select.displayName = 'Select' 