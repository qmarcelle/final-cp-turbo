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
export * from './components/foundation/button';
export * from './components/foundation/input';

// Composite Components (Layout)
export * from './components/composite/form-layout';
export * from './components/composite/form-grid';
export * from './components/composite/form-column';

// Export Types
export type { ButtonProps } from './components/foundation/button';
export type { InputProps } from './components/foundation/input';
export type { FormLayoutProps, FormLayoutVariant, FormLayoutColumns, FormLayoutGap } from './components/composite/form-layout';
export type { FormGridProps } from './components/composite/form-grid';
export type { FormColumnProps } from './components/composite/types';

// Utilities
export * from './utils';

// Future exports will go here as we build more components
// export * from './components/Card';
// export * from './components/Table';
// etc.
