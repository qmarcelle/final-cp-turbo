import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { FormLayout } from './FormLayout'

describe('FormLayout', () => {
  it('renders children correctly', () => {
    render(
      <FormLayout data-cy="test-layout">
        <div>Child 1</div>
        <div>Child 2</div>
      </FormLayout>
    )
    
    const layout = screen.getByTestId('test-layout')
    expect(layout).toBeInTheDocument()
    expect(layout).toHaveClass('grid')
    expect(layout.children).toHaveLength(2)
  })

  it('applies correct column classes based on columns prop', () => {
    const { rerender } = render(
      <FormLayout columns={2} data-cy="test-layout">
        <div>Test Content</div>
      </FormLayout>
    )
    
    let layout = screen.getByTestId('test-layout')
    expect(layout).toHaveClass('grid-cols-1')
    expect(layout).toHaveClass('sm:grid-cols-2')
    
    rerender(
      <FormLayout columns={4} data-cy="test-layout">
        <div>Test Content</div>
      </FormLayout>
    )
    
    layout = screen.getByTestId('test-layout')
    expect(layout).toHaveClass('grid-cols-1')
    expect(layout).toHaveClass('sm:grid-cols-2')
    expect(layout).toHaveClass('lg:grid-cols-4')
  })

  it('applies correct gap classes based on gap prop', () => {
    const { rerender } = render(
      <FormLayout gap={4} data-cy="test-layout">
        <div>Test Content</div>
      </FormLayout>
    )
    
    let layout = screen.getByTestId('test-layout')
    expect(layout).toHaveClass('gap-4')
    
    rerender(
      <FormLayout gap={8} data-cy="test-layout">
        <div>Test Content</div>
      </FormLayout>
    )
    
    layout = screen.getByTestId('test-layout')
    expect(layout).toHaveClass('gap-8')
  })

  it('applies correct variant styles', () => {
    const { rerender } = render(
      <FormLayout variant="column" data-cy="test-layout">
        <div>Test Content</div>
      </FormLayout>
    )
    
    let layout = screen.getByTestId('test-layout')
    expect(layout).toHaveClass('max-w-2xl')
    
    rerender(
      <FormLayout variant="inline" data-cy="test-layout">
        <div>Test Content</div>
      </FormLayout>
    )
    
    layout = screen.getByTestId('test-layout')
    expect(layout).toHaveClass('w-full')
  })

  it('applies custom className', () => {
    render(
      <FormLayout className="custom-class" data-cy="test-layout">
        <div>Test Content</div>
      </FormLayout>
    )
    
    const layout = screen.getByTestId('test-layout')
    expect(layout).toHaveClass('custom-class')
  })

  it('uses default values when props are not provided', () => {
    render(
      <FormLayout data-cy="test-layout">
        <div>Test Content</div>
      </FormLayout>
    )
    
    const layout = screen.getByTestId('test-layout')
    expect(layout).toHaveClass('grid-cols-1')
    expect(layout).toHaveClass('gap-6')
  })
}) 