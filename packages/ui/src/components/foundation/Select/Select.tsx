"use client";

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const selectVariants = cva(
  "form-input w-full rounded-md border px-3 py-2 text-sm transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-white appearance-none",
  {
    variants: {
      variant: {
        default: "border-tertiary-gray3 hover:border-primary focus-visible:border-primary focus-visible:shadow-focus-blue",
        error: "border-status-error focus-visible:border-status-error focus-visible:shadow-[0px_0px_0px_3px_rgba(235,0,27,0.4)]",
      },
      size: {
        sm: "h-8 px-2 text-xs",
        default: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  hint?: string;
  required?: boolean;
}

/**
 * Select dropdown component with custom styling and comprehensive features.
 * Allows users to select from a list of predefined options.
 * 
 * Features:
 * - Responsive design with multiple sizes (sm, default, lg)
 * - Error states with validation messages
 * - Accessibility support with proper ARIA attributes
 * - Label and hint text support
 * - Required field indicators
 * - Custom option rendering
 * - Keyboard navigation support
 * 
 * @example
 * ```tsx
 * <Select 
 *   label="Country"
 *   options={[
 *     {value: 'us', label: 'United States'},
 *     {value: 'ca', label: 'Canada'},
 *     {value: 'mx', label: 'Mexico'}
 *   ]} 
 *   value={selectedCountry} 
 *   onChange={(e) => setSelectedCountry(e.target.value)} 
 *   placeholder="Select a country"
 *   required
 * />
 * ```
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className, 
    variant, 
    size, 
    options, 
    placeholder = "Select...", 
    error, 
    errorMessage, 
    label, 
    hint,
    required,
    children,
    id,
    ...props 
  }, ref) => {
    const selectId = id || React.useId();
    const errorId = React.useId();
    const hintId = React.useId();
    
    const hasError = error || !!errorMessage;
    
    return (
      <div className="form-control w-full">
        {label && (
          <label 
            htmlFor={selectId} 
            className={cn(
              "form-label block text-sm font-medium text-tertiary-gray1 mb-1",
              required && "required"
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <select
            id={selectId}
            className={cn(
              selectVariants({ variant: hasError ? "error" : variant, size }),
              hasError && "error",
              // Custom dropdown arrow
              "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:12px_8px]",
              "pr-10", // Add padding for the arrow
              className
            )}
            ref={ref}
            aria-invalid={hasError}
            aria-describedby={cn(
              hasError && errorMessage ? errorId : undefined,
              hint ? hintId : undefined
            )}
            aria-required={required}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value} 
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
            {children}
          </select>
        </div>
        
        {hint && !hasError && (
          <p id={hintId} className="form-hint mt-1 text-sm text-tertiary-gray3">
            {hint}
          </p>
        )}
        
        {hasError && errorMessage && (
          <p id={errorId} className="form-error mt-1 text-sm text-status-error" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

// For backward compatibility, export as Dropdown as well
export const Dropdown = Select;
export type DropdownProps = SelectProps;