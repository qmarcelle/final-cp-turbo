import * as React from 'react'
import {
  useController,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form'
import { cn } from '../../../../../utils/cn'

export interface SelectProps<TFieldValues extends FieldValues = FieldValues> {
  name?: Path<TFieldValues>
  control?: Control<TFieldValues>
  label?: string
  options: Array<{
    value: string
    label: string
    disabled?: boolean
    options?: Array<{ value: string; label: string; disabled?: boolean }>
  }>
  required?: boolean
  disabled?: boolean
  placeholder?: string
  className?: string
  'data-cy'?: string
  'aria-label'?: string
  multiple?: boolean
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >
  value?: string | string[]
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  error?: { message: string } | null
  size?: 'sm' | 'default' | 'lg'
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps<any>>(
  (
    {
      name,
      control,
      label,
      options,
      required,
      disabled,
      placeholder,
      className,
      'data-cy': dataCy,
      'aria-label': ariaLabel,
      multiple,
      rules,
      value: propValue,
      onChange: propOnChange,
      error: propError,
      size = 'default',
      ...props
    },
    ref
  ) => {
    // Use form control if available, otherwise use props
    let field
    let error

    if (control && name) {
      const { field: formField, fieldState } = useController({
        name,
        control,
        rules: {
          ...rules,
          required: required || rules?.required,
        },
      })
      field = formField
      error = fieldState.error
    } else {
      field = {
        value: propValue,
        onChange: propOnChange,
        ref: null,
      }
      error = propError
    }

    const sizeClasses = {
      sm: 'px-2 py-1 text-sm',
      default: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    }

    return (
      <div className="form-control w-full">
        {label && (
          <label
            htmlFor={name}
            className={cn(
              'block text-sm font-medium text-gray-700 mb-1.5',
              required && "after:content-['*'] after:ml-0.5 after:text-red-500",
              disabled && 'opacity-50'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            {...field}
            {...props}
            ref={ref}
            id={name}
            disabled={disabled}
            data-cy={dataCy}
            className={cn(
              'w-full',
              sizeClasses[size],
              'border border-gray-300 rounded-md',
              'bg-white text-gray-900',
              'shadow-sm',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'hover:border-gray-400',
              error && 'border-red-300 focus:ring-red-500',
              multiple && 'min-h-[120px]',
              className
            )}
            aria-invalid={!!error}
            aria-required={required}
            aria-describedby={error ? `${name}-error` : undefined}
            multiple={multiple}
          >
            {placeholder && !multiple && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map(({ value, label, options: subOptions, disabled }) => {
              if (subOptions) {
                return (
                  <optgroup key={value} label={label} className="font-medium">
                    {subOptions.map(
                      ({
                        value: subValue,
                        label: subLabel,
                        disabled: subDisabled,
                      }) => (
                        <option
                          key={`${value}-${subValue}`}
                          value={subValue}
                          disabled={subDisabled}
                          className={cn('py-1', disabled && 'text-gray-400')}
                        >
                          {subLabel}
                        </option>
                      )
                    )}
                  </optgroup>
                )
              }
              return (
                <option
                  key={value}
                  value={value}
                  disabled={disabled}
                  className={cn('py-1', disabled && 'text-gray-400')}
                >
                  {label}
                </option>
              )
            })}
          </select>
          {!multiple && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        {error && (
          <p
            className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
            role="alert"
            id={`${name}-error`}
          >
            <span className="text-red-500">⚠</span>
            {error.message}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export { Select }
