import { type ReactNode } from 'react'
import { type Control, type FieldValues, type Path } from 'react-hook-form'
import { cn } from '@/lib/utils'

export interface BaseStepProps<T extends FieldValues> {
  control: Control<T>
  title?: string
  description?: string
  fieldPrefix?: string
  required?: boolean
  className?: string
  children?: ReactNode
  isValid?: boolean
  id?: string
}

export function getFieldName<T extends FieldValues>(prefix: string, field: string): Path<T> {
  return `${prefix}.${field}` as Path<T>
}

export function BaseStep<T extends FieldValues>({
  title,
  description,
  className,
  children,
  isValid,
  id
}: BaseStepProps<T>) {
  return (
    <div 
      className={cn(
        'space-y-6 rounded-xl border p-6 shadow-sm',
        'transition-all duration-300 ease-in-out',
        'transform hover:scale-[1.01] hover:shadow-md',
        isValid 
          ? 'border-green-200 bg-green-50/50 shadow-green-100' 
          : 'border-gray-200 bg-white hover:border-gray-300',
        className
      )}
      role="group"
      aria-labelledby={title ? `${id}-title` : undefined}
      aria-describedby={description ? `${id}-description` : undefined}
    >
      {title && (
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <h2 
              id={`${id}-title`}
              className="text-xl font-semibold text-gray-900"
            >
              {title}
            </h2>
            {isValid && (
              <span 
                className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600
                         transform transition-transform duration-300 animate-bounce"
                aria-label="Step completed"
                role="status"
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </span>
            )}
          </div>
          {description && (
            <p 
              id={`${id}-description`}
              className="mt-2 text-sm text-gray-600"
            >
              {description}
            </p>
          )}
        </div>
      )}
      <div 
        className="relative transition-opacity duration-300 ease-in-out"
        style={{ opacity: isValid ? 0.8 : 1 }}
      >
        {children}
      </div>
    </div>
  )
} 