import { 
  FieldValues, 
  RegisterOptions, 
  FieldPath 
} from 'react-hook-form';

/**
 * Base type for form field values. Extends React Hook Form's FieldValues.
 */
export type FormFieldValues = FieldValues;

/**
 * Common properties for form field components.
 */
export interface FormFieldProps<T extends FormFieldValues = FieldValues> {
  /**
   * The name of the form field
   */
  name: FieldPath<T>;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Validation rules for the field
   */
  validation?: RegisterOptions;
  
  /**
   * Whether the field is required
   */
  required?: boolean;
  
  /**
   * Label text for the field
   */
  label?: string;
  
  /**
   * Help text or description for the field
   */
  description?: string;
  
  /**
   * Placeholder text for the field
   */
  placeholder?: string;
  
  /**
   * Whether the field is disabled
   */
  disabled?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Data attribute for testing
   */
  'data-cy'?: string;
}

/**
 * Common properties for controlled form field components.
 */
export interface ControlledFormFieldProps<T extends FormFieldValues = FieldValues> extends FormFieldProps<T> {
  /**
   * The form control instance from React Hook Form
   */
  control: any; // Using any here to avoid importing Control from react-hook-form
  
  /**
   * The form field name as a string
   */
  name: FieldPath<T>;
}

/**
 * Validation rule for minimum string length
 */
export interface MinLengthValidation {
  value: number;
  message: string;
}

/**
 * Validation rule for maximum string length
 */
export interface MaxLengthValidation {
  value: number;
  message: string;
}

/**
 * Validation rule for minimum numeric value
 */
export interface MinValidation {
  value: number;
  message: string;
}

/**
 * Validation rule for maximum numeric value
 */
export interface MaxValidation {
  value: number;
  message: string;
}

/**
 * Validation rule for pattern matching
 */
export interface PatternValidation {
  value: RegExp;
  message: string;
}

/**
 * Common validation rules for form fields
 */
export interface ValidationRules {
  required?: string | boolean;
  minLength?: MinLengthValidation;
  maxLength?: MaxLengthValidation;
  min?: MinValidation;
  max?: MaxValidation;
  pattern?: PatternValidation;
  validate?: Record<string, (value: any) => boolean | string>;
} 