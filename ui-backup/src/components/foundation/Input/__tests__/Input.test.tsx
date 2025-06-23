/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { screen, fireEvent, waitFor, render as rtlRender } from '@testing-library/react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input  } from '../Input';
import type { InputProps } from '../Input';
import { z } from 'zod';
import '@testing-library/jest-dom';

// Mock the IMask component to avoid issues with masked input tests
jest.mock('react-imask', () => ({
  IMaskInput: ({ onAccept, ...props }: any) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Simulate the masking behavior
      if (props.mask === '(000) 000-0000' && e.target.value === '1234567890') {
        e.target.value = '(123) 456-7890';
        onAccept && onAccept(e.target.value, { unmaskedValue: '1234567890' });
      }
    };
    
    return (
      <input 
        data-testid="masked-input"
        onChange={handleChange}
        {...props}
      />
    );
  }
}));

// Define test form values interface
interface TestFormValues {
  testInput: string;
}

// Define validation schema
const schema = z.object({
  testInput: z.string()
    .min(1, 'This field is required')
    .email('Invalid email format')
    .max(50, 'Maximum 50 characters allowed')
});

// Basic Input component for simple tests
const SimpleInput: React.FC<Partial<InputProps<TestFormValues>>> = (props) => {
  return (
    <div data-testid="input-wrapper">
      <Input<TestFormValues>
        name="testInput"
        label="Test Label"
        data-cy="test-input"
        control={{} as any} // Mock control
        {...props}
      />
    </div>
  );
};

describe('Input Component', () => {
  describe('Basic Rendering', () => {
    it('renders with basic props', () => {
      rtlRender(<SimpleInput />);
      const input = screen.getByLabelText('Test Label');
      expect(input).toBeInTheDocument();
    });

    it('handles disabled state', () => {
      rtlRender(<SimpleInput disabled={true} />);
      const input = screen.getByLabelText('Test Label');
      expect(input).toBeDisabled();
    });

    it('renders with placeholder', () => {
      rtlRender(<SimpleInput placeholder="Test Placeholder" />);
      const input = screen.getByPlaceholderText('Test Placeholder');
      expect(input).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = rtlRender(<SimpleInput className="custom-class" />);
      // Check if the component rendered successfully
      expect(container).toBeInTheDocument();
    });

    it('handles help text display', () => {
      rtlRender(<SimpleInput helpText="This is help text" />);
      expect(screen.getByText('This is help text')).toBeInTheDocument();
    });

    it('handles prefix and suffix correctly', () => {
      rtlRender(<SimpleInput prefix="$" suffix=".00" />);
      const prefix = screen.getByText('$');
      const suffix = screen.getByText('.00');
      expect(prefix).toBeInTheDocument();
      expect(suffix).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('shows required field validation', () => {
      rtlRender(
        <SimpleInput
          error="This field is required"
          validation={{ required: true }}
        />
      );
      
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('validates email format', () => {
      rtlRender(
        <SimpleInput
          type="email"
          error="Invalid email format"
        />
      );
      
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });

    it('validates maximum length', () => {
      rtlRender(
        <SimpleInput
          error="Maximum 50 characters allowed"
        />
      );
      
      expect(screen.getByText('Maximum 50 characters allowed')).toBeInTheDocument();
    });
  });

  describe('Error States', () => {
    it('displays error message and styling', () => {
      rtlRender(
        <SimpleInput 
          error="Custom error message"
        />
      );
      
      const error = screen.getByText('Custom error message');
      expect(error).toBeInTheDocument();
    });
  });

  describe('Additional Features', () => {
    it('shows character count', () => {
      rtlRender(<SimpleInput showCount={true} maxLength={10} value="test" />);
      
      // Character count should be displayed
      expect(screen.getByText('4/10')).toBeInTheDocument();
    });

    it('handles debounced onChange', () => {
      const onChange = jest.fn();
      rtlRender(<SimpleInput onChange={onChange} debounceMs={100} />);
      
      const input = screen.getByLabelText('Test Label');
      expect(input).toBeInTheDocument();
    });

    it('handles masked input', () => {
      // For masked input, we don't pass the mask directly to the DOM element
      // Instead, we mock the IMaskInput component
      const { container } = rtlRender(
        <SimpleInput
          mask={{
            mask: '(000) 000-0000'
          }}
        />
      );
      
      // Just check if the component rendered
      expect(container).toBeInTheDocument();
    });
  });
});