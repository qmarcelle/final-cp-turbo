import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import * as React from 'react'
import { useCallback } from 'react'
import { useController, Control, FieldValues, Path } from 'react-hook-form'
import { cn } from '../../../lib/utils'

export interface NumberInputProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  className?: string
  placeholder?: string
  min?: number
  max?: number
  step?: number
  precision?: number
  allowNegative?: boolean
  showControls?: boolean
  formatOptions?: Intl.NumberFormatOptions
  validation?: Record<string, any>
  'data-cy'?: string
}

function formatNumber(
  value: number | undefined,
  options?: Intl.NumberFormatOptions
): string {
  if (value === undefined) return ''
  return new Intl.NumberFormat('en-US', options).format(value)
}

function parseNumber(value: string): number | undefined {
  const parsed = parseFloat(value.replace(/[^\d.-]/g, ''))
  return isNaN(parsed) ? undefined : parsed
}

export function ControlledNumberInput<T extends FieldValues>({
  name,
  control,
  label,
  className,
  placeholder = 'Enter a number',
  min,
  max,
  step = 1,
  precision = 0,
  allowNegative = true,
  showControls = true,
  formatOptions,
  validation,
  'data-cy': dataCy,
  ...props
}: NumberInputProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: validation,
  })

  const handleChange = useCallback(
    (value: string) => {
      const parsed = parseNumber(value)
      if (parsed === undefined) {
        field.onChange(undefined)
        return
      }

      let finalValue = parsed
      if (!allowNegative) finalValue = Math.max(0, finalValue)
      if (min !== undefined) finalValue = Math.max(min, finalValue)
      if (max !== undefined) finalValue = Math.min(max, finalValue)
      if (precision !== undefined) {
        const factor = Math.pow(10, precision)
        finalValue = Math.round(finalValue * factor) / factor
      }

      field.onChange(finalValue)
    },
    [field, min, max, precision, allowNegative]
  )

  const increment = useCallback(() => {
    const currentValue = parseFloat(field.value) || 0
    handleChange((currentValue + step).toString())
  }, [field.value, step, handleChange])

  const decrement = useCallback(() => {
    const currentValue = parseFloat(field.value) || 0
    handleChange((currentValue - step).toString())
  }, [field.value, step, handleChange])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        increment()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        decrement()
      }
    },
    [increment, decrement]
  )

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="form-label"
          data-cy={`${dataCy || name}-label`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          id={name}
          value={formatNumber(field.value, formatOptions)}
          onChange={e => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'form-input',
            showControls ? 'pr-20' : '',
            error && 'error',
            className
          )}
          data-cy={dataCy || name}
          {...props}
        />
        {showControls && (
          <div className="absolute inset-y-0 right-0 flex">
            <div className="flex flex-col border-l border-tertiary-gray4">
              <button
                type="button"
                onClick={increment}
                disabled={max !== undefined && (field.value || 0) >= max}
                className={cn(
                  'flex h-1/2 w-10 items-center justify-center',
                  'border-b border-tertiary-gray4',
                  'text-tertiary-gray3 hover:text-primary focus:text-primary',
                  'focus:outline-none focus:ring-2 focus:ring-primary',
                  'disabled:cursor-not-allowed disabled:opacity-50'
                )}
                data-cy={`${dataCy || name}-increment`}
              >
                <ChevronUpIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={decrement}
                disabled={
                  (min !== undefined && (field.value || 0) <= min) ||
                  (!allowNegative && (field.value || 0) <= 0)
                }
                className={cn(
                  'flex h-1/2 w-10 items-center justify-center',
                  'text-tertiary-gray3 hover:text-primary focus:text-primary',
                  'focus:outline-none focus:ring-2 focus:ring-primary',
                  'disabled:cursor-not-allowed disabled:opacity-50'
                )}
                data-cy={`${dataCy || name}-decrement`}
              >
                <ChevronDownIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className="form-error" data-cy={`${dataCy || name}-error`}>
          {error.message}
        </p>
      )}
    </div>
  )
}

// Basic NumberInput component without form control
export function NumberInput({
  value,
  onChange,
  className,
  placeholder = 'Enter a number',
  min,
  max,
  step = 1,
  precision = 0,
  allowNegative = true,
  showControls = true,
  formatOptions,
  disabled = false,
  'data-cy': dataCy,
  ...props
}: {
  value: number | undefined
  onChange: (value: number | undefined) => void
  className?: string
  placeholder?: string
  min?: number
  max?: number
  step?: number
  precision?: number
  allowNegative?: boolean
  showControls?: boolean
  formatOptions?: Intl.NumberFormatOptions
  disabled?: boolean
  'data-cy'?: string
}) {
  const handleChange = useCallback(
    (value: string) => {
      const parsed = parseNumber(value)
      if (parsed === undefined) {
        onChange(undefined)
        return
      }

      let finalValue = parsed
      if (!allowNegative) finalValue = Math.max(0, finalValue)
      if (min !== undefined) finalValue = Math.max(min, finalValue)
      if (max !== undefined) finalValue = Math.min(max, finalValue)
      if (precision !== undefined) {
        const factor = Math.pow(10, precision)
        finalValue = Math.round(finalValue * factor) / factor
      }

      onChange(finalValue)
    },
    [onChange, min, max, precision, allowNegative]
  )

  const increment = useCallback(() => {
    const currentValue = value || 0
    handleChange((currentValue + step).toString())
  }, [value, step, handleChange])

  const decrement = useCallback(() => {
    const currentValue = value || 0
    handleChange((currentValue - step).toString())
  }, [value, step, handleChange])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        increment()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        decrement()
      }
    },
    [increment, decrement]
  )

  return (
    <div className="relative">
      <input
        type="text"
        value={formatNumber(value, formatOptions)}
        onChange={e => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={cn('form-input', showControls ? 'pr-20' : '', className)}
        data-cy={dataCy}
        {...props}
      />
      {showControls && (
        <div className="absolute inset-y-0 right-0 flex">
          <div className="flex flex-col border-l border-tertiary-gray4">
            <button
              type="button"
              onClick={increment}
              disabled={disabled || (max !== undefined && (value || 0) >= max)}
              className={cn(
                'flex h-1/2 w-10 items-center justify-center',
                'border-b border-tertiary-gray4',
                'text-tertiary-gray3 hover:text-primary focus:text-primary',
                'focus:outline-none focus:ring-2 focus:ring-primary',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
              data-cy={`${dataCy}-increment`}
            >
              <ChevronUpIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={decrement}
              disabled={
                disabled ||
                (min !== undefined && (value || 0) <= min) ||
                (!allowNegative && (value || 0) <= 0)
              }
              className={cn(
                'flex h-1/2 w-10 items-center justify-center',
                'text-tertiary-gray3 hover:text-primary focus:text-primary',
                'focus:outline-none focus:ring-2 focus:ring-primary',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
              data-cy={`${dataCy}-decrement`}
            >
              <ChevronDownIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
