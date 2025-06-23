import React from 'react'
import { FormLayout } from '../../composite/FormLayout/FormLayout'

export interface FormColumnProps {
  children: React.ReactNode
  className?: string
  'data-cy'?: string
}

export function FormColumn({
  children,
  className,
  'data-cy': dataCy,
}: FormColumnProps) {
  return (
    <FormLayout
      variant="column"
      columns={1}
      className={className}
      data-cy={dataCy}
    >
      {children}
    </FormLayout>
  )
}