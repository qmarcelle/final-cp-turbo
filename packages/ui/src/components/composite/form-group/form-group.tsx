import React from 'react'
import { cn } from '../../../utils/cn'

export interface FormGroupProps {
  children: React.ReactNode
  label?: string
  description?: string
  required?: boolean
  error?: string
  className?: string
  'data-cy'?: string
}

export function FormGroup({
  children,
  label,
  description,
  required,
  error,
  className,
  'data-cy': dataCy,
}: FormGroupProps) {
  return (
    <div className={cn('form-control w-full', className)} data-cy={dataCy}>
      {label && (
        <label className="label" data-cy={`${dataCy}-label`}>
          <span className={cn(
            'label-text text-sm font-medium text-gray-700 dark:text-gray-200',
            required && 'after:ml-0.5 after:text-red-500 after:content-["*"]'
          )}>
            {label}
          </span>
        </label>
      )}
      
      {description && (
        <p 
          className="mt-1 text-sm text-gray-500 dark:text-gray-400"
          data-cy={`${dataCy}-description`}
        >
          {description}
        </p>
      )}
      
      <div className="mt-2">{children}</div>
      
      {error && (
        <label 
          className="label" 
          data-cy={`${dataCy}-error`}
        >
          <span className="label-text-alt text-red-500">
            {error}
          </span>
        </label>
      )}
    </div>
  )
}

// Example usage:
// <FormGroup<LoginForm>
//   name="email"
//   label="Email"
//   description="We'll never share your email."
//   required
//   data-cy="email-group"
// >
//   <Input
//     type="email"
//     placeholder="Enter your email"
//   />
// </FormGroup> 