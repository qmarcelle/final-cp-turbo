import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Alert } from './Alert';

expect.extend(toHaveNoViolations);

describe('Alert Component', () => {
  // Basic rendering
  it('renders with default props (info variant)', () => {
    render(<Alert data-cy="info-alert">Alert content</Alert>);
    
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('bg-blue-50');
    expect(screen.getByText('Alert content')).toBeInTheDocument();
  });

  // Variants
  it('renders with warning variant', () => {
    render(<Alert variant="warning" data-cy="warning-alert">Warning message</Alert>);
    
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('bg-yellow-50');
    expect(screen.getByText('Warning message')).toBeInTheDocument();
  });

  it('renders with success variant', () => {
    render(<Alert variant="success" data-cy="success-alert">Success message</Alert>);
    
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('bg-green-50');
    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  it('renders with error variant', () => {
    render(<Alert variant="error" data-cy="error-alert">Error message</Alert>);
    
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('bg-red-50');
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  // Title
  it('renders with a title', () => {
    render(
      <Alert title="Alert Title" data-cy="titled-alert">
        Alert with title
      </Alert>
    );
    
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('Alert with title')).toBeInTheDocument();
  });

  // Custom classes
  it('applies custom className', () => {
    render(
      <Alert className="custom-class" data-cy="custom-class-alert">
        Alert with custom class
      </Alert>
    );
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('custom-class');
  });

  // Cypress testing attribute
  it('uses data-cy attribute correctly', () => {
    render(<Alert data-cy="test-alert">Alert with data-cy</Alert>);
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('data-cy', 'test-alert');
  });

  // Dismissible behavior
  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    
    render(
      <Alert onClose={handleClose} data-cy="closable-alert">
        Closable alert
      </Alert>
    );
    
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  // Rich content
  it('renders rich content correctly', () => {
    render(
      <Alert variant="info" title="Rich Content" data-cy="rich-content-alert">
        <div>
          <p>Main message</p>
          <ul>
            <li>Point 1</li>
            <li>Point 2</li>
          </ul>
          <a href="#link">Learn more</a>
        </div>
      </Alert>
    );
    
    expect(screen.getByText('Rich Content')).toBeInTheDocument();
    expect(screen.getByText('Main message')).toBeInTheDocument();
    expect(screen.getByText('Point 1')).toBeInTheDocument();
    expect(screen.getByText('Point 2')).toBeInTheDocument();
    expect(screen.getByText('Learn more')).toBeInTheDocument();
  });

  // Action prop
  it('renders with action element', () => {
    render(
      <Alert
        variant="warning"
        action={<button>Take Action</button>}
        data-cy="action-alert"
      >
        Alert with action
      </Alert>
    );
    
    expect(screen.getByText('Take Action')).toBeInTheDocument();
    expect(screen.getByText('Alert with action')).toBeInTheDocument();
  });

  // Accessibility
  it('has no accessibility violations', async () => {
    const { container } = render(
      <Alert title="Accessible Alert" data-cy="accessible-alert">
        This is an accessible alert message
      </Alert>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Icon handling
  it('shows default icon based on variant', () => {
    const { rerender } = render(
      <Alert variant="success" icon data-cy="icon-alert">
        Alert with icon
      </Alert>
    );
    
    expect(screen.getByRole('alert')).toContainElement(
      screen.getByTestId('alert-icon')
    );

    rerender(
      <Alert variant="error" icon data-cy="icon-alert">
        Alert with icon
      </Alert>
    );
    
    expect(screen.getByRole('alert')).toContainElement(
      screen.getByTestId('alert-icon')
    );
  });

  // Custom icon
  it('uses custom icon when provided', () => {
    const CustomIcon = () => <svg data-testid="custom-icon" />;
    
    render(
      <Alert icon={<CustomIcon />} data-cy="custom-icon-alert">
        Alert with custom icon
      </Alert>
    );
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});