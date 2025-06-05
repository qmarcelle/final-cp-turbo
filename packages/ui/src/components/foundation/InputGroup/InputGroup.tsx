import clsx from 'clsx'
import * as React from 'react';
import { useController, Control, FieldValues, Path } from 'react-hook-form'

export interface InputGroupProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  className?: string
  type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url'
  placeholder?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  unit?: string
  validation?: Record<string, any>
  'data-cy'?: string
}

export function ControlledInputGroup<T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  className,
  prefix,
  suffix,
  unit,
  validation,
  'data-cy': dataCy,
  ...props
}: InputGroupProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: validation,
  })

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
              error && 'border-red-500'
            )}
            data-cy={`${dataCy || name}-prefix`}
          >
            {prefix}
          </div>
        )}
        <div className="relative flex-1">
          <input
            {...field}
            {...props}
            id={name}
            type={type}
            data-cy={dataCy || name}
            className={clsx(
              'block w-full appearance-none rounded-lg px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)]',
              'text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white',
              'border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20',
              'bg-transparent dark:bg-white/5',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
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
}

// Basic InputGroup component without form control
export const InputGroup = forwardRef(function InputGroup(
  {
    className,
    prefix,
    suffix,
    unit,
    'data-cy': dataCy,
    ...props
  }: {
    className?: string
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    unit?: string
    'data-cy'?: string
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <div
      className={clsx(
        'group relative flex rounded-lg shadow-sm',
        className
      )}
    >
      {prefix && (
        <div
          className="flex items-center rounded-l-lg border border-r-0 border-zinc-950/10 bg-zinc-950/[2.5%] px-3 dark:border-white/10 dark:bg-white/5"
          data-cy={`${dataCy}-prefix`}
        >
          {prefix}
        </div>
      )}
      <div className="relative flex-1">
        <input
          ref={ref}
          {...props}
          data-cy={dataCy}
          className={clsx(
            'block w-full appearance-none rounded-lg px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)]',
            'text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white',
            'border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20',
            'bg-transparent dark:bg-white/5',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
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
            unit && 'bg-zinc-950/[5%] dark:bg-white/[7.5%]'
          )}
          data-cy={`${dataCy}-${unit ? 'unit' : 'suffix'}`}
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
  )
}) 