import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { z } from 'zod'
import { TextArea  } from '../../TextArea/TextArea'
import { renderWithForm } from '../../../../tests/test-utils'
import type { Control, UseFormReturn , RegisterOptions} from 'react-hook-form'

const schema = z.object({
  test: z.string().min(1, 'This field is required')
})

type FormValues = {
  test: string;
}

const setup = (props?: { className?: string }) => {
  const result = renderWithForm<FormValues>(
    <TextArea<FormValues>
      name="test"
      label="Test Label"
      description="Test Description"
      data-cy="test-textarea"
      {...props}
    />,
    {
      defaultValues: { test: '' },
      validationSchema: schema
    }
  );

  return {
    ...result,
    label: screen.getByLabelText('Test Label'),
    description: screen.getByText('Test Description'),
    textarea: screen.getByRole('textbox', { name: 'Test Label' })
  };
};

describe('TextArea Component', () => {
  it('renders with label and description', () => {
    const { label, description } = setup();
    expect(label).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { textarea } = setup({ className: 'custom-class' });
    const wrapper = textarea.closest('div');
    expect(wrapper).toHaveClass('custom-class');
  });

  it('shows error message', async () => {
    const { form } = setup();
    await form.trigger('test');
    await waitFor(() => {
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
  });

  it('handles user input correctly', async () => {
    const { form, user, textarea } = setup();
    await user.type(textarea, 'Test input');
    await waitFor(() => {
      expect(form.getValues('test')).toBe('Test input');
      expect(textarea).toHaveValue('Test input');
    });
  });
}); 