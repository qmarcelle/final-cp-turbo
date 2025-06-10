/**
 * Custom test utilities for UI components
 */
import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { FormProvider, useForm, FieldValues, UseFormReturn } from 'react-hook-form';
import '@testing-library/jest-dom';

// Re-export everything from testing-library
export * from '@testing-library/react';

// Mock axe for accessibility testing (using global jest)
export const axe = {
  run: () => Promise.resolve({ violations: [] }),
  configure: () => {},
};

// Custom render function for components that need form context
export function renderWithForm<T extends FieldValues = FieldValues>(
  ui: ReactElement,
  formMethods?: Partial<UseFormReturn<T>>,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult & { form: UseFormReturn<T> } {
  const defaultFormMethods = useForm<T>();
  const methods = formMethods ? { ...defaultFormMethods, ...formMethods } : defaultFormMethods;
  
  const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <FormProvider {...methods}>
      <form>{children}</form>
    </FormProvider>
  );

  const result = render(ui, { wrapper: Wrapper, ...options });
  
  return {
    ...result,
    form: methods,
  };
}

// Override render method
export { render }; 