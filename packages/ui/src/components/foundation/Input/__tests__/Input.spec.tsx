import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Input } from '../index'

describe('Input Component', () => {
  it('renders with basic props', () => {
    render(<Input name="test" label="Test Label" data-cy="test-input" />)
    const input = screen.getByLabelText('Test Label')
    expect(input).toBeInTheDocument()
  })

  it('handles value changes', () => {
    render(<Input name="test" label="Test Label" data-cy="test-input" />)
    const input = screen.getByLabelText('Test Label')
    
    fireEvent.change(input, { target: { value: 'test value' } })
    
    expect(input).toHaveValue('test value')
  })

  it('handles disabled state', () => {
    render(<Input name="test" label="Test Label" disabled data-cy="test-input" />)
    const input = screen.getByLabelText('Test Label')
    expect(input).toBeDisabled()
  })

  it('applies custom className', () => {
    render(<Input name="test" label="Test Label" className="custom-class" data-cy="test-input" />)
    const input = screen.getByLabelText('Test Label')
    expect(input).toHaveClass('custom-class')
  })

  it('handles help text display', () => {
    render(<Input name="test" label="Test Label" hint="This is help text" data-cy="test-input" />)
    const helpText = screen.getByText('This is help text')
    expect(helpText).toBeInTheDocument()
  })

  it('handles hint text display', () => {
    render(<Input name="test" label="Test Label" hint="This is hint text" data-cy="test-input" />)
    const hintText = screen.getByText('This is hint text')
    expect(hintText).toBeInTheDocument()
  })

  it('shows error message when error prop is provided', () => {
    const { container } = render(
      <Input 
        name="test" 
        label="Test Label" 
        error={true}
        errorMessage="This is an error message" 
        data-cy="test-input" 
      />
    )
    
    // Debug the DOM structure
    console.log(container.innerHTML)
    
    // Look for the error message text directly
    const errorElement = screen.getByText('This is an error message')
    expect(errorElement).toBeInTheDocument()
    expect(errorElement).toHaveAttribute('data-cy', 'test-input-error')
  })
}) 