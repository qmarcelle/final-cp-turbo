import React from 'react'
import { FieldValues, Controller } from 'react-hook-form'
import { cn } from '../../../lib/utils'
import type { TextAreaProps, ControlledTextAreaProps } from '../../../types'

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
}: TextAreaProps) {
  const [value, setValue] = React.useState(controlledValue || '')

  // Handle value changes
  const handleChange = React.useCallback(
    (e: any) => {
      const newValue = e.target.value
      setValue(newValue)
      onChange?.(newValue)
    },
    [onChange]
  )

  // Update controlled value
  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue)
    }
  }, [controlledValue])

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <label
          htmlFor={name}
          className={cn(
            'text-sm font-medium text-gray-700',
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
          !resize && 'resize-none',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500'
        )}
        aria-required={required}
        aria-invalid={!!error}
        {...rest}
      />

      {description && !error && (
        <p className="text-xs text-gray-500">{description}</p>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

TextArea.displayName = 'TextArea'

export const ControlledTextArea = <T extends FieldValues = FieldValues>({
  control,
  name,
  validation,
  error,
  ...props
}: ControlledTextAreaProps<T>): React.ReactElement => {
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
  )
}
