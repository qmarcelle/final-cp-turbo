import clsx from 'clsx'
import * as React from 'react'
import { useController, Control, FieldValues, Path } from 'react-hook-form'

export interface InputGroupProps<T extends FieldValues = FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'suffix' | 'size'> {
  name?: Path<T>
  control?: Control<T>
  label?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  unit?: string
  validation?: Record<string, any>
  size?: 'sm' | 'md' | 'lg'
  'data-cy'?: string
}

export const InputGroup = React.forwardRef(function InputGroup<T extends FieldValues>(
  {
    name,
    control,
    label,
    className,
    type = 'text',
    prefix,
    suffix,
    unit,
    validation,
    size = 'md',
    'data-cy': dataCy,
    ...props
  }: InputGroupProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const isControlled = name && control;
  const { field, fieldState } = isControlled ? useController({ name, control, rules: validation }) : { field: {}, fieldState: {} };
  const { error } = fieldState;

  const inputProps = isControlled ? { ...field, ...props } : { ...props, ref };

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  }

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
          data-cy={`${dataCy || name}-label`}
        >
          {label}
        </label>
      )}
      <div
        className={clsx(
          'group relative flex rounded-lg shadow-sm',
          error && 'shadow-red-500/10',
          className
        )}
      >
        {prefix && (
          <div
            className={clsx(
              'flex items-center rounded-l-lg border border-r-0 border-zinc-950/10 bg-zinc-950/[2.5%] px-3 dark:border-white/10 dark:bg-white/5',
              sizeClasses[size],
              error && 'border-red-500'
            )}
            data-cy={`${dataCy || name}-prefix`}
          >
            {prefix}
          </div>
        )}
        <div className="relative flex-1">
          <input
            {...inputProps}
            id={name}
            type={type}
            data-cy={dataCy || name}
            className={clsx(
              'block w-full appearance-none rounded-lg',
              'text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white',
              'border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20',
              'bg-transparent dark:bg-white/5',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              sizeClasses[size],
              error && 'border-red-500',
              prefix && 'rounded-l-none border-l-0',
              (suffix || unit) && 'rounded-r-none border-r-0'
            )}
          />
        </div>
        {(suffix || unit) && (
          <div
            className={clsx(
              'flex items-center rounded-r-lg border border-l-0 border-zinc-950/10 px-3 dark:border-white/10',
              !unit && 'bg-zinc-950/[2.5%] dark:bg-white/5',
              unit && 'bg-zinc-950/[5%] dark:bg-white/[7.5%]',
              sizeClasses[size],
              error && 'border-red-500'
            )}
            data-cy={`${dataCy || name}-${unit ? 'unit' : 'suffix'}`}
          >
            {unit ? (
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {unit}
              </span>
            ) : (
              suffix
            )}
          </div>
        )}
      </div>
      {error && (
        <p
          className="mt-2 text-sm text-red-600 dark:text-red-500"
          data-cy={`${dataCy || name}-error`}
        >
          {error.message}
        </p>
      )}
    </div>
  )
}) 