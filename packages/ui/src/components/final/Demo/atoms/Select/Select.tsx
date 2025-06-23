import * as React from 'react';
import { useController, Control, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import { cn } from '../../../../../utils/cn'

export interface SelectProps<TFieldValues extends FieldValues = FieldValues> {
  name?: Path<TFieldValues>
  control?: Control<TFieldValues>
  label?: string
  options: Array<{ value: string; label: string; disabled?: boolean }>
  required?: boolean
  disabled?: boolean
  placeholder?: string
  className?: string
  'data-cy'?: string
  rules?: Omit<RegisterOptions<TFieldValues, Path<TFieldValues>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
}

const Select = React.forwardRef<
  HTMLSelectElement,
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
    rules,
  }, ref) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: name || '',
    control,
    rules: {
      ...rules,
      required: required || rules?.required,
    },
  })

  return (
    <div className="form-control">
      {label && (
        <label
          htmlFor={name}
          className={cn(
            'form-label',
            required && 'required',
            disabled && 'opacity-50'
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
          'form-select',
          error && 'error',
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
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && (
        <p className="form-error" role="alert" id={`${name}-error`}>
          {error.message}
        </p>
      )}
    </div>
  )
})

Select.displayName = 'Select'

export { Select }