import { ReactNode } from 'react'
import { FieldValues, Path, Control, UseFormReturn, RegisterOptions } from 'react-hook-form'
import { VariantProps } from 'class-variance-authority'
import { z } from 'zod'

// ===================================================================
// BASE COMPONENT TYPES
// ===================================================================

export interface BaseProps {
  className?: string
  'data-cy'?: string
}

// Base props for all form components
export interface FormComponentBaseProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>
  label: string
  required?: boolean
  disabled?: boolean
  className?: string
  'data-cy'?: string
}

// Common validation types
export interface ValidationRules<T = unknown> {
  required?: boolean | string
  min?: number | string
  max?: number | string
  minLength?: number | string
  maxLength?: number | string
  pattern?: RegExp | string
  validate?: (value: T) => boolean | string | Promise<boolean | string>
}

// ===================================================================
// FOUNDATION COMPONENT TYPES
// ===================================================================

// Alert Component
export type AlertVariant = 'info' | 'warning' | 'success' | 'error'

export interface AlertProps {
  title?: string
  children: ReactNode
  variant?: AlertVariant
  className?: string
  'data-cy'?: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  onClose?: () => void
}

// Button Component
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  href?: string
  loading?: boolean
  loadingText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  icon?: ReactNode
  iconOnly?: boolean
  tooltip?: string
  badge?: string | number
  state?: 'default' | 'error' | 'success' | 'warning' | 'info'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'success' | 'warning' | 'error' | 'info' | 'gradient' | 'soft' | 'destructive' | 'default'
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl' | 'icon' | 'icon-sm' | 'icon-lg'
  fullWidth?: boolean
  active?: boolean
  /** @deprecated Use `href` instead */
  url?: string
  /** @deprecated Use data-testid attribute instead */
  'data-cy'?: string
}

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ButtonProps['size']
  variant?: ButtonProps['variant']
  orientation?: 'horizontal' | 'vertical'
  attached?: boolean
  fullWidth?: boolean
}

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'leftIcon' | 'rightIcon'> {
  icon: ReactNode
  'aria-label': string
}

// AutoComplete Component
export interface AutoCompleteOption {
  value: string
  label: string
  disabled?: boolean
}

export interface AutoCompleteProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>
  options: AutoCompleteOption[]
  label?: string
  className?: string
  placeholder?: string
  loadOptions?: (query: string) => Promise<AutoCompleteOption[]>
  validation?: RegisterOptions<T>
  'data-cy'?: string
}

export interface AutoCompleteBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  options: Array<{ value: string; label: string }>
  placeholder?: string
  loadOptions?: (inputValue: string) => Promise<Array<{ value: string; label: string }>>
  debounceMs?: number
}

// Checkbox Component
export interface CheckboxBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  checked?: boolean
  indeterminate?: boolean
}

// DatePicker Component
export interface DatePickerBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  minDate?: Date
  maxDate?: Date
  placeholder?: string
  showTime?: boolean
  mode?: 'single' | 'range'
}

// FileUpload Component
export interface FileWithPreview extends File {
  preview?: string
  progress?: number
  error?: string
}

export interface FileUploadProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: string
  className?: string
  accept?: string
  multiple?: boolean
  maxSize?: number // in bytes
  maxFiles?: number
  preview?: boolean
  validation?: RegisterOptions<TFieldValues>
  onUpload?: (files: File[]) => Promise<void>
  disabled?: boolean
  required?: boolean
  'data-cy'?: string
}

export interface FileUploadBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  accept?: string
  multiple?: boolean
  maxSize?: number
  maxFiles?: number
  preview?: boolean
  onUpload?: (files: File[]) => Promise<void>
}

// Input Component
export interface InputBaseProps<TFieldValues extends FieldValues = FieldValues> 
  extends FormComponentBaseProps<TFieldValues> {
  type?: 'text' | 'email' | 'password' | 'tel' | 'number'
  placeholder?: string
  autoComplete?: string
}

// NumberInput Component
export interface NumberInputBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  min?: number
  max?: number
  step?: number
  precision?: number
  allowNegative?: boolean
  thousandSeparator?: string
  decimalSeparator?: string
}

// Radio Component
export interface RadioBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  value: string | number
  checked?: boolean
}

// RadioGroup Component
export interface RadioGroupBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  options: Array<{ value: string | number; label: string; description?: string; disabled?: boolean }>
  direction?: 'horizontal' | 'vertical'
}

// SearchBar Component
export interface SearchBarBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  placeholder?: string
  onSearch?: (value: string) => void
  debounceMs?: number
}

// Select Component
export interface SelectBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  options: Array<{ value: string; label: string }>
  placeholder?: string
}

// StatusLabel Component
export interface StatusLabelProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  status: 'pending' | 'processed' | 'denied' | 'approved' | 'partial-approval'
  text: string
}

// TagInput Component
export interface Tag {
  id: string
  label: string
}

export interface TagInputProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  className?: string
  placeholder?: string
  suggestions?: Tag[]
  maxTags?: number
  validation?: Record<string, any>
  'data-cy'?: string
}

export interface TagInputBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  placeholder?: string
  maxTags?: number
  suggestions?: string[]
  validate?: (tag: string) => boolean | string
}

// TextArea Component
export interface TextAreaBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  placeholder?: string
  rows?: number
  maxLength?: number
  resize?: boolean
}

// Toggle Component
export interface ToggleBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  checked?: boolean
  size?: 'sm' | 'md' | 'lg'
}

// ===================================================================
// COMPOSITE COMPONENT TYPES
// ===================================================================

// Accordion Component
export interface AccordionProps {
  title: ReactNode
  children: ReactNode
  isOpen: boolean
  onToggle: () => void
  className?: string
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
  variant?: 'default' | 'compact' | 'wide'
  columns?: 1 | 2 | 3 | 4 | 'auto'
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
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

// Modal Component Types (from @radix-ui/react-dialog)
export interface ModalProps extends React.ComponentPropsWithoutRef<typeof import('@radix-ui/react-dialog').Root> {}
export interface ModalTriggerProps extends React.ComponentPropsWithoutRef<typeof import('@radix-ui/react-dialog').Trigger> {}
export interface ModalContentProps extends React.ComponentPropsWithoutRef<typeof import('@radix-ui/react-dialog').Content> {}
export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ModalTitleProps extends React.ComponentPropsWithoutRef<typeof import('@radix-ui/react-dialog').Title> {}
export interface ModalDescriptionProps extends React.ComponentPropsWithoutRef<typeof import('@radix-ui/react-dialog').Description> {}

// Pagination Component
export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  maxVisiblePages?: number
}

// ===================================================================
// MEMBER PORTAL COMPONENT TYPES
// ===================================================================

// Add member portal component types here as needed when they are moved
// Example:
// export interface MemberDashboardProps {
//   userId: string
//   // ... other props
// }

// ===================================================================
// UTILITY TYPES
// ===================================================================

// Generic component prop extraction utility
export type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never

// Form field value extraction utility
export type FieldValue<T> = T extends FormComponentBaseProps<infer V> ? V : never

// Export commonly used external types for convenience
export type { FieldValues, Path, Control, UseFormReturn, RegisterOptions } from 'react-hook-form'
export type { VariantProps } from 'class-variance-authority'
export type { ReactNode } from 'react'