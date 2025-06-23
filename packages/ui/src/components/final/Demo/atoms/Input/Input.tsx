import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const inputVariants = cva(
  "form-input",
  {
    variants: {
      variant: {
        default: "",
        error: "error",
        success: "success",
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
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'textarea' | 'date';
  /** Label for the input */
  label?: string;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Error state or message */
  error?: boolean | string;
  /** Success state */
  success?: boolean;
  /** Helper text */
  helperText?: string;
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
    ...props
  }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [value, setValue] = React.useState<string>(String(props.value || ''));

    React.useEffect(() => {
      setValue(String(props.value || ''));
    }, [props.value]);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
        props.onChange?.(e as any);
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
      value,
    };

    return (
      <div className="form-control">
        {label && (
          <label className={cn("form-label", props.required && "required")}>
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              {leftIcon}
            </div>
          )}
          
          {type === 'textarea' ? (
            <textarea
              {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
              className={cn("form-textarea", inputProps.className)}
              rows={rows || 4}
              onChange={handleChange}
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
        </div>
        
        {(error || helperText) && (
          <p className={cn(
            error ? "form-error" : "form-hint"
          )}>
            {typeof error === 'string' ? error : helperText}
          </p>
        )}
        
        {showCount && maxLength && (
          <div className="form-hint text-right">
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