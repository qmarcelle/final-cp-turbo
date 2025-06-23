import React from 'react'
import { FormLayout } from '../FormLayout/FormLayout'
import { FormField } from '../FormField/FormField'
import type { FormInlineGroupProps } from '../types'

export function FormInlineGroup({
  children,
  label,
  description,
  required,
  error,
  className,
  'data-cy': dataCy,
}: FormInlineGroupProps) {
  return (
    <FormField
      label={label}
      description={description}
      required={required}
      error={error}
      className={className}
      data-cy={dataCy}
    >
      <FormLayout variant="inline" columns={2} gap={4}>
        {children}
      </FormLayout>
    </FormField>
  )
}

// Example usage:
// <FormInlineGroup
//   label="Name"
//   required
//   data-cy="name-group"
// >
//   <Input name="firstName" placeholder="First name" />
//   <Input name="lastName" placeholder="Last name" />
// </FormInlineGroup> 