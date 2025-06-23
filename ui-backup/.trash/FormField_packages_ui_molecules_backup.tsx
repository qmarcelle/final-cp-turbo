'use client';

import * as React from 'react';
import { useFormContext } from './Form';
import { cn } from '@/utils';
import { FieldValues, Path, RegisterOptions } from 'react-hook-form';

interface FormFieldContextValue<T extends FieldValues = FieldValues> {
  name: Path<T>;
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

export function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const formContext = useFormContext();

  if (!fieldContext) {
    throw new Error('useFormField must be used within a FormField');
  }

  const field = formContext.register(fieldContext.name);

  return {
    id: fieldContext.name,
    name: fieldContext.name,
    formItemId: `${fieldContext.name}-form-item`,
    formDescriptionId: `${fieldContext.name}-form-item-description`,
    formMessageId: `${fieldContext.name}-form-item-message`,
    ...field,
  };
}

interface FormFieldProps<T extends FieldValues>
  extends React.HTMLAttributes<HTMLDivElement> {
  name: Path<T>;
  rules?: RegisterOptions;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
}

const FormField = React.forwardRef<
  HTMLDivElement,
  FormFieldProps<any>
>(({
  name,
  rules,
  label,
  description,
  error,
  required,
  className,
  children,
  ...props
}, ref) => {
  const { formState } = useFormContext();
  const fieldError = error || formState.errors[name]?.message;

  return (
    <FormFieldContext.Provider value={{ name }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {label && (
          <div className="flex items-center justify-between">
            <label
              htmlFor={name}
              className={cn(
                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                required && 'after:text-red-500 after:content-["*"]'
              )}
            >
              {label}
            </label>
          </div>
        )}
        {children}
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
        {fieldError && (
          <p className="text-sm font-medium text-destructive">
            {fieldError as string}
          </p>
        )}
      </div>
    </FormFieldContext.Provider>
  );
});

FormField.displayName = 'FormField';

export { FormField }; 