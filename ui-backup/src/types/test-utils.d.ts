declare module '@tests/test-utils' {
  import { RenderResult } from '@testing-library/react';
  import { FieldValues, UseFormReturn } from 'react-hook-form';

  export function renderWithForm<T extends FieldValues = FieldValues>(
    ui: React.ReactElement,
    formMethods?: Partial<UseFormReturn<T>>
  ): RenderResult & { form: UseFormReturn<T> };
}

declare module '../../../../../tests/jest/test-utils' {
  import { RenderResult } from '@testing-library/react';
  import { FieldValues, UseFormReturn } from 'react-hook-form';

  export function renderWithForm<T extends FieldValues = FieldValues>(
    ui: React.ReactElement,
    formMethods?: Partial<UseFormReturn<T>>
  ): RenderResult & { form: UseFormReturn<T> };
} 