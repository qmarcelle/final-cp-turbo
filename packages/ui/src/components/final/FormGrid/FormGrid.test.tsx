import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormGrid } from './FormGrid';

describe('FormGrid Component', () => {
  it('renders children correctly', () => {
    render(
      <FormGrid data-cy="test-grid">
        <div data-cy="first-child">First Child</div>
        <div data-cy="second-child">Second Child</div>
      </FormGrid>
    );
    
    const grid = screen.getByTestId('test-grid');
    expect(grid.children.length).toBe(2);
    expect(screen.getByTestId('first-child')).toBeInTheDocument();
    expect(screen.getByTestId('second-child')).toBeInTheDocument();
  });

  it('applies correct column classes based on columns prop', () => {
    const { rerender } = render(
      <FormGrid columns={2} data-cy="test-grid">
        <div>Test Content</div>
      </FormGrid>
    );
    
    let grid = screen.getByTestId('test-grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('sm:grid-cols-2');
    
    rerender(
      <FormGrid columns={4} data-cy="test-grid">
        <div>Test Content</div>
      </FormGrid>
    );
    
    grid = screen.getByTestId('test-grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('sm:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-4');

    rerender(
      <FormGrid columns={6} data-cy="test-grid">
        <div>Test Content</div>
      </FormGrid>
    );

    grid = screen.getByTestId('test-grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('sm:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-6');
  });

  it('applies correct gap classes based on gap prop', () => {
    const { rerender } = render(
      <FormGrid gap={4} data-cy="test-grid">
        <div>Test Content</div>
      </FormGrid>
    );
    
    let grid = screen.getByTestId('test-grid');
    expect(grid).toHaveClass('gap-4');
    
    rerender(
      <FormGrid gap={8} data-cy="test-grid">
        <div>Test Content</div>
      </FormGrid>
    );
    
    grid = screen.getByTestId('test-grid');
    expect(grid).toHaveClass('gap-8');

    rerender(
      <FormGrid gap={16} data-cy="test-grid">
        <div>Test Content</div>
      </FormGrid>
    );
    
    grid = screen.getByTestId('test-grid');
    expect(grid).toHaveClass('gap-16');
  });

  it('applies custom className', () => {
    render(
      <FormGrid className="custom-class" data-cy="test-grid">
        <div>Test Content</div>
      </FormGrid>
    );
    
    const grid = screen.getByTestId('test-grid');
    expect(grid).toHaveClass('custom-class');
  });

  it('uses default values when props are not provided', () => {
    render(
      <FormGrid data-cy="test-grid">
        <div>Test Content</div>
      </FormGrid>
    );
    
    const grid = screen.getByTestId('test-grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('gap-6');
  });
});