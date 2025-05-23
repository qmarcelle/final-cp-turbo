import React from 'react'
import { Button, ButtonProps  } from '../../foundation/Button/Button'

export interface FormButtonProps extends ButtonProps {}

export const FormButton: React.FC<FormButtonProps> = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>
}

FormButton.displayName = 'FormButton' 