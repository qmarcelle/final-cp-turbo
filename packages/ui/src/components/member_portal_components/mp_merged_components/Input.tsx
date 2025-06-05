import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { IMaskMixin } from 'react-imask';
import { cn } from '@bcbst/ui/src/utils/cn'; // Assuming a utility like this exists based on shadcn pattern
import { Slot } from '@radix-ui/react-slot';

// --- CVA Variants ---

const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input',
        error: 'border-destructive focus-visible:ring-destructive',
      },
      size: {
        default: 'h-10 py-2 px-3',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8', // Example sizes
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// --- Masked Input Component ---
// Using IMaskMixin to create a masked input component
// We need to define props specifically for the masked component if we want type safety
interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: any; // Type according to react-imask documentation
  unmask?: boolean | 'typed';
  radix?: string;
  mapToRadix?: string[];
  // Add other IMask specific props here if needed
  onAccept?: (value: any, maskRef: any) => void;
  onComplete?: (value: any, maskRef: any) => void;
}

const MaskedInput = IMaskMixin<
  HTMLInputElement, // Element type
  MaskedInputProps // Props type
>(({ inputRef, ...props }) => <input ref={inputRef} {...props} />);


// --- Main Input Component ---

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, // Omit HTML size
    VariantProps<typeof inputVariants> {
  as?: 'input' | 'textarea';
  mask?: any; // react-imask mask options
  unmask?: boolean | 'typed'; // react-imask prop
  // Add other IMask specific props if needed (onAccept, onComplete, etc.)
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  label?: string;
  error?: string | boolean;
  helpText?: string;
  charCount?: boolean | number; // boolean enables, number sets max length
  debounceTimeout?: number;
  onDebouncedChange?: (value: string) => void;
  // Consider adding specific Textarea props if needed, like rows
  rows?: number;
}

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      className,
      type = 'text',
      variant,
      size,
      as = 'input',
      mask,
      unmask,
      prefix,
      suffix,
      label,
      error,
      helpText,
      charCount,
      debounceTimeout,
      onDebouncedChange,
      onChange,
      value,
      maxLength: htmlMaxLength, // Capture HTML maxLength
      rows, // Capture rows for textarea
      ...props
    },
    ref
  ) => {
    const Comp = as === 'textarea' ? 'textarea' : mask ? MaskedInput : 'input';
    const isError = !!error;
    const [internalValue, setInternalValue] = React.useState(value ?? props.defaultValue ?? '');
    const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

    // Determine maxLength for character count
    const maxLength = typeof charCount === 'number' ? charCount : htmlMaxLength;

    // Handle controlled vs uncontrolled and debouncing
    React.useEffect(() => {
      // Update internal state if controlled value changes
      if (value !== undefined && value !== internalValue) {
        setInternalValue(value);
      }
    }, [value]); // Only run when controlled `value` prop changes

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any /* IMask event */) => {
        const newValue = mask ? e : e.target.value; // IMask passes value directly

        // Update internal state immediately for responsiveness
        if (value === undefined) { // Only update internal if uncontrolled
            setInternalValue(newValue);
        }

        // Call standard onChange if provided
        if (onChange) {
            if (mask) {
                // For IMask, we might need to pass the mask event/value directly
                // or reconstruct a synthetic event if needed by consumers.
                // Passing the raw value is often sufficient.
                 onChange(newValue); // Adjust based on how IMask onAccept/onChange works
            } else {
                onChange(e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
            }
        }

        // Handle debouncing
        if (onDebouncedChange && debounceTimeout) {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
            debounceTimerRef.current = setTimeout(() => {
                onDebouncedChange(newValue);
            }, debounceTimeout);
        } else if (onDebouncedChange) {
            // If debounceTimeout is 0 or not provided, call immediately
            onDebouncedChange(newValue);
        }
    };

    // Cleanup debounce timer on unmount
    React.useEffect(() => {
      return () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
      };
    }, []);


    const inputElement = (
      <Comp
        type={as === 'textarea' ? undefined : type} // type not applicable to textarea
        className={cn(
          inputVariants({ variant: isError ? 'error' : variant, size }), // Apply CVA variants
          { 'resize-none': as === 'textarea' }, // Basic textarea styling
          className // Allow overriding classes
        )}
        ref={ref as any} // Cast needed due to conditional component type and forwardRef complexity
        value={internalValue} // Use internal state for value
        onChange={handleChange}
        maxLength={maxLength} // Apply maxLength if defined
        rows={as === 'textarea' ? rows : undefined} // Apply rows only for textarea
        // Pass mask-related props only if Comp is MaskedInput
        {...(mask && Comp === MaskedInput ? { mask, unmask } : {})}
        {...props} // Pass remaining props
      />
    );

    // Basic structure for label, help text, error, prefix/suffix, char count
    // This could be further componentized later (e.g., FormItem, FormLabel, etc.)
    return (
      <div className="flex flex-col space-y-1">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {prefix && <span className="absolute left-3 text-muted-foreground">{prefix}</span>}
          {inputElement}
          {suffix && <span className="absolute right-3 text-muted-foreground">{suffix}</span>}
        </div>
        {/* Consider positioning char count relative to input */}
        {charCount && (
          <div className="text-right text-sm text-muted-foreground">
            {String(internalValue).length}
            {maxLength !== undefined ? ` / ${maxLength}` : ''}
          </div>
        )}
        {error && typeof error === 'string' && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
        {helpText && !error && (
          <p className="text-sm text-muted-foreground">{helpText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants };
