import { FieldValues, Path } from 'react-hook-form'

// Base props for all form components
export interface FormComponentBaseProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>
  label: string
  required?: boolean
  disabled?: boolean
  className?: string
  'data-cy'?: string
}

// Input specific props
export interface InputBaseProps<TFieldValues extends FieldValues = FieldValues> 
  extends FormComponentBaseProps<TFieldValues> {
  type?: 'text' | 'email' | 'password' | 'tel' | 'number'
  placeholder?: string
  autoComplete?: string
}

// Select specific props
export interface SelectBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  options: Array<{ value: string; label: string }>
  placeholder?: string
}

// DatePicker specific props
export interface DatePickerBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  minDate?: Date
  maxDate?: Date
  placeholder?: string
  showTime?: boolean
  mode?: 'single' | 'range'
}

// FileUpload specific props
export interface FileUploadBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  accept?: string
  multiple?: boolean
  maxSize?: number
  maxFiles?: number
  preview?: boolean
  onUpload?: (files: File[]) => Promise<void>
}

// TextArea specific props
export interface TextAreaBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  placeholder?: string
  rows?: number
  maxLength?: number
  resize?: boolean
}

// Checkbox specific props
export interface CheckboxBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  checked?: boolean
  indeterminate?: boolean
}

// Radio specific props
export interface RadioBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  value: string | number
  checked?: boolean
}

// RadioGroup specific props
export interface RadioGroupBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  options: Array<{ value: string | number; label: string; description?: string; disabled?: boolean }>
  direction?: 'horizontal' | 'vertical'
}

// Toggle specific props
export interface ToggleBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  checked?: boolean
  size?: 'sm' | 'md' | 'lg'
}

// AutoComplete specific props
export interface AutoCompleteBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  options: Array<{ value: string; label: string }>
  placeholder?: string
  loadOptions?: (inputValue: string) => Promise<Array<{ value: string; label: string }>>
  debounceMs?: number
}

// SearchBar specific props
export interface SearchBarBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  placeholder?: string
  onSearch?: (value: string) => void
  debounceMs?: number
}

// TagInput specific props
export interface TagInputBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends FormComponentBaseProps<TFieldValues> {
  placeholder?: string
  maxTags?: number
  suggestions?: string[]
  validate?: (tag: string) => boolean | string
}

// NumberInput specific props
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

// File types
export interface FileWithPreview extends File {
  preview?: string
  progress?: number
  error?: string
} 