import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormActions } from './FormActions';
import { Button } from '../../foundation/Button';

describe('FormActions Component', () => {
  it('renders children correctly', () => {
    render(
      <FormActions data-cy="test-actions">
        <Button data-testid="cancel-btn">Cancel</Button>
        <Button data-testid="submit-btn">Submit</Button>
      </FormActions>
    );
    
    expect(screen.getByTestId('cancel-btn')).toBeInTheDocument();
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
  });

  it('applies correct alignment classes based on align prop', () => {
    const { rerender } = render(
      <FormActions align="left" data-cy="test-actions">
        <Button>Test Button</Button>
      </FormActions>
    );
    
    let actions = screen.getByTestId('test-actions');
    expect(actions).toHaveClass('justify-start');
    
    rerender(
      <FormActions align="center" data-cy="test-actions">
        <Button>Test Button</Button>
      </FormActions>
    );
    
    actions = screen.getByTestId('test-actions');
    expect(actions).toHaveClass('justify-center');
    
    rerender(
      <FormActions align="right" data-cy="test-actions">
        <Button>Test Button</Button>
      </FormActions>
    );
    
    actions = screen.getByTestId('test-actions');
    expect(actions).toHaveClass('justify-end');
    
    rerender(
      <FormActions align="between" data-cy="test-actions">
        <Button>Test Button</Button>
      </FormActions>
    );
    
    actions = screen.getByTestId('test-actions');
    expect(actions).toHaveClass('justify-between');
  });

  it('applies custom className', () => {
    render(
      <FormActions className="custom-class" data-cy="test-actions">
        <Button>Test Button</Button>
      </FormActions>
    );
    
    const actions = screen.getByTestId('test-actions');
    expect(actions).toHaveClass('custom-class');
  });

  it('uses default right alignment when align prop is not provided', () => {
    render(
      <FormActions data-cy="test-actions">
        <Button>Test Button</Button>
      </FormActions>
    );
    
    const actions = screen.getByTestId('test-actions');
    expect(actions).toHaveClass('justify-end');
  });

  it('maintains consistent gap between buttons', () => {
    render(
      <FormActions data-cy="test-actions">
        <Button data-testid="btn-1">Button 1</Button>
        <Button data-testid="btn-2">Button 2</Button>
        <Button data-testid="btn-3">Button 3</Button>
      </FormActions>
    );
    
    const actions = screen.getByTestId('test-actions');
    expect(actions).toHaveClass('gap-4');
  });

  it('renders single button correctly', () => {
    render(
      <FormActions data-cy="test-actions">
        <Button data-testid="single-btn">Submit</Button>
      </FormActions>
    );
    
    expect(screen.getByTestId('single-btn')).toBeInTheDocument();
  });

  it('handles empty children', () => {
    render(<FormActions data-cy="test-actions" />);
    
    const actions = screen.getByTestId('test-actions');
    expect(actions).toBeInTheDocument();
    expect(actions.children.length).toBe(0);
  });
});