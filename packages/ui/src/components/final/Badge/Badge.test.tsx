import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Badge, StatusBadge, CountBadge, StatusLabel } from './Badge';

describe('Badge Component', () => {
  // Basic rendering
  it('renders with children', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  // Variants
  it('applies variant classes correctly', () => {
    const { rerender } = render(<Badge variant="success">Success</Badge>);
    expect(screen.getByText('Success')).toHaveClass('bg-green-100');

    rerender(<Badge variant="warning">Warning</Badge>);
    expect(screen.getByText('Warning')).toHaveClass('bg-yellow-100');

    rerender(<Badge variant="error">Error</Badge>);
    expect(screen.getByText('Error')).toHaveClass('bg-red-100');
  });

  // Sizes
  it('applies size classes correctly', () => {
    const { rerender } = render(<Badge size="sm">Small</Badge>);
    expect(screen.getByText('Small')).toHaveClass('px-2');

    rerender(<Badge size="lg">Large</Badge>);
    expect(screen.getByText('Large')).toHaveClass('px-3');
  });

  // Interactive
  it('renders as button when interactive', () => {
    render(<Badge interactive>Click me</Badge>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Badge interactive onClick={handleClick}>Click me</Badge>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });

  // Dot indicator
  it('renders dot indicator when specified', () => {
    render(<Badge dot>With Dot</Badge>);
    expect(screen.getByText('With Dot').previousSibling).toHaveClass('rounded-full');
  });

  // Icon support
  it('renders icon when provided', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;
    render(<Badge icon={<TestIcon />}>With Icon</Badge>);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });
});

describe('StatusBadge Component', () => {
  it('renders with correct variant based on status', () => {
    const { rerender } = render(<StatusBadge status="success">Success</StatusBadge>);
    expect(screen.getByText('Success')).toHaveClass('bg-green-100');

    rerender(<StatusBadge status="warning">Warning</StatusBadge>);
    expect(screen.getByText('Warning')).toHaveClass('bg-yellow-100');

    rerender(<StatusBadge status="error">Error</StatusBadge>);
    expect(screen.getByText('Error')).toHaveClass('bg-red-100');
  });
});

describe('CountBadge Component', () => {
  it('renders count correctly', () => {
    render(<CountBadge count={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('handles max value correctly', () => {
    render(<CountBadge count={150} max={99} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('does not render when count is 0 and showZero is false', () => {
    const { container } = render(<CountBadge count={0} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders zero when showZero is true', () => {
    render(<CountBadge count={0} showZero />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});

describe('StatusLabel Component', () => {
  it('renders with correct status and text', () => {
    render(<StatusLabel status="pending" text="In Progress" />);
    const label = screen.getByText('In Progress');
    expect(label).toHaveClass('bg-labelNeutral');
    expect(label).toHaveAttribute('role', 'status');
  });

  it('applies correct variant classes for different statuses', () => {
    const { rerender } = render(<StatusLabel status="approved" text="Approved" />);
    expect(screen.getByText('Approved')).toHaveClass('bg-labelSuccess');

    rerender(<StatusLabel status="denied" text="Denied" />);
    expect(screen.getByText('Denied')).toHaveClass('bg-labelError');
  });

  it('is accessible with aria-live attribute', () => {
    render(<StatusLabel status="pending" text="Processing" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });
});