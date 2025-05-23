import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Toggle, type ToggleProps  } from '../../../foundation/toggle/toggle';
import { FormProvider, useForm } from 'react-hook-form';

describe('Toggle Component', () => {
  // Test component that properly uses react-hook-form
  const TestToggle: React.FC<Partial<ToggleProps<any>>> = (props) => {
    const methods = useForm<{ test: boolean }>({
      defaultValues: { test: false }
    });
    
    return (
      <FormProvider {...methods}>
        <Toggle 
          name="test" 
          control={methods.control}
          {...props}
        />
      </FormProvider>
    );
  };

  it('renders with basic props', () => {
    render(<TestToggle label="Test Toggle" />);
    
    const toggle = screen.getByRole('switch');
    const label = screen.getByText('Test Toggle');
    
    expect(toggle).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('renders in unchecked state by default', () => {
    render(<TestToggle label="Test Toggle" />);
    
    const toggle = screen.getByRole('switch');
    expect(toggle).not.toBeChecked();
  });

  it('respects disabled state', () => {
    render(<TestToggle label="Test Toggle" disabled />);
    
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeDisabled();
  });

  it('applies size classes correctly', () => {
    render(<TestToggle label="Test Toggle" size="sm" />);
    
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveClass('toggle-sm');
  });

  it('shows required indicator when required', () => {
    render(<TestToggle label="Test Toggle" required />);
    
    // The asterisk is in a span with class text-error inside the label-text span
    const labelContainer = screen.getByText('Test Toggle').closest('.label-text');
    const asterisk = labelContainer?.querySelector('.text-error');
    
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveTextContent('*');
  });

  it('applies custom className', () => {
    render(<TestToggle label="Test Toggle" className="custom-class" />);
    
    const formControl = screen.getByRole('switch').closest('.form-control');
    expect(formControl).toHaveClass('custom-class');
  });

  it('uses data-cy attribute correctly', () => {
    render(<TestToggle label="Test Toggle" data-cy="toggle-test" />);
    
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('data-cy', 'toggle-test');
  });

  it('handles change events', () => {
    // Create a form where we can track the value change
    const TestToggleWithWatch = () => {
      const methods = useForm({
        defaultValues: { test: false }
      });
      const { watch, control } = methods;
      const value = watch('test');
      
      return (
        <FormProvider {...methods}>
          <div data-testid="value-display">{value ? 'true' : 'false'}</div>
          <Toggle name="test" control={control} label="Test Toggle" />
        </FormProvider>
      );
    };
    
    render(<TestToggleWithWatch />);
    
    // Verify initial state
    expect(screen.getByTestId('value-display')).toHaveTextContent('false');
    
    // Click the toggle
    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);
    
    // Verify the value has changed
    expect(screen.getByTestId('value-display')).toHaveTextContent('true');
  });
});
