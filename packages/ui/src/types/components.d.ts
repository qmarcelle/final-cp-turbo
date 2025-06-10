import { ReactNode } from 'react'
import { FieldValues, Path, Control, UseFormReturn, RegisterOptions } from 'react-hook-form'
import { z } from 'zod'
import { type VariantProps } from 'class-variance-authority'
import { badgeVariants } from '../components/foundation/Badge'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import type { DatePickerProps as ReactDatePickerProps } from 'react-datepicker'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { progressVariants } from '../components/foundation/Progress'

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
export type AlertVariant = 'info' | 'warning' | 'success' | 'error' | 'dark'

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
export interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    'onChange'
  > {
  label: string
  hint?: string
  required?: boolean
  indeterminate?: boolean
  onChange?: (checked: boolean | 'indeterminate') => void
}

// DatePicker Component
export type DateFormat =
  | 'MM/dd/yyyy'
  | 'MM/dd/yyyy h:mm aa'
  | 'MM/dd/yyyy HH:mm'
  | 'yyyy-MM-dd'
  | 'yyyy-MM-dd HH:mm'
  | string

export interface DateRange {
  startDate: Date | null
  endDate: Date | null
}

export interface DatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  className?: string
  minDate?: Date
  maxDate?: Date
  excludeDates?: Date[]
  includeDates?: Date[]
  filterDate?: (date: Date) => boolean
  showTime?: boolean
  timeIntervals?: number
  timeFormat?: '12h' | '24h'
  mode?: 'single' | 'range'
  dateFormat?: DateFormat
  showMonthYearPicker?: boolean
  showYearPicker?: boolean
  showQuarterPicker?: boolean
  showWeekNumbers?: boolean
  isClearable?: boolean
  validation?: RegisterOptions<TFieldValues>
  locale?: string
  customInput?: React.ReactElement
  popperPlacement?: ReactDatePickerProps['popperPlacement']
  portalId?: string
  'data-cy'?: string
  hint?: string
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
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: boolean | string
  errorMessage?: string
  label?: string
  hint?: string
  required?: boolean
  variant?: 'default' | 'error'
  size?: 'sm' | 'default' | 'lg'
}

export type TextFieldProps = InputProps

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
export interface RadioOption {
  value: string | number
  label: string
  description?: string
  disabled?: boolean
}

export interface RadioProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  value: string | number
  required?: boolean
  disabled?: boolean
  className?: string
  validation?: RegisterOptions<T>
  'data-cy'?: string
  hint?: string
}

export interface RadioGroupProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  options: RadioOption[]
  required?: boolean
  disabled?: boolean
  direction?: 'horizontal' | 'vertical'
  className?: string
  validation?: RegisterOptions<T>
  'data-cy'?: string
  hint?: string
}

// SearchBar Component
export interface SearchBarBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  placeholder?: string
  onSearch?: (value: string) => void
  debounceMs?: number
}

// Select Component
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  hint?: string;
  required?: boolean;
  variant?: 'default' | 'error'
  size?: 'sm' | 'default' | 'lg'
}

export type DropdownProps = SelectProps;

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
export interface TextAreaProps extends Omit<FormFieldProps, 'control' | 'children'> {
  name?: string
  label?: string
  description?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  rows?: number
  maxLength?: number
  resize?: boolean
  className?: string
  'data-cy'?: string
  onBlur?: () => void
  onChange?: (value: string) => void
  value?: string
  error?: string
}

export interface ControlledTextAreaProps<T extends FieldValues = FieldValues>
  extends Omit<TextAreaProps, 'validation'> {
  control: Control<T>
  name: Path<T>
  validation?: any
}

// Toggle Component
export interface ToggleBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  checked?: boolean
  size?: 'sm' | 'md' | 'lg'
}

// Toggle Component
export interface ToggleProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  validation?: RegisterOptions<T, Path<T>>;
  'data-cy'?: string;
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
  children?: ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  onCancel?: () => void;
  className?: string;
  'data-cy'?: string;
}

// Form Button Types
export interface FormButtonProps extends ButtonProps {
  'data-cy'?: string;
}

// FormStepper Component
export interface Step<T extends FieldValues> {
  id: string;
  title: string;
  description?: string;
  shortLabel?: string;
  component: (props: { control: Control<T> }) => React.ReactNode;
  schema: z.ZodType<T>;
  isOptional?: boolean;
}

export interface FormStepperProps<T extends FieldValues> {
  steps: Step<T>[];
  currentStep?: number;
  onStepChange?: (step: number) => void;
  onComplete?: (data: T) => void | Promise<void>;
  className?: string;
  'data-cy'?: string;
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

// Progress Component
export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  value?: number
  max?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'success' | 'warning' | 'error'
  showPercentage?: boolean
  animated?: boolean
  label?: string
  indeterminate?: boolean
}

export interface CircularProgressProps extends Omit<ProgressProps, 'size'> {
  size?: number
  strokeWidth?: number
}

export interface StepProgressProps {
  currentStep: number
  totalSteps: number
  steps?: string[]
  showNumbers?: boolean
  size?: 'sm' | 'md' | 'lg'
  orientation?: 'horizontal' | 'vertical'
  className?: string
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
export type { ReactNode } from 'react'

// Badge Component
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  variant?:
    | 'default'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'outline'
    | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  interactive?: boolean
  onClick?: () => void
  icon?: React.ReactNode
  dot?: boolean
}

export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: 'success' | 'warning' | 'error' | 'info' | 'neutral'
}

export interface CountBadgeProps extends Omit<BadgeProps, 'children'> {
  count: number
  max?: number
  showZero?: boolean
}

// Avatar Component
export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  className?: string
}

export interface AvatarImageProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {
  className?: string
  alt: string
}

export interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  className?: string
  name?: string
}

export const avatarSizes: Record<string, string> = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-xs', 
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
  '2xl': 'h-20 w-20 text-xl'
}

export interface AvatarWithSizeProps extends AvatarProps {
  size?: keyof typeof avatarSizes
}

// Separator Component
export interface SeparatorProps {
  // ... existing code ...
}