'use client'

import * as React from 'react';
import { FieldValues } from 'react-hook-form'
import { cn } from '../../../utils/cn'
import clsx from 'clsx'
import { debounce } from 'lodash'
import { IMaskInput } from 'react-imask'
import type { FormFieldProps, FormFieldValues  } from '@cp/types'
import { z } from 'zod'

// Define the mask options schema
export const maskOptionsSchema = z.object({
  mask: z.union([z.string(), z.instanceof(RegExp), z.any()]), // Using any for complex mask types
  definitions: z.record(z.instanceof(RegExp)).optional(),
  prepare: z.function().args(z.string()).returns(z.string()).optional(),
  commit: z.function().args(z.string()).returns(z.string()).optional(),
  scale: z.number().optional(),
  signed: z.boolean().optional(),
  thousandsSeparator: z.string().optional(),
  padFractionalZeros: z.boolean().optional(),
  normalizeZeros: z.boolean().optional(),
  radix: z.string().optional()
})

export type InputMask = z.infer<typeof maskOptionsSchema>

export interface InputProps<T extends FormFieldValues = FieldValues> extends Omit<FormFieldProps<T>, 'control'> {
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'textarea'
  label?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  maxLength?: number
  showCount?: boolean
  autoResize?: boolean
  debounceMs?: number
  minRows?: number
  maxRows?: number
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  mask?: InputMask
  className?: string
  'data-cy'?: string
  onBlur?: () => void
  onChange?: (value: string) => void
  value?: string
  ref?: React.ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
  error?: string
  helpText?: string
}

export type InputComponent = (<T extends FormFieldValues>(
  props: InputProps<T> & { ref?: React.ForwardedRef<HTMLInputElement | HTMLTextAreaElement> }
) => React.ReactElement) & {
  displayName?: string;
};

export const Input = React.forwardRef<
  HTMLElement,
  InputProps<any>
>(({
    name,
    type = 'text',
    label,
    required,
    disabled,
    placeholder,
    maxLength,
    showCount = false,
    autoResize = false,
    debounceMs = 0,
    minRows = 3,
    maxRows = 10,
    prefix,
    suffix,
    mask,
    className,
    'data-cy': dataCy,
    onBlur,
    onChange,
    value: controlledValue,
    error,
    helpText,
    ...props
  }, ref) => {
  const [value, setValue] = useState(controlledValue || '')
  const [charCount, setCharCount] = useState(0)
  const [rows, setRows] = useState(minRows)

  // Debounced onChange handler
  const debouncedOnChange = useMemo(
    () => debounceMs > 0 ? debounce(onChange || (() => {}), debounceMs) : onChange,
    [onChange, debounceMs]
  ) as ReturnType<typeof debounce>

  // Handle value changes
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    setCharCount(newValue.length)
    
    if (autoResize && type === 'textarea') {
      const textRows = newValue.split('\n').length
      const newRows = Math.min(Math.max(textRows, minRows), maxRows)
      setRows(newRows)
    }

    debouncedOnChange?.(newValue)
  }, [debouncedOnChange, autoResize, type, minRows, maxRows])

  // Cleanup debounced function
  useEffect(() => {
    return () => {
      if (debounceMs > 0 && debouncedOnChange?.cancel) {
        debouncedOnChange.cancel()
      }
    }
  }, [debouncedOnChange, debounceMs])

  // Update controlled value
  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue)
      setCharCount(controlledValue.length)
    }
  }, [controlledValue])

  const inputClassName = clsx(
    'block w-full rounded-md border px-3 py-2 text-sm',
    'transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-opacity-50',
    'hover:border-neutral-400',
    'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-500',
    'dark:bg-neutral-800 dark:text-neutral-200',
    'dark:disabled:bg-neutral-900 dark:disabled:text-neutral-500',
    error ? [
      'border-error-500',
      'focus:border-error-500 focus:ring-error-500',
      'dark:border-error-500 dark:focus:border-error-500 dark:focus:ring-error-500'
    ] : [
      'border-neutral-300',
      'focus:border-primary-500 focus:ring-primary-500',
      'dark:border-neutral-700 dark:focus:border-primary-500 dark:focus:ring-primary-500'
    ],
    (prefix || suffix) && 'rounded-none',
    prefix && 'rounded-l-none',
    suffix && 'rounded-r-none',
    className
  )

  const commonProps = {
    id: name,
    name,
    placeholder,
    disabled,
    autoComplete: 'off',
    'data-cy': dataCy || name,
    className: cn(inputClassName),
    'aria-required': required,
    maxLength,
    onChange: handleChange,
    value,
    onBlur,
    ...props
  }

  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          {...commonProps}
          ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
          rows={rows}
        />
      )
    }

    if (mask) {
      const { onChange, ...maskProps } = commonProps
      return (
        <IMaskInput
          {...maskProps}
          mask={mask.mask}
          onAccept={(value: string) => {
            const event = {
              target: { value },
              currentTarget: { value }
            } as React.ChangeEvent<HTMLInputElement>
            onChange?.(event)
          }}
          inputRef={ref as React.ForwardedRef<HTMLInputElement>}
          scale={mask.scale}
          thousandsSeparator={mask.thousandsSeparator}
          padFractionalZeros={mask.padFractionalZeros}
          normalizeZeros={mask.normalizeZeros}
          radix={mask.radix}
          definitions={mask.definitions}
          prepare={mask.prepare}
          commit={mask.commit}
          {...(mask.signed !== undefined && { signed: mask.signed })}
        />
      )
    }

    return (
      <input
        {...commonProps}
        type={type}
        ref={ref as React.ForwardedRef<HTMLInputElement>}
      />
    )
  }

  return (
    <div className={cn('flex flex-col gap-1', name)}>
      {label && (
        <label
          htmlFor={name}
          className={cn(
            'text-sm font-medium text-neutral-700 dark:text-neutral-200',
            'transition-colors duration-200',
            required && 'after:ml-0.5 after:text-error-500 after:content-["*"]',
            disabled && 'opacity-50'
          )}
        >
          {label}
        </label>
      )}
      <div className="relative flex group">
        {prefix && (
          <div className={cn(
            'inline-flex items-center rounded-l-md border border-r-0 bg-neutral-50 px-3 text-neutral-500',
            'transition-colors duration-200',
            'group-hover:border-neutral-400',
            'dark:bg-neutral-800 dark:text-neutral-400',
            error ? [
              'border-error-500',
              'dark:border-error-500'
            ] : [
              'border-neutral-300',
              'dark:border-neutral-700'
            ]
          )}>
            {prefix}
          </div>
        )}
        {renderInput()}
        {suffix && (
          <div className={cn(
            'inline-flex items-center rounded-r-md border border-l-0 bg-neutral-50 px-3 text-neutral-500',
            'transition-colors duration-200',
            'group-hover:border-neutral-400',
            'dark:bg-neutral-800 dark:text-neutral-400',
            error ? [
              'border-error-500',
              'dark:border-error-500'
            ] : [
              'border-neutral-300',
              'dark:border-neutral-700'
            ]
          )}>
            {suffix}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {error && (
            <p 
              data-cy={`${dataCy || name}-error`}
              className="text-xs text-error-500 dark:text-error-400 mt-1"
              role="alert"
            >
              {error}
            </p>
          )}
          {!error && helpText && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              {helpText}
            </p>
          )}
        </div>
        {showCount && maxLength && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 ml-2">
            {charCount}/{maxLength}
          </p>
        )}
      </div>
    </div>
  )
})

Input.displayName = 'Input' 