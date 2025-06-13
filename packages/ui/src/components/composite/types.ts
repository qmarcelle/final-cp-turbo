import { ReactNode } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import type { FormLayoutVariant, FormLayoutColumns, FormLayoutGap } from './FormLayout/FormLayout'

// Base Props
interface BaseProps {
  className?: string
  'data-cy'?: string
}

// Form Context Types
export interface FormContextProps<T extends FieldValues = FieldValues> extends UseFormReturn<T> {
  isSubmitting?: boolean
  isValid?: boolean
}

// Form Section Types
export interface FormSectionProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
  'data-cy'?: string
}

// Form Grid Types
export interface FormGridProps {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4
  className?: string
  'data-cy'?: string
}

// Form Group Types
export interface FormGroupProps {
  children: ReactNode
  label?: string
  required?: boolean
  error?: string
  className?: string
  'data-cy'?: string
}

// Form Actions Types
export interface FormActionsProps {
  submitLabel: string
  cancelLabel?: string
  isSubmitting?: boolean
  onCancel?: () => void
  className?: string
  'data-cy'?: string
}

// Form Button Types
export interface FormButtonProps {
  children: ReactNode
  type?: 'submit' | 'button' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
  'data-cy'?: string
}

// Form Stepper Types
export interface FormStep<T extends FieldValues = FieldValues> {
  id: string
  title: string
  description?: string
  component: ReactNode
  schema: z.ZodType<T>
}

export interface FormStepperProps<T extends FieldValues = FieldValues> {
  steps: FormStep<T>[]
  currentStep: number
  onStepChange?: (step: number) => void
  className?: string
  'data-cy'?: string
}

// Form Layout Props
export interface FormLayoutProps extends BaseProps {
  children: ReactNode
  variant?: FormLayoutVariant
  columns?: FormLayoutColumns
  gap?: FormLayoutGap
}

// Form Field Props
export interface FormFieldProps extends BaseProps {
  children: ReactNode
  label?: string
  description?: string
  required?: boolean
  error?: string
  labelClassName?: string
  descriptionClassName?: string
  errorClassName?: string
}

// Form Inline Group Props
export interface FormInlineGroupProps extends Omit<FormFieldProps, 'labelClassName' | 'descriptionClassName' | 'errorClassName'> {
  children: ReactNode
}

// Form Column Props
export interface FormColumnProps extends BaseProps {
  children: ReactNode
} 