import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NumberInput, ControlledNumberInput } from '../NumberInput';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define schema for form validation tests
const schema = z.object({
  numberField: z.number().min(0, 'Must be at least 0').max(100, 'Must be at most 100').optional(),
});

type FormValues = {
  numberField: number | undefined;
};

// Test component that wraps ControlledNumberInput with form context
const TestControlledNumberInput = ({
  defaultValue = undefined,
  ...props
}: {
  defaultValue?: number;
  [key: string]: any;
}) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      numberField: defaultValue,
    },
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})}>
        <ControlledNumberInput
          name="numberField"
          control={methods.control}
          data-cy="number-input"
          {...props}
        />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

describe('NumberInput Component', () => {
  describe('Standalone NumberInput', () => {
    it('renders with placeholder', () => {
      const handleChange = jest.fn();
      render(
        <NumberInput
          value={undefined}
          onChange={handleChange}
          placeholder="Test placeholder"
          data-cy="number-input"
        />
      );
      
      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input).toBeInTheDocument();
    });

    it('formats number value correctly', () => {
      const handleChange = jest.fn();
      render(<NumberInput value={1000} onChange={handleChange} data-cy="number-input" />);
      
      const input = screen.getByDisplayValue('1,000');
      expect(input).toBeInTheDocument();
    });

    it('calls onChange with parsed value', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(<NumberInput value={undefined} onChange={handleChange} data-cy="number-input" />);
      
      const input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, '123');
      
      expect(handleChange).toHaveBeenCalledWith(123);
    });

    it('increases value when increment button is clicked', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(<NumberInput value={5} onChange={handleChange} data-cy="number-input" />);
      
      const incrementButton = screen.getByTestId('number-input-increment');
      await user.click(incrementButton);
      
      expect(handleChange).toHaveBeenCalledWith(6);
    });

    it('decreases value when decrement button is clicked', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(<NumberInput value={5} onChange={handleChange} data-cy="number-input" />);
      
      const decrementButton = screen.getByTestId('number-input-decrement');
      await user.click(decrementButton);
      
      expect(handleChange).toHaveBeenCalledWith(4);
    });

    it('respects min value constraint', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(<NumberInput value={5} onChange={handleChange} min={5} data-cy="number-input" />);
      
      const decrementButton = screen.getByTestId('number-input-decrement');
      await user.click(decrementButton);
      
      expect(handleChange).toHaveBeenCalledWith(5); // Value shouldn't change
      expect(decrementButton).toBeDisabled();
    });

    it('respects max value constraint', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(<NumberInput value={10} onChange={handleChange} max={10} data-cy="number-input" />);
      
      const incrementButton = screen.getByTestId('number-input-increment');
      await user.click(incrementButton);
      
      expect(handleChange).toHaveBeenCalledWith(10); // Value shouldn't change
      expect(incrementButton).toBeDisabled();
    });

    it('respects step value for increment/decrement', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(<NumberInput value={10} onChange={handleChange} step={5} data-cy="number-input" />);
      
      const incrementButton = screen.getByTestId('number-input-increment');
      await user.click(incrementButton);
      
      expect(handleChange).toHaveBeenCalledWith(15);
      
      handleChange.mockClear();
      
      const decrementButton = screen.getByTestId('number-input-decrement');
      await user.click(decrementButton);
      
      expect(handleChange).toHaveBeenCalledWith(5);
    });

    it('respects precision for rounding numbers', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(<NumberInput value={0} onChange={handleChange} precision={2} data-cy="number-input" />);
      
      const input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, '1.2345');
      
      expect(handleChange).toHaveBeenCalledWith(1.23);
    });

    it('restricts negative values when allowNegative is false', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(
        <NumberInput 
          value={0} 
          onChange={handleChange} 
          allowNegative={false} 
          data-cy="number-input" 
        />
      );
      
      const decrementButton = screen.getByTestId('number-input-decrement');
      await user.click(decrementButton);
      
      expect(handleChange).toHaveBeenCalledWith(0); // Value shouldn't change
      expect(decrementButton).toBeDisabled();
      
      // Try to enter a negative value manually
      const input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, '-5');
      
      expect(handleChange).toHaveBeenCalledWith(0); // Value should be coerced to 0
    });

    it('hides control buttons when showControls is false', () => {
      const handleChange = jest.fn();
      
      render(
        <NumberInput 
          value={5} 
          onChange={handleChange} 
          showControls={false} 
          data-cy="number-input" 
        />
      );
      
      expect(screen.queryByTestId('number-input-increment')).not.toBeInTheDocument();
      expect(screen.queryByTestId('number-input-decrement')).not.toBeInTheDocument();
    });

    it('handles arrow keys for increment/decrement', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(<NumberInput value={5} onChange={handleChange} data-cy="number-input" />);
      
      const input = screen.getByRole('textbox');
      input.focus();
      
      // Arrow up should increment
      await user.keyboard('{ArrowUp}');
      expect(handleChange).toHaveBeenCalledWith(6);
      
      handleChange.mockClear();
      
      // Arrow down should decrement
      await user.keyboard('{ArrowDown}');
      expect(handleChange).toHaveBeenCalledWith(4);
    });

    it('handles undefined value correctly', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(<NumberInput value={undefined} onChange={handleChange} data-cy="number-input" />);
      
      // Input should be empty
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
      
      // Increment from undefined should start from 0
      const incrementButton = screen.getByTestId('number-input-increment');
      await user.click(incrementButton);
      
      expect(handleChange).toHaveBeenCalledWith(1);
    });

    it('applies custom className to the component', () => {
      const handleChange = jest.fn();
      
      render(
        <NumberInput 
          value={5} 
          onChange={handleChange} 
          className="custom-class" 
          data-cy="number-input" 
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
    });

    it('applies custom number formatting options', () => {
      const handleChange = jest.fn();
      
      render(
        <NumberInput 
          value={1234.56} 
          onChange={handleChange} 
          formatOptions={{ style: 'currency', currency: 'USD' }} 
          data-cy="number-input" 
        />
      );
      
      // Should display value with currency formatting
      expect(screen.getByRole('textbox')).toHaveValue('$1,234.56');
    });
  });

  describe('ControlledNumberInput with React Hook Form', () => {
    it('renders with form control', () => {
      render(<TestControlledNumberInput label="Number Field" />);
      
      const input = screen.getByLabelText('Number Field');
      expect(input).toBeInTheDocument();
    });

    it('shows validation error when value exceeds max', async () => {
      const user = userEvent.setup();
      
      render(<TestControlledNumberInput defaultValue={0} label="Number Field" />);
      
      const input = screen.getByLabelText('Number Field');
      await user.clear(input);
      await user.type(input, '150');
      
      // Submit to trigger validation
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await user.click(submitButton);
      
      // Check for validation error
      await waitFor(() => {
        expect(screen.getByText('Must be at most 100')).toBeInTheDocument();
      });
    });

    it('shows validation error when value is below min', async () => {
      const user = userEvent.setup();
      
      render(<TestControlledNumberInput defaultValue={10} label="Number Field" />);
      
      const input = screen.getByLabelText('Number Field');
      await user.clear(input);
      await user.type(input, '-5');
      
      // Submit to trigger validation
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await user.click(submitButton);
      
      // Check for validation error
      await waitFor(() => {
        expect(screen.getByText('Must be at least 0')).toBeInTheDocument();
      });
    });

    it('updates form value when input changes', async () => {
      const user = userEvent.setup();
      
      render(<TestControlledNumberInput defaultValue={0} label="Number Field" />);
      
      const input = screen.getByLabelText('Number Field');
      await user.clear(input);
      await user.type(input, '42');
      
      expect(input).toHaveValue('42');
    });

    it('updates form value when increment button is clicked', async () => {
      const user = userEvent.setup();
      
      render(<TestControlledNumberInput defaultValue={5} label="Number Field" />);
      
      const incrementButton = screen.getByTestId('number-input-increment');
      await user.click(incrementButton);
      
      const input = screen.getByLabelText('Number Field');
      expect(input).toHaveValue('6');
    });

    it('updates form value when decrement button is clicked', async () => {
      const user = userEvent.setup();
      
      render(<TestControlledNumberInput defaultValue={5} label="Number Field" />);
      
      const decrementButton = screen.getByTestId('number-input-decrement');
      await user.click(decrementButton);
      
      const input = screen.getByLabelText('Number Field');
      expect(input).toHaveValue('4');
    });

    it('disables decrement button at min value', async () => {
      render(
        <TestControlledNumberInput 
          defaultValue={5} 
          label="Number Field" 
          min={5} 
        />
      );
      
      const decrementButton = screen.getByTestId('number-input-decrement');
      expect(decrementButton).toBeDisabled();
    });

    it('disables increment button at max value', async () => {
      render(
        <TestControlledNumberInput 
          defaultValue={10} 
          label="Number Field" 
          max={10} 
        />
      );
      
      const incrementButton = screen.getByTestId('number-input-increment');
      expect(incrementButton).toBeDisabled();
    });

    it('applies custom validation rules', async () => {
      const user = userEvent.setup();
      
      render(
        <TestControlledNumberInput 
          defaultValue={0} 
          label="Number Field" 
          validation={{ min: { value: 10, message: 'Custom min error' } }} 
        />
      );
      
      // Submit to trigger validation
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await user.click(submitButton);
      
      // Check for validation error
      await waitFor(() => {
        expect(screen.getByText('Custom min error')).toBeInTheDocument();
      });
    });
  });
});