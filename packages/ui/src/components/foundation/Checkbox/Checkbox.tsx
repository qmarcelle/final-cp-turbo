'use client'

import * as React from 'react';
import { useController, Control, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import { cn } from '../../../utils/cn'

export interface CheckboxProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  required?: boolean
  disabled?: boolean
  indeterminate?: boolean
  className?: string
  validation?: RegisterOptions<T>
  'data-cy'?: string
  hint?: string
}

export function Checkbox<T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  required,
  disabled,
  indeterminate,
  className,
  validation,
  'data-cy': dataCy,
  hint,
}: CheckboxProps<T>) {
  // Use a mutable object reference instead of useRef
  const checkboxRef = { current: null as HTMLInputElement | null };

  const {
    field: { value, onChange, ref, ...fieldProps },
    fieldState: { error }
  } = useController({
    name,
    control,
    rules: {
      ...validation,
      required: required ? (validation?.required || 'This field is required') : false,
    },
  })

  // Handle indeterminate state
  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = !!indeterminate
    }
  }, [indeterminate])

  // Generate unique ID for accessibility
  const id = `${name}`.replace(/\./g, '-');

  // Handle ref assignment
  const assignRef = (element: HTMLInputElement) => {
    checkboxRef.current = element;
    if (typeof ref === 'function') {
      ref(element);
    }
  };

  return (
    <div className={cn('form-control', className)}>
      <div className="flex items-start gap-2 relative">
        <input
          id={id}
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          data-cy={dataCy}
          className={cn(
            'form-checkbox',
            error && 'border-error',
            disabled && 'opacity-50 cursor-not-allowed',
            indeterminate && 'bg-primary border-primary opacity-80'
          )}
          ref={assignRef}
          aria-invalid={!!error}
          aria-describedby={
            error 
              ? `${name}-error` 
              : hint 
                ? `${name}-hint` 
                : undefined
          }
          aria-required={required}
          aria-checked={indeterminate ? 'mixed' : !!value}
          {...fieldProps}
        />
        {label && (
          <label 
            htmlFor={id} 
            className={cn(
              'text-sm text-neutral-700 cursor-pointer select-none pt-0.5',
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