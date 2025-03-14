/**
 * @cp/ui
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
export * from './components/foundation/Button';
export * from './components/foundation/Input';

// Composite Components (Layout)
export * from './components/composite/FormLayout';
export * from './components/composite/FormGrid';
export * from './components/composite/FormColumn';

// Export Types
export type { ButtonProps } from './components/foundation/Button';
export type { InputProps } from './components/foundation/Input';
export type { FormLayoutProps, FormLayoutVariant, FormLayoutColumns, FormLayoutGap } from './components/composite/FormLayout/FormLayout';
export type { FormGridProps } from './components/composite/FormGrid/FormGrid';
export type { FormColumnProps } from './components/composite/types';

// Utilities
export * from './utils';

// Future exports will go here as we build more components
// export * from './components/Card';
// export * from './components/Table';
// etc.
