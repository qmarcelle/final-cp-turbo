import React from 'react'
import { FormLayout  } from '../../composite/FormLayout/FormLayout'
import type { FormColumnProps } from '../../../types'

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