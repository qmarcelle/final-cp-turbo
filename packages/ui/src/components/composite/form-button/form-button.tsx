import React from 'react'
import { Button, ButtonProps } from '../../foundation/button'

export interface FormButtonProps extends ButtonProps {}

export const FormButton = ({ children, ...props }: FormButtonProps) => {
  return <Button {...props}>{children}</Button>
}

FormButton.displayName = 'FormButton' 