'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../lib/utils'
import type { InputProps } from '../../../types'

export const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-tertiary-gray3 bg-white hover:border-primary focus-visible:border-primary focus-visible:shadow-focus-blue',
        error:
          'border-status-error bg-white text-status-error focus-visible:border-status-error focus-visible:shadow-[0px_0px_0px_3px_rgba(235,0,27,0.4)]',
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        default: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export type InputVariantProps = VariantProps<typeof inputVariants>

/**
 * Input component for form text input with validation states.
 * Supports text, email, password, tel, number, and other HTML input types.
 *
 * Features:
 * - Responsive design with multiple sizes (sm, default, lg)
 * - Error states with validation messages
 * - Accessibility support with proper ARIA attributes
 * - Label and hint text support
 * - Required field indicators
 * - Focus management and keyboard navigation
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email Address"
 *   type="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   placeholder="Enter your email"
 *   error={hasError}
 *   errorMessage="Please enter a valid email address"
 *   required
 * />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      type = 'text',
      error,
      errorMessage,
      label,
      hint,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId()
    const errorId = React.useId()
    const hintId = React.useId()

    const hasError = error || !!errorMessage

    return (
      <div className="form-control w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'form-label block text-sm font-medium text-tertiary-gray1 mb-1',
              required && 'required'
            )}
          >
            {label}
          </label>
        )}

        <input
          id={inputId}
          type={type}
          className={cn(
            inputVariants({ variant: hasError ? 'error' : variant, size }),
            hasError && 'error',
            className
          )}
          ref={ref}
          aria-invalid={!!hasError}
          aria-describedby={cn(
            hasError && errorMessage ? errorId : undefined,
            hint ? hintId : undefined
          )}
          aria-required={required}
          {...props}
        />

        {hint && !hasError && (
          <p id={hintId} className="form-hint mt-1 text-sm text-tertiary-gray3">
            {hint}
          </p>
        )}

        {hasError && errorMessage && (
          <p
            id={errorId}
            className="form-error mt-1 text-sm text-status-error"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// For backward compatibility, export as TextField as well
export const TextField = Input
export type { InputProps as TextFieldProps } from '../../../types'
