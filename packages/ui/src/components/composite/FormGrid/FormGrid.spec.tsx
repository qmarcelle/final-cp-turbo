import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { FormGrid  } from '../FormGrid'

describe('FormGrid Component', () => {
  it('renders children correctly', () => {
    render(
      <FormGrid data-cy="test-grid">
        <div data-cy="first-child">First Child</div>
        <div data-cy="second-child">Second Child</div>
      </FormGrid>
    )
    
    // Check that the grid renders with children
    const grid = screen.getByTestId('test-grid')
    expect(grid.children.length).toBe(2)
  })

  it('applies correct column classes based on columns prop', () => {
    const { rerender } = render(
      <FormGrid columns={2} data-cy="test-grid">
        <div>Test Content</div>
      </FormGrid>
    )
    
    let grid = screen.getByTestId('test-grid')
    expect(grid.classList.contains('grid-cols-1')).toBe(true)
    expect(grid.classList.contains('sm:grid-cols-2')).toBe(true)
    
    rerender(
      <FormGrid columns={4} data-cy="test-grid">
        <div>Test Content</div>
      </FormGrid>
    )
    
    grid = screen.getByTestId('test-grid')
    expect(grid.classList.contains('grid-cols-1')).toBe(true)
    expect(grid.classList.contains('sm:grid-cols-2')).toBe(true)
    expect(grid.classList.contains('lg:grid-cols-4')).toBe(true)
  })

  it('applies correct gap classes based on gap prop', () => {
    const { rerender } = render(
      <FormGrid gap={4} data-cy="test-grid">
        <div>Test Content</div>
      </FormGrid>
    )
    
    let grid = screen.getByTestId('test-grid')
    expect(grid.classList.contains('gap-4')).toBe(true)
    
    rerender(
      <FormGrid gap={8} data-cy="test-grid">
        <div>Test Content</div>
      </FormGrid>
    )
    
    grid = screen.getByTestId('test-grid')
    expect(grid.classList.contains('gap-8')).toBe(true)
  })

  it('applies custom className', () => {
    render(
      <FormGrid className="custom-class" data-cy="test-grid">
        <div>Test Content</div>
      </FormGrid>
    )
    
    const grid = screen.getByTestId('test-grid')
    expect(grid.classList.contains('custom-class')).toBe(true)
  })

  it('uses default values when props are not provided', () => {
    render(
      <FormGrid data-cy="test-grid">
        <div>Test Content</div>
      </FormGrid>
    )
    
    const grid = screen.getByTestId('test-grid')
    expect(grid.classList.contains('grid-cols-1')).toBe(true)
    expect(grid.classList.contains('gap-6')).toBe(true)
  })
}) 