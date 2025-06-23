import * as React from 'react'
import { cn } from '../../../utils/cn'

export interface FormFieldProps {
  /** The form input component */
  children: React.ReactNode
  /** Label text */
  label?: string
  /** Whether the field is required */
  required?: boolean
  /** Error message */
  error?: string
  /** Hint text */
  hint?: string
  /** Additional class names */
  className?: string
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ children, label, required, error, hint, className }, ref) => {
    return (
      <div ref={ref} className={cn('form-field space-y-2', className)}>
        {label && (
          <label className={cn(
            'block text-sm font-medium text-gray-700',
            required && 'after:ml-0.5 after:text-red-500 after:content-["*"]',
            error && 'text-red-500'
          )}>
            {label}
          </label>
        )}
        {children}
        {error && (
          <p className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-sm text-gray-500">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

FormField.displayName = 'FormField' 