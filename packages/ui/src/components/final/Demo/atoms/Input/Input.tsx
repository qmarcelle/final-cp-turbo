import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const inputVariants = cva(
  [
    'w-full',
    'px-3',
    'py-2',
    'text-base',
    'border',
    'border-gray-300',
    'rounded-md',
    'bg-white',
    'text-gray-900',
    'shadow-sm',
    'transition-all',
    'duration-200',
    'placeholder:text-gray-400',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-blue-500',
    'focus:border-transparent',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
  ].join(' '),
  {
    variants: {
      variant: {
        default: '',
        error: [
          'border-red-300',
          'focus:ring-red-500',
          'placeholder:text-red-300',
        ].join(' '),
        success: [
          'border-green-300',
          'focus:ring-green-500',
          'placeholder:text-green-300',
        ].join(' '),
      },
      inputSize: {
        sm: 'h-8 text-sm',
        md: 'h-10',
        lg: 'h-12 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Type of input */
  type?:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'search'
    | 'tel'
    | 'url'
    | 'textarea'
    | 'date'
  /** Label for the input */
  label?: string
  /** Left icon */
  leftIcon?: React.ReactNode
  /** Right icon */
  rightIcon?: React.ReactNode
  /** Error state or message */
  error?: boolean | string
  /** Success state */
  success?: boolean
  /** Helper text */
  helperText?: string
  /** Number of rows for textarea */
  rows?: number
  /** Whether textarea can be resized */
  resize?: boolean
  /** Whether to show character count */
  showCount?: boolean
  /** Maximum length of input */
  maxLength?: number
  /** Debounce delay in milliseconds */
  debounceMs?: number
  /** Input mask configuration */
  mask?: {
    mask: string | RegExp
    [key: string]: any
  }
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      variant,
      inputSize,
      label,
      leftIcon,
      rightIcon,
      error,
      success,
      helperText,
      rows,
      resize = true,
      showCount,
      maxLength,
      debounceMs,
      mask,
      required,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [value, setValue] = React.useState<string>(String(props.value || ''))

    React.useEffect(() => {
      setValue(String(props.value || ''))
    }, [props.value])

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value)
        props.onChange?.(e as any)
      },
      [props.onChange]
    )

    const debouncedHandleChange = React.useMemo(
      () => (debounceMs ? debounce(handleChange, debounceMs) : handleChange),
      [handleChange, debounceMs]
    )

    const inputClasses = cn(
      inputVariants({
        variant: error ? 'error' : success ? 'success' : variant,
        inputSize,
      }),
      leftIcon && 'pl-10',
      rightIcon && 'pr-10',
      type === 'textarea' && !resize && 'resize-none',
      className
    )

    const inputProps = {
      ...props,
      onChange: debouncedHandleChange,
      className: inputClasses,
      ref: ref || inputRef,
      type: type === 'textarea' ? undefined : type,
      maxLength,
      value,
    }

    return (
      <div className="form-control">
        {label && (
          <label
            className={cn(
              'block text-sm font-medium text-gray-700 mb-1',
              required && "after:content-['*'] after:ml-0.5 after:text-red-500"
            )}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          {type === 'textarea' ? (
            <textarea
              {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
              className={cn(
                inputClasses,
                'min-h-[80px]',
                !resize && 'resize-none'
              )}
              rows={rows || 4}
              onChange={handleChange}
            />
          ) : mask ? (
            <input {...inputProps} />
          ) : (
            <input {...inputProps} />
          )}

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p
            className={cn(
              'mt-1 text-sm flex items-center gap-1',
              error ? 'text-red-600' : 'text-gray-500'
            )}
          >
            {error && <span className="text-red-500">⚠</span>}
            {typeof error === 'string' ? error : helperText}
          </p>
        )}

        {showCount && maxLength && (
          <div className="mt-1 text-sm text-gray-500 text-right">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// Utility function for debouncing
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
