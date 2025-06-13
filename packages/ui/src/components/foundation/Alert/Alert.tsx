import React from 'react'
import { cn } from '../../../utils/cn'
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'

export type AlertVariant = 'info' | 'warning' | 'success' | 'error'

export interface AlertProps {
  title?: string
  children: React.ReactNode
  variant?: AlertVariant
  className?: string
  'data-cy'?: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  onClose?: () => void
}

const variantStyles: Record<AlertVariant, { bg: string; text: string; border: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }> = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-800 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
    icon: InformationCircleIcon,
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    text: 'text-yellow-800 dark:text-yellow-300',
    border: 'border-yellow-200 dark:border-yellow-800',
    icon: ExclamationTriangleIcon,
  },
  success: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-800 dark:text-green-300',
    border: 'border-green-200 dark:border-green-800',
    icon: CheckCircleIcon,
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-800 dark:text-red-300',
    border: 'border-red-200 dark:border-red-800',
    icon: XCircleIcon,
  },
}

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
        'rounded-lg border p-4',
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
        <div className="ml-3">
          {title && (
            <h3 className={cn('text-sm font-medium', styles.text)}>
              {title}
            </h3>
          )}
          <div className={cn('text-sm', styles.text)}>
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
                  'inline-flex rounded-md p-1.5',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2',
                  styles.text,
                  'hover:bg-opacity-20'
                )}
              >
                <span className="sr-only">Dismiss</span>
                <XCircleIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 