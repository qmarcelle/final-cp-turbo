import * as React from 'react';
import { cn } from '../../../utils/cn'

export interface FormActionsProps {
  submitLabel?: string
  cancelLabel?: string
  isSubmitting?: boolean
  onCancel?: () => void
  className?: string
  'data-cy'?: string
}

export function FormActions({
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  isSubmitting = false,
  onCancel,
  className,
  'data-cy': dataCy,
}: FormActionsProps) {
  return (
    <div
      className={cn('flex justify-end space-x-4', className)}
      data-cy={dataCy}
    >
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className={cn(
            'rounded-lg px-4 py-2 text-sm font-medium',
            'border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50',
            'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
          data-cy={`${dataCy}-cancel`}
        >
          {cancelLabel}
        </button>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'rounded-lg px-4 py-2 text-sm font-medium',
          'bg-blue-600 text-white shadow-sm hover:bg-blue-700',
          'dark:bg-blue-500 dark:hover:bg-blue-600',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
        data-cy={`${dataCy}-submit`}
      >
        {isSubmitting ? 'Submitting...' : submitLabel}
      </button>
    </div>
  )
}

export interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  'data-cy'?: string
}

export const FormButton = React.forwardRef<HTMLButtonElement, FormButtonProps>(
  function FormButton(
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      className,
      disabled,
      'data-cy': dataCy,
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          {
            // Variants
            'bg-blue-600 text-white shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600':
              variant === 'primary',
            'border border-zinc-300 bg-white text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700':
              variant === 'secondary',
            'bg-red-600 text-white shadow-sm hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600':
              variant === 'danger',
            // Sizes
            'px-2.5 py-1.5 text-xs': size === 'sm',
            'px-4 py-2 text-sm': size === 'md',
            'px-6 py-3 text-base': size === 'lg',
          },
          className
        )}
        data-cy={dataCy}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

// Example usage:
// <FormActions align="between" data-cy="form-actions">
//   <FormButton
//     variant="secondary"
//     onClick={onCancel}
//     data-cy="cancel-button"
//   >
//     Cancel
//   </FormButton>
//   <div className="flex gap-4">
//     <FormButton
//       variant="secondary"
//       onClick={onSaveDraft}
//       data-cy="save-draft-button"
//     >
//       Save Draft
//     </FormButton>
//     <FormButton
//       variant="primary"
//       onClick={onSubmit}
//       isLoading={isSubmitting}
//       data-cy="submit-button"
//     >
//       Submit
//     </FormButton>
//   </div>
// </FormActions> 