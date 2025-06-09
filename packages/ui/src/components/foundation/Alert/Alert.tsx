import React from 'react'
import { cn } from '../../../utils/cn'
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import type { AlertVariant, AlertProps } from '../../../types'

const variantStyles: Record<AlertVariant, { bg: string; text: string; border: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }> = {
  info: {
    bg: 'bg-secondary-blue1-accent',
    text: 'text-secondary-blue2',
    border: 'border-secondary-blue1',
    icon: InformationCircleIcon,
  },
  warning: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-800',
    border: 'border-yellow-200',
    icon: ExclamationTriangleIcon,
  },
  success: {
    bg: 'bg-label-success',
    text: 'text-status-success',
    border: 'border-status-success',
    icon: CheckCircleIcon,
  },
  error: {
    bg: 'bg-label-error',
    text: 'text-status-error',
    border: 'border-status-error',
    icon: XCircleIcon,
  },
}

/**
 * Alert component for displaying important information with different severity levels.
 * 
 * Features:
 * - Multiple variants: info, warning, success, error
 * - Optional title and custom icon support
 * - Dismissible alerts with close button
 * - Accessibility support with proper ARIA attributes
 * - Design system integration with consistent colors
 * 
 * @example
 * ```tsx
 * <Alert variant="success" title="Success!" onClose={() => setShow(false)}>
 *   Your changes have been saved successfully.
 * </Alert>
 * 
 * <Alert variant="error" title="Error">
 *   Please fix the following errors before continuing.
 * </Alert>
 * ```
 */
export function Alert({
  title,
  children,
  variant = 'info',
  className,
  'data-cy': dataCy,
  icon: CustomIcon,
  onClose,
}: AlertProps) {
  const styles = variantStyles[variant]
  const Icon = CustomIcon || styles.icon

  return (
    <div
      className={cn(
        'rounded-lg border p-4 shadow-sm',
        styles.bg,
        styles.border,
        className
      )}
      role="alert"
      data-cy={dataCy}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon
            className={cn('h-5 w-5', styles.text)}
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={cn('text-sm font-medium mb-1', styles.text)}>
              {title}
            </h3>
          )}
          <div className={cn('text-sm leading-5', styles.text)}>
            {children}
          </div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  'inline-flex rounded-md p-1.5 transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
                  styles.text,
                  'hover:bg-black hover:bg-opacity-10'
                )}
                aria-label="Dismiss alert"
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}