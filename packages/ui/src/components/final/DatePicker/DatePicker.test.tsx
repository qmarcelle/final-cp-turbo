import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DatePicker } from './DatePicker';
import { useForm, FormProvider } from 'react-hook-form';
import { format } from 'date-fns';

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('DatePicker', () => {
  // Basic rendering
  it('renders correctly', () => {
    render(<DatePicker placeholder="Select date" />);
    expect(screen.getByRole('button')).toHaveTextContent('Select date');
  });

  // Form integration
  it('integrates with React Hook Form', async () => {
    const onSubmit = jest.fn();
    render(
      <FormWrapper>
        <form onSubmit={onSubmit}>
          <DatePicker name="testDate" control={useForm().control} />
        </form>
      </FormWrapper>
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Select today's date
    const today = format(new Date(), 'PPP');
    const dateCell = screen.getByRole('button', { name: today });
    fireEvent.click(dateCell);
    
    await waitFor(() => {
      expect(button).toHaveTextContent(today);
    });
  });

  // Props testing
  it('handles disabled state', () => {
    render(<DatePicker disabled placeholder="Select date" />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('displays error message', () => {
    render(
      <DatePicker 
        placeholder="Select date" 
        error="Please select a valid date" 
      />
    );
    expect(screen.getByText('Please select a valid date')).toBeInTheDocument();
  });

  it('displays hint message', () => {
    render(
      <DatePicker 
        placeholder="Select date" 
        hint="Choose your preferred date" 
      />
    );
    expect(screen.getByText('Choose your preferred date')).toBeInTheDocument();
  });

  // Date constraints
  it('respects min and max date constraints', () => {
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 5);

    render(
      <DatePicker 
        placeholder="Select date" 
        minDate={minDate}
        maxDate={maxDate}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    
    // Dates before minDate should be disabled
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = format(yesterday, 'PPP');
    const disabledDate = screen.getByRole('button', { name: yesterdayStr });
    expect(disabledDate).toHaveAttribute('disabled');
  });

  // Range selection
  it('handles date range selection', async () => {
    const onChange = jest.fn();
    render(
      <DatePicker 
        mode="range"
        placeholder="Select date range" 
        onChange={onChange}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    
    // Select start date
    const today = format(new Date(), 'PPP');
    const startDate = screen.getByRole('button', { name: today });
    fireEvent.click(startDate);
    
    // Select end date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = format(tomorrow, 'PPP');
    const endDate = screen.getByRole('button', { name: tomorrowStr });
    fireEvent.click(endDate);
    
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({
        startDate: expect.any(Date),
        endDate: expect.any(Date),
      });
    });
  });

  // Accessibility
  it('supports keyboard navigation', () => {
    render(<DatePicker placeholder="Select date" />);
    const button = screen.getByRole('button');
    
    // Tab to focus
    fireEvent.keyDown(document.body, { key: 'Tab' });
    expect(button).toHaveFocus();
    
    // Enter to open
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
}); 