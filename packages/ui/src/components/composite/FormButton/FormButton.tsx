import React from 'react'
import { Button } from '../../foundation/Button/Button'
import type { FormButtonProps } from '../../../types'

export const FormButton: React.FC<FormButtonProps> = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>
}

FormButton.displayName = 'FormButton' 