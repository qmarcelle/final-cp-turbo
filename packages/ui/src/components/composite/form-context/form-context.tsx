'use client'

import * as React from 'react';
import { createContext, useContext } from 'react';
import { useForm, UseFormReturn, FieldValues, Path, RegisterOptions, DefaultValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormProvider as RHFFormProvider } from 'react-hook-form'

// Use a generic type for the context props
interface FormContextValue<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T>;
  schema: z.ZodType<T>;
}

// Initialize context with a more general type or allow casting at consumption
const FormContext = createContext<FormContextValue<any> | undefined>(undefined);

export interface FormProviderProps<T extends FieldValues> extends UseFormReturn<T> {
  children: React.ReactNode;
  schema: z.ZodType<T>;
}

export function FormProvider<T extends FieldValues>({ children, schema, ...methods }: FormProviderProps<T>) {
  const contextValue: FormContextValue<T> = {
    form: methods, // methods is already UseFormReturn<T>
    schema,
  };
  return (
    // The type assertion here might be necessary if strict checks fail
    <FormContext.Provider value={contextValue as FormContextValue<any>}>
      <RHFFormProvider {...methods}>
        {children}
      </RHFFormProvider>
    </FormContext.Provider>
  );
}

export function useFormContext<T extends FieldValues = FieldValues>() { // Added default generic for T
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  // Cast to the specific type T when consumed
  return (context as FormContextValue<T>).form;
}

interface FieldOptions<T extends FieldValues> {
  required?: boolean | { value: boolean; message: string };
  validate?: RegisterOptions<T>['validate'];
}

export function useField<T extends FieldValues = FieldValues>( // Added default generic for T
  name: Path<T>,
  options?: RegisterOptions<T>
) {
  const formMethods = useFormContext<T>();
  const error = formMethods.formState.errors[name];

  return {
    ...formMethods.register(name, options),
    error: error?.message as string | undefined,
    isError: !!error,
  };
}

// Example usage would need to pass schema to FormProvider
// const methods = useForm<LoginForm>({ resolver: zodResolver(schema) });
// <FormProvider {...methods} schema={schema}>
// ...
// </FormProvider> 