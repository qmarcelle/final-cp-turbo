/**
 * MERGED COMPONENT
 * Consolidates functionality from:
 * - FormActions
 * - FormButton
 * - FormSection
 * - FormGrid
 * - FormGroup
 * - FormLayout
 * - Various form-related components
 */

'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils';
import { Button } from './Button';
import { 
  FieldValues, 
  FormProvider, 
  UseFormReturn, 
  useFormContext 
} from 'react-hook-form';

// Form container variants
const formContainerVariants = cva(
  "space-y-6",
  {
    variants: {
      variant: {
        default: "",
        card: "bg-white border rounded-lg p-6 shadow-sm",
        transparent: "bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface FormProps<T extends FieldValues = FieldValues>
  extends React.FormHTMLAttributes<HTMLFormElement>,
    VariantProps<typeof formContainerVariants> {
  /** Form methods from react-hook-form */
  form?: UseFormReturn<T>;
  /** Whether the form is currently submitting */
  isSubmitting?: boolean;
  'data-cy'?: string;
}

/**
 * Root Form component that provides form context
 */
export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, variant, form, isSubmitting = false, children, 'data-cy': dataCy, ...props }, ref) => {
    return (
      <FormProvider {...form}>
        <form
          ref={ref}
          className={cn(formContainerVariants({ variant }), className)}
          data-submitting={isSubmitting ? 'true' : undefined}
          data-cy={dataCy}
          {...props}
        >
          {children}
        </form>
      </FormProvider>
    );
  }
);

Form.displayName = "Form";

// Form Section variants
const sectionVariants = cva(
  "space-y-4",
  {
    variants: {
      variant: {
        default: "",
        card: "bg-white border rounded-lg p-6 shadow-sm",
        outlined: "border rounded-lg p-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface FormSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionVariants> {
  /** Section title */
  title?: React.ReactNode;
  /** Optional description */
  description?: React.ReactNode;
  'data-cy'?: string;
}

/**
 * Form section component for grouping related form fields
 */
export const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ className, variant, title, description, children, 'data-cy': dataCy, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(sectionVariants({ variant }), className)}
        data-cy={dataCy}
        {...props}
      >
        {(title || description) && (
          <div className="mb-6">
            {title && (
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        )}
        <div className="space-y-4">{children}</div>
      </div>
    );
  }
);

FormSection.displayName = "FormSection";

// Form Grid variants
const gridVariants = cva(
  "grid gap-6",
  {
    variants: {
      columns: {
        1: "grid-cols-1",
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      },
    },
    defaultVariants: {
      columns: 1,
    },
  }
);

export interface FormGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  'data-cy'?: string;
}

/**
 * Form grid for arranging form fields in columns
 */
export const FormGrid = React.forwardRef<HTMLDivElement, FormGridProps>(
  ({ className, columns = 1, children, 'data-cy': dataCy, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(gridVariants({ columns }), className)}
        data-cy={dataCy}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FormGrid.displayName = "FormGrid";

// Form Field Label variants
const labelVariants = cva(
  "block text-sm font-medium mb-1.5",
  {
    variants: {
      error: {
        true: "text-red-500 dark:text-red-400",
        false: "text-gray-700 dark:text-gray-200",
      },
      disabled: {
        true: "opacity-60",
        false: "",
      },
    },
    defaultVariants: {
      error: false,
      disabled: false,
    },
  }
);

export interface FormFieldProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Field label */
  label?: React.ReactNode;
  /** Whether the field is required */
  required?: boolean;
  /** Description or hint text */
  description?: React.ReactNode;
  /** Error message */
  error?: string;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** HTML name attribute for the field */
  name?: string;
  'data-cy'?: string;
}

/**
 * Form field component for consistent layout of form controls
 */
export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ 
    className, 
    label, 
    required, 
    description, 
    error, 
    disabled = false, 
    name, 
    children, 
    'data-cy': dataCy, 
    ...props 
  }, ref) => {
    // Generate IDs for accessibility
    const id = React.useId();
    const fieldId = name || `field-${id}`;
    const descriptionId = description ? `${fieldId}-description` : undefined;
    const errorId = error ? `${fieldId}-error` : undefined;

    return (
      <div
        ref={ref}
        className={cn("space-y-1.5", className)}
        data-cy={dataCy}
        {...props}
      >
        {label && (
          <label
            htmlFor={fieldId}
            className={cn(labelVariants({ error: !!error, disabled }))}
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        <div>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement, {
                id: fieldId,
                'aria-describedby': descriptionId || errorId ? `${descriptionId} ${errorId}`.trim() : undefined,
                'aria-invalid': error ? 'true' : undefined,
                disabled: disabled || child.props.disabled,
                ...child.props,
              });
            }
            return child;
          })}
        </div>
        {description && !error && (
          <p 
            id={descriptionId}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            {description}
          </p>
        )}
        {error && (
          <p 
            id={errorId}
            className="text-sm text-red-500 dark:text-red-400"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

// Form Action variants
const actionsVariants = cva(
  "flex gap-4 mt-6",
  {
    variants: {
      align: {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
        between: "justify-between",
      },
    },
    defaultVariants: {
      align: "right",
    },
  }
);

export interface FormActionsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof actionsVariants> {
  /** Label for the submit button */
  submitLabel?: string;
  /** Label for the cancel button */
  cancelLabel?: string;
  /** Whether to show the cancel button */
  showCancel?: boolean;
  /** Callback when cancel is clicked */
  onCancel?: () => void;
  /** Whether the form is currently submitting */
  isSubmitting?: boolean;
  'data-cy'?: string;
}

/**
 * Form actions component for submit/cancel buttons
 */
export const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(
  ({ 
    className, 
    align, 
    children,
    submitLabel = "Submit",
    cancelLabel = "Cancel",
    showCancel = false,
    onCancel,
    isSubmitting = false,
    'data-cy': dataCy, 
    ...props 
  }, ref) => {
    const form = useFormContext();
    const formIsSubmitting = isSubmitting || form?.formState?.isSubmitting;
    
    return (
      <div
        ref={ref}
        className={cn(actionsVariants({ align }), className)}
        data-cy={dataCy}
        {...props}
      >
        {children ? (
          children
        ) : (
          <>
            {(showCancel || onCancel) && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                disabled={formIsSubmitting}
                data-cy={`${dataCy}-cancel`}
              >
                {cancelLabel}
              </Button>
            )}
            <Button 
              type="submit"
              disabled={formIsSubmitting}
              data-cy={`${dataCy}-submit`}
            >
              {formIsSubmitting ? 'Submitting...' : submitLabel}
            </Button>
          </>
        )}
      </div>
    );
  }
);

FormActions.displayName = "FormActions";

// Export all components
export { Button as FormButton };

// Assign compound components
Form.Section = FormSection;
Form.Grid = FormGrid;
Form.Field = FormField;
Form.Actions = FormActions;
Form.Button = Button;