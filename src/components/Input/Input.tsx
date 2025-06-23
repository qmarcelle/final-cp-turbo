'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-slate-200',
        error: 'border-red-500',
        success: 'border-green-500',
        warning: 'border-yellow-500',
      },
      inputSize: {
        sm: 'h-8 px-2 text-xs',
        default: 'h-10',
        lg: 'h-12 px-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Optional prefix element */
  prefix?: React.ReactNode
  /** Optional suffix element */
  suffix?: React.ReactNode
  /** Optional help text */
  helpText?: string
  /** Optional error message */
  error?: string
  /** Whether to show character count */
  showCount?: boolean
  /** Debounce timeout in milliseconds */
  debounceMs?: number
  /** Callback for debounced value changes */
  onDebouncedChange?: (value: string) => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      variant,
      inputSize,
      prefix,
      suffix,
      helpText,
      error,
      showCount,
      maxLength,
      debounceMs = 0,
      onDebouncedChange,
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(value ?? '')
    const [charCount, setCharCount] = React.useState(0)
    const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null)

    // Update internal value when controlled value changes
    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value)
        setCharCount(String(value).length)
      }
    }, [value])

    // Handle value changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      
      // Update internal state
      if (value === undefined) {
        setInternalValue(newValue)
      }
      setCharCount(newValue.length)

      // Call standard onChange if provided
      onChange?.(e)

      // Handle debouncing
      if (onDebouncedChange && debounceMs > 0) {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current)
        }
        debounceTimerRef.current = setTimeout(() => {
          onDebouncedChange(newValue)
        }, debounceMs)
      } else if (onDebouncedChange) {
        onDebouncedChange(newValue)
      }
    }

    // Cleanup debounce timer
    React.useEffect(() => {
      return () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current)
        }
      }
    }, [])

    return (
      <div className="relative w-full">
        <div className="relative flex">
          {prefix && (
            <div className="flex items-center rounded-l-md border border-r-0 border-slate-200 bg-slate-50 px-3 text-slate-500">
              {prefix}
            </div>
          )}
          <input
            type={type}
            value={internalValue}
            onChange={handleChange}
            ref={ref}
            className={cn(
              inputVariants({ variant, inputSize }),
              prefix && 'rounded-l-none',
              suffix && 'rounded-r-none',
              className
            )}
            {...props}
          />
          {suffix && (
            <div className="flex items-center rounded-r-md border border-l-0 border-slate-200 bg-slate-50 px-3 text-slate-500">
              {suffix}
            </div>
          )}
        </div>
        <div className="mt-1 flex items-center justify-between text-xs">
          <div className="flex-1">
            {error ? (
              <p className="text-red-500" role="alert">
                {error}
              </p>
            ) : helpText ? (
              <p className="text-slate-500">{helpText}</p>
            ) : null}
          </div>
          {showCount && maxLength && (
            <p className="ml-2 text-slate-500">
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input, inputVariants } 