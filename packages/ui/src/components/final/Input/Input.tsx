import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

const inputVariants = cva(
  "flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input",
        error: "border-error",
        success: "border-success",
      },
      inputSize: {
        sm: "h-8",
        md: "h-10",
        lg: "h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Type of input */
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'textarea';
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Error state */
  error?: boolean;
  /** Success state */
  success?: boolean;
  /** Number of rows for textarea */
  rows?: number;
  /** Whether textarea can be resized */
  resize?: boolean;
  /** Whether to show character count */
  showCount?: boolean;
  /** Maximum length of input */
  maxLength?: number;
  /** Debounce delay in milliseconds */
  debounceMs?: number;
  /** Input mask configuration */
  mask?: {
    mask: string | RegExp;
    [key: string]: any;
  };
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type = 'text',
    variant,
    inputSize,
    leftIcon,
    rightIcon,
    error,
    success,
    rows,
    resize = true,
    showCount,
    maxLength,
    debounceMs,
    mask,
    ...props
  }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [value, setValue] = React.useState(props.value || '');

    React.useEffect(() => {
      setValue(props.value || '');
    }, [props.value]);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        props.onChange?.(e);
      },
      [props.onChange]
    );

    const debouncedHandleChange = React.useMemo(
      () => debounceMs ? debounce(handleChange, debounceMs) : handleChange,
      [handleChange, debounceMs]
    );

    const inputProps = {
      ...props,
      onChange: debouncedHandleChange,
      className: cn(
        inputVariants({ variant: error ? 'error' : success ? 'success' : variant, inputSize }),
        type === 'textarea' && !resize && 'resize-none',
        className
      ),
      ref: ref || inputRef,
      type: type === 'textarea' ? undefined : type,
      maxLength,
    };

    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {leftIcon}
          </div>
        )}
        
        {type === 'textarea' ? (
          <textarea
            {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            rows={rows || 4}
          />
        ) : mask ? (
          <input {...inputProps} />
        ) : (
          <input {...inputProps} />
        )}
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
        
        {showCount && maxLength && (
          <div className="absolute right-3 -bottom-6 text-xs text-gray-500">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// Utility function for debouncing
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}