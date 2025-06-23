import * as React from 'react';
import { cn } from '../../../utils/cn'

export interface FormActionsProps {
  align?: 'left' | 'center' | 'right' | 'between'
  children: React.ReactNode
  className?: string
  'data-cy'?: string
}

export function FormActions({
  align = 'right',
  children,
  className,
  'data-cy': dataCy,
}: FormActionsProps) {
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  }[align]

  return (
    <div
      className={cn(
        'flex gap-4',
        alignmentClasses,
        className
      )}
      data-cy={dataCy}
    >
      {children}
    </div>
  )
}