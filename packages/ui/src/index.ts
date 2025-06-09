/**
 * @portals/ui
 * 
 * The main UI component library for BCBST consumer portals.
 * Exports all foundation and composite components, utilities, types, and design tokens.
 */

// Import global styles
import './styles/globals.css';

/**
 * Design System Exports
 */
export * from './components/design-tokens';

/**
 * Component Exports
 */

// Foundation Components
export * from './components/foundation/Alert';
export * from './components/foundation/AutoComplete';
export * from './components/foundation/Button';
export * from './components/foundation/Checkbox';
export * from './components/foundation/DatePicker';
export * from './components/foundation/FileUpload';
export * from './components/foundation/Input';
export * from './components/foundation/InputGroup';
export * from './components/foundation/NumberInput';
export * from './components/foundation/Radio';
export * from './components/foundation/SearchBar';
export * from './components/foundation/Select';
export * from './components/foundation/StatusLabel';
export * from './components/foundation/TagInput';
export * from './components/foundation/TextArea';
export * from './components/foundation/Toggle';
export * from './components/foundation/Tooltip';

// Composite Components
export * from './components/composite/Card';
export * from './components/composite/FormLayout';
export * from './components/composite/FormGrid';
export * from './components/composite/FormColumn';
export * from './components/composite/Pagination';

// Navigation & Breadcrumb Components
export * from './components/composite/Navigation';

// Export Types
export type { AlertProps, AlertVariant } from './components/foundation/Alert';
export type { AutoCompleteProps } from './components/foundation/AutoComplete';
export type { ButtonProps } from './components/foundation/Button';
export type { CheckboxProps } from './components/foundation/Checkbox';
export type { DatePickerProps } from './components/foundation/DatePicker';
export type { FileUploadProps } from './components/foundation/FileUpload';
export type { InputProps, TextFieldProps } from './components/foundation/Input';
export type { InputGroupProps } from './components/foundation/InputGroup';
export type { NumberInputProps } from './components/foundation/NumberInput';
export type { RadioGroupProps, RadioProps } from './components/foundation/Radio';
export type { SearchBarProps } from './components/foundation/SearchBar';
export type { SelectProps, SelectOption, DropdownProps } from './components/foundation/Select';
export type { StatusLabelProps } from './components/foundation/StatusLabel';
export type { Tag, TagInputProps } from './components/foundation/TagInput';
export type { TextAreaProps } from './components/foundation/TextArea';
export type { ToggleProps } from './components/foundation/Toggle';
export type { TooltipProps } from './components/foundation/Tooltip';
export type { CardProps, CardHeaderProps, CardTitleProps, CardContentProps, CardFooterProps } from './components/composite/Card';
export type { PaginationProps } from './components/composite/Pagination';
export type { FormLayoutProps, FormLayoutVariant, FormLayoutColumns, FormLayoutGap } from './components/composite/FormLayout/FormLayout';
export type { FormGridProps } from './components/composite/FormGrid/FormGrid';
export type { FormColumnProps } from './components/composite/types';
export type { NavigationProps, NavigationItemProps, NavigationDropdownProps, BreadcrumbItemProps, AppBreadcrumbsProps, BreadcrumbConfig, BreadcrumbItemData } from './components/composite/Navigation';

// Utilities
export * from './utils';

// Export all centralized types
export type * from './types';