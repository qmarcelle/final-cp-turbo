/**
 * @portals/ui
 *
 * The main UI component library for BCBST consumer portals.
 * Exports all foundation and composite components, utilities, types, and design tokens.
 */

// Import global styles
// import './styles/globals.css'; // Temporarily disabled for build

/**
 * Design System Exports
 */
export * from './components/design-tokens'

/**
 * Component Exports
 */

// Foundation Components
export * from './components/foundation/Alert'
export * from './components/foundation/AutoComplete'
export * from './components/foundation/Badge'
export * from './components/foundation/Button'
export * from './components/foundation/Checkbox'
export * from './components/foundation/DatePicker'
export * from './components/foundation/FileUpload'
export * from './components/foundation/Input'
export * from './components/foundation/InputGroup'
export * from './components/foundation/NumberInput'
export * from './components/foundation/Radio'
export * from './components/foundation/SearchBar'
export * from './components/foundation/Select'
export * from './components/foundation/StatusLabel'
export * from './components/foundation/TagInput'
export * from './components/foundation/TextArea'
export * from './components/foundation/Toggle'
export * from './components/foundation/Tooltip'

// Composite Components
export * from './components/composite/Card'
export * from './components/composite/FormLayout'
export * from './components/composite/FormColumn'
export * from './components/composite/Pagination'

// Navigation & Breadcrumb Components
export * from './components/composite/Navigation'

// Export Types - these are properly defined in types/components.d.ts
export type { AlertProps, AlertVariant } from './types'
export type { ButtonProps, ButtonGroupProps, IconButtonProps } from './types'
export type { CheckboxBaseProps as CheckboxProps } from './types'
export type { AutoCompleteProps } from './types'
export type { DatePickerBaseProps as DatePickerProps } from './types'
export type { FileUploadProps } from './types'
export type { InputBaseProps as InputProps } from './types'
export type { NumberInputBaseProps as NumberInputProps } from './types'
export type {
  RadioBaseProps as RadioProps,
  RadioGroupBaseProps as RadioGroupProps,
} from './types'
export type { SearchBarBaseProps as SearchBarProps } from './types'
export type { SelectBaseProps as SelectProps } from './types'
export type { StatusLabelProps } from './types'
export type { Tag, TagInputProps } from './types'
export type { TextAreaBaseProps as TextAreaProps } from './types'
export type { ToggleBaseProps as ToggleProps } from './types'
export type { PaginationProps } from './types'
export type { FormLayoutProps } from './types'
export type { FormGridProps } from './types'
export type { FormColumnProps } from './types'

// Utilities
export * from './utils'

// Export all centralized types
export type * from './types'
