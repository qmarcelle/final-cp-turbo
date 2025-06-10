/**
 * @portals/ui
 *
 * The main UI component library for BCBST consumer portals.
 * Exports all foundation and composite components, utilities, types, and design tokens.
 */

// Import global styles
// import './styles/globals.css' // Temporarily disabled for build issues

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
export * from './components/foundation/Avatar'
export * from './components/foundation/Badge'
export * from './components/foundation/Button'
// TODO: Fix Calendar component IconLeft/IconRight issues
// export * from './components/foundation/Calendar'
export * from './components/foundation/Checkbox'
export * from './components/foundation/DatePicker'
export * from './components/foundation/FileUpload'
export * from './components/foundation/Input/Input'
export * from './components/foundation/InputGroup'
export * from './components/foundation/NumberInput'
export * from './components/foundation/Progress'
export * from './components/foundation/Radio'
// Note: RadioGroup components are also exported from Radio/Radio.tsx to avoid conflicts
export * from './components/foundation/SearchBar'
export * from './components/foundation/Select'
export * from './components/foundation/Separator'
export * from './components/foundation/StatusLabel'
// TODO: Fix Tag component export issues
// export * from './components/foundation/Tag'
export * from './components/foundation/TagInput'
export * from './components/foundation/TextArea'
export * from './components/foundation/Toggle'
export * from './components/foundation/Tooltip'

// Composite Components
export * from './components/composite/Accordion'
export * from './components/composite/Card'
export * from './components/composite/FormActions'
export * from './components/composite/FormButton'
export * from './components/composite/FormColumn'
export * from './components/composite/FormContext'
export * from './components/composite/FormField'
export * from './components/composite/FormGrid'
export * from './components/composite/FormGroup'
export * from './components/composite/FormInlineGroup'
export * from './components/composite/FormLayout'
export * from './components/composite/FormSection'
export * from './components/composite/FormStepper'
export * from './components/composite/Modal'
export * from './components/composite/Pagination'
export * from './components/composite/Tabs'

// Navigation & Breadcrumb Components
export * from './components/composite/Navigation'

// Export Types - these are properly defined in types/components.d.ts
export type { AlertProps, AlertVariant } from './types'
export type { ButtonProps, ButtonGroupProps, IconButtonProps } from './types'
export type { CheckboxProps } from './types'
export type { AutoCompleteProps } from './types'
export type { DatePickerProps } from './types'
export type { FileUploadProps } from './types'
export type { InputProps } from './types'
export type { NumberInputBaseProps as NumberInputProps } from './types'
export type {
  RadioProps,
  RadioGroupProps,
} from './types'
export type { SearchBarBaseProps as SearchBarProps } from './types'
export type { SelectProps } from './types'
export type { StatusLabelProps } from './types'
export type { Tag, TagInputProps } from './types'
export type { TextAreaProps } from './types'
export type { ToggleProps } from './types'
export type { PaginationProps } from './types'
export type { FormLayoutProps } from './types'
export type { FormGridProps } from './types'
export type { FormColumnProps } from './types'

// Utilities
export * from './utils'

// Export all centralized types
// Commented out to avoid conflicts with individual exports above
// export type * from './types'
