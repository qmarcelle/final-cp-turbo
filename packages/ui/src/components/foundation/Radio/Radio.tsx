'use client'

import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react'
import clsx from 'clsx'
import { useController, Control, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import { cn } from '@/utils/cn'

export interface RadioOption {
  value: string | number
  label: string
  description?: string
  disabled?: boolean
}

export interface RadioProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  value: string | number
  required?: boolean
  disabled?: boolean
  className?: string
  validation?: RegisterOptions<T>
  'data-cy'?: string
  hint?: string
}

export interface RadioGroupProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  options: RadioOption[]
  required?: boolean
  disabled?: boolean
  direction?: 'horizontal' | 'vertical'
  className?: string
  validation?: RegisterOptions<T>
  'data-cy'?: string
  hint?: string
}

// Basic Radio Input Component
export function Radio<T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  value,
  required,
  disabled,
  className,
  validation,
  'data-cy': dataCy,
  hint,
}: RadioProps<T>) {
  const {
    field: { value: fieldValue, onChange, ref, ...fieldProps },
    fieldState: { error }
  } = useController({
    name,
    control,
    rules: {
      ...validation,
      required: required ? 'This field is required' : false,
    },
  })

  const checked = fieldValue === value
  const id = `${name}-${value}`.replace(/\./g, '-')

  return (
    <div className={cn('form-control', className)} data-cy={dataCy}>
      <div className="flex items-start gap-2 relative">
        <input
          id={id}
          type="radio"
          checked={checked}
          onChange={() => onChange(value)}
          value={value}
          disabled={disabled}
          className={cn(
            'form-radio',
            error && 'border-error',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={
            error 
              ? `${name}-error` 
              : hint 
                ? `${name}-hint` 
                : undefined
          }
          aria-required={required}
          aria-checked={checked}
          {...fieldProps}
        />
        {label && (
          <label 
            htmlFor={id} 
            className={cn(
              'text-sm text-neutral-700 cursor-pointer select-none',
              required && 'after:content-["*"] after:ml-0.5 after:text-error',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {label}
          </label>
        )}
      </div>
      
      {error && (
        <div 
          className="form-error mt-1"
          id={`${name}-error`}
          role="alert"
        >
          {error.message as string}
        </div>
      )}
      
      {hint && !error && (
        <div 
          className="form-hint mt-1"
          id={`${name}-hint`}
        >
          {hint}
        </div>
      )}
    </div>
  )
}

// Enhanced Radio Group Component
export function RadioGroup<T extends FieldValues>({
  name,
  control,
  label,
  options,
  required,
  disabled,
  direction = 'vertical',
  className,
  validation,
  'data-cy': dataCy,
  hint,
}: RadioGroupProps<T>) {
  const {
    field: { value, onChange },
    fieldState: { error }
  } = useController({
    name,
    control,
    rules: {
      ...validation,
      required: required ? 'This field is required' : false,
    },
  })

  const groupId = name.replace(/\./g, '-')
  
  return (
    <div className={cn('form-control w-full', className)}>
      {label && (
        <label
          id={`${groupId}-label`}
          className={cn(
            'form-label mb-2',
            required && 'required',
            disabled && 'opacity-50'
          )}
        >
          {label}
        </label>
      )}
      
      <HeadlessRadioGroup
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={
          error 
            ? `${groupId}-error` 
            : hint 
              ? `${groupId}-hint` 
              : undefined
        }
        aria-invalid={!!error}
        aria-required={required}
        className="w-full"
      >
        <div 
          className={cn(
            'flex gap-3',
            direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
          )}
        >
          {options.map((option) => (
            <HeadlessRadioGroup.Option
              key={option.value}
              value={option.value}
              disabled={disabled || option.disabled}
              className={({ active, checked, disabled }) =>
                cn(
                  'relative flex cursor-pointer rounded-lg px-4 py-3 transition-all',
                  checked
                    ? 'bg-primary-light border-2 border-primary text-neutral-800'
                    : 'bg-white border-2 border-neutral-200 hover:border-neutral-300',
                  active && 'ring-2 ring-primary-ring',
                  disabled && 'cursor-not-allowed opacity-50',
                  error && !checked && 'border-error ring-1 ring-error'
                )
              }
              data-cy={`${dataCy}-${option.value}`}
            >
              {({ checked }) => (
                <div className="flex w-full items-center gap-3">
                  <div className={cn(
                    'h-5 w-5 flex-shrink-0 rounded-full border-2',
                    checked 
                      ? 'border-primary bg-primary' 
                      : 'border-neutral-300'
                  )}>
                    {checked && (
                      <div className="h-full w-full rounded-full relative">
                        <div className="absolute inset-0.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <HeadlessRadioGroup.Label
                      as="p"
                      className={cn(
                        'font-medium text-sm',
                        checked
                          ? 'text-neutral-800'
                          : 'text-neutral-700'
                      )}
                    >
                      {option.label}
                    </HeadlessRadioGroup.Label>
                    {option.description && (
                      <HeadlessRadioGroup.Description
                        as="span"
                        className={cn(
                          'text-xs',
                          checked
                            ? 'text-neutral-700'
                            : 'text-neutral-500'
                        )}
                      >
                        {option.description}
                      </HeadlessRadioGroup.Description>
                    )}
                  </div>
                </div>
              )}
            </HeadlessRadioGroup.Option>
          ))}
        </div>
      </HeadlessRadioGroup>
      
      {error && (
        <div 
          className="form-error mt-1.5"
          id={`${groupId}-error`}
          role="alert"
        >
          {error.message as string}
        </div>
      )}
      
      {hint && !error && (
        <div 
          className="form-hint mt-1.5"
          id={`${groupId}-hint`}
        >
          {hint}
        </div>
      )}
    </div>
  )
} 