import React from 'react';
import { cn } from '../../../utils/cn';

export interface FormFieldProps {
  children: React.ReactNode;
  label?: string;
  description?: string;
  required?: boolean;
  error?: string;
  className?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  'data-cy'?: string;
}

export function FormField({
  children,
  label,
  description,
  required,
  error,
  className,
  labelClassName,
  descriptionClassName,
  errorClassName,
  'data-cy': dataCy,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)} data-cy={dataCy}>
      {label && (
        <div className={cn(
          'text-sm font-medium',
          required && 'after:content-["*"] after:ml-0.5 after:text-red-500',
          labelClassName
        )}>
          <label>{label}</label>
        </div>
      )}
      {children}
      {description && !error && (
        <p className={cn('text-sm text-gray-500', descriptionClassName)}>{description}</p>
      )}
      {error && (
        <p className={cn('text-sm text-red-500', errorClassName)}>{error}</p>
      )}
    </div>
  );
}
