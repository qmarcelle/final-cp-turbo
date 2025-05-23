import React from 'react'
import { FormLayout  } from '../../composite/form-layout' // Corrected path
import type { FormColumnProps  } from '../types' // Path to be updated

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

// Example usage:
// <FormColumn data-cy="personal-info">
//   <Input name="firstName" label="First Name" />
//   <Input name="lastName" label="Last Name" />
//   <Input name="email" type="email" label="Email" />
// </FormColumn> 