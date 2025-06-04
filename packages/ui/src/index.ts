/**
 * @portals/ui
 * 
 * The main UI component library for BCBST consumer portals.
 * Exports all foundation and composite components, utilities, and types.
 */

// Import global styles
import './utils/styles.css';

/**
 * Component Exports
 */

// Foundation Components
export * from './components/foundation/alert';
export * from './components/foundation/AutoComplete';
export * from './components/foundation/button';
export * from './components/foundation/checkbox';
export * from './components/foundation/DatePicker';
export * from './components/foundation/FileUpload';
export * from './components/foundation/input';
export * from './components/foundation/InputGroup';
export * from './components/foundation/NumberInput';
export * from './components/foundation/radio';
export * from './components/foundation/SearchBar';
// export * from './components/foundation/select'; // Temporarily disabled due to TypeScript errors
export * from './components/foundation/TagInput';
export * from './components/foundation/TextArea';
export * from './components/foundation/toggle';

// Composite Components (Layout)
export * from './components/composite/FormLayout';
export * from './components/composite/FormGrid';
export * from './components/composite/FormColumn';

// Export Types
export type { AlertProps, AlertVariant } from './components/foundation/alert';
export type { AutoCompleteProps } from './components/foundation/AutoComplete';
export type { ButtonProps } from './components/foundation/button';
export type { CheckboxProps } from './components/foundation/checkbox';
export type { DatePickerProps } from './components/foundation/DatePicker';
export type { FileUploadProps } from './components/foundation/FileUpload';
export type { InputProps } from './components/foundation/input';
export type { InputGroupProps } from './components/foundation/InputGroup';
export type { NumberInputProps } from './components/foundation/NumberInput';
export type { RadioGroupProps, RadioProps } from './components/foundation/radio';
export type { SearchBarProps } from './components/foundation/SearchBar';
// export type { SelectProps } from './components/foundation/select'; // Temporarily disabled
export type { Tag, TagInputProps } from './components/foundation/TagInput';
export type { TextAreaProps } from './components/foundation/TextArea';
export type { ToggleProps } from './components/foundation/toggle';
export type { FormLayoutProps, FormLayoutVariant, FormLayoutColumns, FormLayoutGap } from './components/composite/FormLayout/FormLayout';
export type { FormGridProps } from './components/composite/FormGrid/FormGrid';
export type { FormColumnProps } from './components/composite/types';

// Utilities
export * from './utils';

// Future exports will go here as we build more components
// export * from './components/Card';
// export * from './components/Table';
// etc.
