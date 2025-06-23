import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormColumn } from './FormColumn';

describe('FormColumn Component', () => {
  it('renders children correctly', () => {
    render(
      <FormColumn data-cy="test-column">
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </FormColumn>
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <FormColumn className="custom-class" data-cy="test-column">
        <div>Test Content</div>
      </FormColumn>
    );

    const column = screen.getByTestId('test-column');
    expect(column).toHaveClass('custom-class');
  });

  it('applies data-cy attribute', () => {
    render(
      <FormColumn data-cy="test-column">
        <div>Test Content</div>
      </FormColumn>
    );

    expect(screen.getByTestId('test-column')).toBeInTheDocument();
  });

  it('maintains single column layout', () => {
    render(
      <FormColumn data-cy="test-column">
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </FormColumn>
    );

    const column = screen.getByTestId('test-column');
    expect(column).toHaveClass('grid-cols-1');
  });

  it('renders form fields correctly', () => {
    render(
      <FormColumn data-cy="test-column">
        <input type="text" data-testid="input-1" placeholder="First Name" />
        <input type="email" data-testid="input-2" placeholder="Email" />
      </FormColumn>
    );

    expect(screen.getByTestId('input-1')).toBeInTheDocument();
    expect(screen.getByTestId('input-2')).toBeInTheDocument();
  });

  it('preserves form field attributes', () => {
    render(
      <FormColumn data-cy="test-column">
        <input
          type="text"
          data-testid="input"
          required
          disabled
          placeholder="Test Input"
        />
      </FormColumn>
    );

    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('disabled');
    expect(input).toHaveAttribute('placeholder', 'Test Input');
  });

  it('handles empty children', () => {
    render(<FormColumn data-cy="test-column" />);
    const column = screen.getByTestId('test-column');
    expect(column).toBeInTheDocument();
    expect(column.children.length).toBe(0);
  });
});