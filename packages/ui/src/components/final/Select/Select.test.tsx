import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { Select } from './Select';

const TestComponent = (props: any) => {
  const { control } = useForm({
    defaultValues: {
      test: '',
    },
  });

  return (
    <Select
      name="test"
      control={control}
      {...props}
    />
  );
};

describe('Select Component', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders with basic props', () => {
    render(<TestComponent options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<TestComponent options={options} label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<TestComponent options={options} placeholder="Select an option" />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<TestComponent options={options} />);
    options.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('handles disabled state', () => {
    render(<TestComponent options={options} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('shows required indicator when required', () => {
    render(<TestComponent options={options} label="Test Label" required />);
    const label = screen.getByText('Test Label');
    expect(label.parentElement).toHaveClass('after:content-["*"]');
  });

  it('applies custom className', () => {
    const customClass = 'custom-select';
    render(<TestComponent options={options} className={customClass} />);
    expect(screen.getByRole('combobox')).toHaveClass(customClass);
  });

  it('handles value changes', () => {
    render(<TestComponent options={options} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'option2' } });
    expect(select).toHaveValue('option2');
  });

  it('shows error message when validation fails', async () => {
    const TestFormComponent = () => {
      const { control } = useForm({
        defaultValues: {
          test: '',
        },
      });

      return (
        <form>
          <Select
            name="test"
            control={control}
            options={options}
            rules={{ required: 'This field is required' }}
          />
          <button type="submit">Submit</button>
        </form>
      );
    };

    render(<TestFormComponent />);
    fireEvent.click(screen.getByText('Submit'));
    expect(await screen.findByText('This field is required')).toBeInTheDocument();
  });
});