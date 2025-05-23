import * as React from 'react';
import { cn } from '../../../utils/cn'

export interface FormSectionProps {
  children: React.ReactNode
  title: string
  description?: string
  className?: string
  'data-cy'?: string
  isCollapsible?: boolean
  isOptional?: boolean
  defaultExpanded?: boolean
}

export function FormSection({
  children,
  title,
  description,
  className,
  'data-cy': dataCy,
  isCollapsible = false,
  isOptional = false,
  defaultExpanded = true,
}: FormSectionProps) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded)

  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white p-6 shadow-sm',
        'transition-all duration-200 ease-in-out',
        'dark:border-gray-700 dark:bg-gray-800',
        className
      )}
      data-cy={dataCy}
    >
      <div className={cn(
        'flex items-start justify-between',
        'mb-6 border-b border-gray-100 pb-4 dark:border-gray-700'
      )}>
        <div>
          <div className="flex items-center gap-2">
            <h3
              className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
              data-cy={`${dataCy}-title`}
            >
              {title}
            </h3>
            {isOptional && (
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                Optional
              </span>
            )}
          </div>
          {description && (
            <p
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
              data-cy={`${dataCy}-description`}
            >
              {description}
            </p>
          )}
        </div>
        {isCollapsible && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-md p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-500 dark:hover:bg-gray-700"
            aria-expanded={isExpanded}
          >
            <span className="sr-only">
              {isExpanded ? 'Collapse section' : 'Expand section'}
            </span>
            <svg
              className={cn(
                'h-5 w-5 transform transition-transform',
                isExpanded ? 'rotate-180' : ''
              )}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}
      </div>
      <div
        className={cn(
          'space-y-6 transition-all duration-200 ease-in-out',
          isCollapsible && !isExpanded && 'hidden'
        )}
      >
        {children}
      </div>
    </div>
  )
}

// Example usage:
// <FormSection
//   title="Personal Information"
//   description="Please provide your personal details."
//   data-cy="personal-info"
// >
//   <FormGroup label="Name" required>
//     <Input placeholder="Enter your name" />
//   </FormGroup>
//   <FormGroup label="Email" required>
//     <Input type="email" placeholder="Enter your email" />
//   </FormGroup>
// </FormSection> 