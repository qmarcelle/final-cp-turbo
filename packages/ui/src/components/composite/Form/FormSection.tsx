import React from 'react'
import { cn } from '../../../utils/cn'
import { FormLayout  } from '../../composite/FormLayout/FormLayout'
import type { FormSectionProps  } from '../types'

export function FormSection({
  title,
  description,
  children,
  className,
  'data-cy': dataCy,
}: FormSectionProps) {
  return (
    <div
      className={cn('form-section', className)}
      data-cy={dataCy}
    >
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      <FormLayout variant="grid" columns={1} gap={4}>
        {children}
      </FormLayout>
    </div>
  )
} 