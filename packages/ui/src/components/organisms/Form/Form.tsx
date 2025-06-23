'use client';

import * as React from 'react';
import { useForm, UseFormProps, FieldValues, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/utils';

const FormContext = React.createContext<UseFormReturn<any> | null>(null);

export function useFormContext<T extends FieldValues>() {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context as UseFormReturn<T>;
}

interface FormProps<T extends FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  schema?: z.ZodType<T>;
  defaultValues?: UseFormProps<T>['defaultValues'];
  onSubmit: (values: T) => void | Promise<void>;
  children: React.ReactNode;
}

function Form<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className,
  ...props
}: FormProps<T>) {
  const form = useForm<T>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
  });

  return (
    <FormContext.Provider value={form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-6', className)}
        {...props}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

const FormSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('space-y-4', className)}
    {...props}
  />
));

FormSection.displayName = 'FormSection';

const FormGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('grid gap-4 sm:grid-cols-2', className)}
    {...props}
  />
));

FormGrid.displayName = 'FormGrid';

const FormActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-end space-x-2', className)}
    {...props}
  />
));

FormActions.displayName = 'FormActions';

export {
  Form,
  FormSection,
  FormGrid,
  FormActions,
}; 