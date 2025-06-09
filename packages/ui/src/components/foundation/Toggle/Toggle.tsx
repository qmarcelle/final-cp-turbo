import React from 'react'
import {
  useController,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form'
import clsx from 'clsx'

export interface ToggleProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  required?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
  validation?: RegisterOptions<T, Path<T>>
  'data-cy'?: string
}

export const Toggle = function Toggle<T extends FieldValues>({
  name,
  control,
  label,
  required,
  disabled,
  size = 'md',
  className,
  validation,
  'data-cy': dataCy,
}: ToggleProps<T>) {
  const {
    field: { value, onChange, ref, ...fieldProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: validation,
  })

  // Calculate sizes for toggle switch
  const toggleSizeClasses = {
    sm: 'w-8 h-4 after:w-3 after:h-3',
    md: 'w-10 h-5 after:w-4 after:h-4',
    lg: 'w-12 h-6 after:w-5 after:h-5',
  }

  // Define modern toggle switch styling using design system colors
  const toggleBaseClasses =
    'relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primaryBlue focus-visible:ring-offset-2 ' +
    'border-2 border-transparent ' +
    'after:pointer-events-none after:absolute after:left-[2px] after:top-[2px] after:rounded-full ' +
    'after:bg-white after:shadow-sm after:transition-transform after:duration-200 after:ease-in-out ' +
    'peer-checked:after:translate-x-full'

  // Calculate background colors for toggle states using design system colors
  const bgClasses = clsx(
    'bg-tertiary-gray4 peer-checked:bg-primaryBlue',
    error && 'border-status-error bg-label-error peer-checked:bg-status-error',
    disabled && 'cursor-not-allowed opacity-60'
  )

  return (
    <div className={clsx('form-control', className)}>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          role="switch"
          checked={!!value}
          onChange={e => onChange(e.target.checked)}
          disabled={disabled}
          data-cy={dataCy}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          aria-required={required}
          aria-checked={!!value}
          className="peer sr-only"
          {...fieldProps}
        />
        <span
          className={clsx(
            toggleBaseClasses,
            toggleSizeClasses[size],
            bgClasses
          )}
          aria-hidden="true"
        />
        <span
          className={clsx(
            'ml-2 text-sm font-medium text-tertiary-gray1',
            disabled && 'opacity-60 cursor-not-allowed'
          )}
        >
          {label}
          {required && <span className="text-status-error ml-1">*</span>}
        </span>
      </label>

      {error && (
        <div className="mt-1" id={`${name}-error`}>
          <span className="text-xs text-status-error">
            {error.message as string}
          </span>
        </div>
      )}
    </div>
  )
}

Toggle.displayName = 'Toggle'
