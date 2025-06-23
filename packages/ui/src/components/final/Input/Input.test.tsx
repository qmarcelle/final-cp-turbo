import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Input } from './Input';

expect.extend(toHaveNoViolations);

describe('Input', () => {
  // Basic rendering
  it('renders correctly', () => {
    render(<Input placeholder="Test input" />);
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument();
  });

  // Variants
  it('applies variant classes correctly', () => {
    const { rerender } = render(<Input variant="default" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-input');
    
    rerender(<Input variant="error" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-error');
    
    rerender(<Input variant="success" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-success');
  });

  // Sizes
  it('applies size classes correctly', () => {
    const { rerender } = render(<Input inputSize="sm" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-8');
    
    rerender(<Input inputSize="md" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-10');
    
    rerender(<Input inputSize="lg" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-12');
  });

  // Input types
  it('renders different input types correctly', () => {
    const { rerender } = render(<Input type="text" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    
    rerender(<Input type="password" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'password');
    
    rerender(<Input type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  // Textarea
  it('renders textarea when type is textarea', () => {
    render(<Input type="textarea" rows={4} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('rows', '4');
  });

  // Events
  it('handles change events', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  // States
  it('handles disabled state', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('handles error state', () => {
    render(<Input error />);
    expect(screen.getByRole('textbox')).toHaveClass('border-error');
  });

  it('handles success state', () => {
    render(<Input success />);
    expect(screen.getByRole('textbox')).toHaveClass('border-success');
  });

  // Icons
  it('renders with icons', () => {
    render(
      <Input
        leftIcon={<span data-testid="left-icon" />}
        rightIcon={<span data-testid="right-icon" />}
      />
    );
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  // Accessibility
  it('has no accessibility violations', async () => {
    const { container } = render(<Input aria-label="Test input" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('supports aria attributes', () => {
    render(<Input aria-label="Test label" aria-required="true" />);
    const input = screen.getByRole('textbox');
    
    expect(input).toHaveAttribute('aria-label', 'Test label');
    expect(input).toHaveAttribute('aria-required', 'true');
  });

  // Ref forwarding
  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  // Resize behavior
  it('handles resize property for textarea', () => {
    const { rerender } = render(<Input type="textarea" resize={true} />);
    expect(screen.getByRole('textbox')).not.toHaveClass('resize-none');
    
    rerender(<Input type="textarea" resize={false} />);
    expect(screen.getByRole('textbox')).toHaveClass('resize-none');
  });

  // Class merging
  it('merges custom classes with default classes', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
    expect(input).toHaveClass('flex', 'w-full', 'rounded-md');
  });
});