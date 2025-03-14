import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select } from '../Select';
import { z } from 'zod';
import { renderWithForm } from '@tests/test-utils';
import '@testing-library/jest-dom';

type TestFormValues = {
  testSelect: string;
};

const schema = z.object({
  testSelect: z.string().min(1, 'This field is required')
});

const defaultProps = {
  name: 'testSelect' as const,
  label: 'Test Select',
  placeholder: 'Choose an option',
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ],
  'data-cy': 'test-select',
  required: true
};

describe('Select Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders with label and placeholder', () => {
    const { form: { control } } = renderWithForm<TestFormValues>(
      <div />,
      { defaultValues: { testSelect: '' } }
    );

    renderWithForm<TestFormValues>(
      <Select
        control={control}
        {...defaultProps}
      />,
      { defaultValues: { testSelect: '' } }
    );
    
    expect(screen.getByRole('combobox', { name: /Test Select/ })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Choose an option' })).toBeInTheDocument();
  });

  it('renders all options', () => {
    const { form: { control } } = renderWithForm<TestFormValues>(
      <div />,
      { defaultValues: { testSelect: '' } }
    );

    renderWithForm<TestFormValues>(
      <Select
        control={control}
        {...defaultProps}
      />,
      { defaultValues: { testSelect: '' } }
    );
    
    defaultProps.options.forEach(option => {
      expect(screen.getByRole('option', { name: option.label })).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    const { form: { control } } = renderWithForm<TestFormValues>(
      <div />,
      { defaultValues: { testSelect: '' } }
    );

    renderWithForm<TestFormValues>(
      <Select
        control={control}
        {...defaultProps}
        className="custom-class"
      />,
      { defaultValues: { testSelect: '' } }
    );
    
    expect(screen.getByRole('combobox', { name: /Test Select/ })).toHaveClass('custom-class');
  });

  it('handles required validation', async () => {
    const user = userEvent.setup({ delay: null });
    const { form: { control } } = renderWithForm<TestFormValues>(
      <div />,
      { defaultValues: { testSelect: '' } }
    );

    renderWithForm<TestFormValues>(
      <Select
        control={control}
        {...defaultProps}
      />,
      { defaultValues: { testSelect: '' } }
    );
    
    const select = screen.getByRole('combobox', { name: /Test Select/ });
    await user.click(select);
    await user.tab();
    
    act(() => {
      jest.runAllTimers();
    });
    
    expect(await screen.findByText('This field is required')).toBeInTheDocument();
  });

  it('handles option selection', async () => {
    const user = userEvent.setup({ delay: null });
    const { form: { control } } = renderWithForm<TestFormValues>(
      <div />,
      { defaultValues: { testSelect: '' } }
    );

    renderWithForm<TestFormValues>(
      <Select
        control={control}
        {...defaultProps}
      />,
      { defaultValues: { testSelect: '' } }
    );
    
    const select = screen.getByRole('combobox', { name: /Test Select/ });
    await user.selectOptions(select, 'option1');
    
    act(() => {
      jest.runAllTimers();
    });
    
    expect(select).toHaveValue('option1');
  });

  it('handles disabled state', () => {
    const { form: { control } } = renderWithForm<TestFormValues>(
      <div />,
      { defaultValues: { testSelect: '' } }
    );

    renderWithForm<TestFormValues>(
      <Select
        control={control}
        {...defaultProps}
        disabled
      />,
      { defaultValues: { testSelect: '' } }
    );
    
    expect(screen.getByRole('combobox', { name: /Test Select/ })).toBeDisabled();
  });

  it('sets aria attributes correctly', () => {
    const { form: { control } } = renderWithForm<TestFormValues>(
      <div />,
      { defaultValues: { testSelect: '' } }
    );

    renderWithForm<TestFormValues>(
      <Select
        control={control}
        {...defaultProps}
      />,
      { defaultValues: { testSelect: '' } }
    );
    
    const select = screen.getByRole('combobox', { name: /Test Select/ });
    expect(select).toHaveAttribute('aria-required', 'true');
    expect(select).toHaveAttribute('aria-invalid', 'false');
  });
}); 