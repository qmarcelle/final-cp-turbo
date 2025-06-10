import * as React from 'react';
import { cn } from '../../../utils/cn'
import type { FormActionsProps,  } from '../../../types';
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

// FormButton has been moved to its own component at FormButton/FormButton.tsx

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