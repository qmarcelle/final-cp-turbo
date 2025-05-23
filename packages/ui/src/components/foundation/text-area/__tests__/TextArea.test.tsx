import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TextArea  } from '../../../foundation/TextArea/TextArea'
import '@testing-library/jest-dom'

describe('TextArea Component', () => {
  it('renders with basic props', () => {
    render(<TextArea name="comments" data-cy="comments-textarea" />)
    
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveAttribute('id', 'comments')
    expect(textarea).toHaveAttribute('data-cy', 'comments-textarea')
  })

  it('renders with label', () => {
    render(<TextArea name="comments" label="Comments" data-cy="comments-textarea" />)
    
    const label = screen.getByText('Comments')
    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', 'comments')
  })

  it('renders required label with asterisk', () => {
    render(<TextArea name="comments" label="Comments" required data-cy="comments-textarea" />)
    
    const label = screen.getByText('Comments')
    expect(label).toBeInTheDocument()
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('aria-required', 'true')
  })

  it('renders with description', () => {
    render(
      <TextArea 
        name="comments" 
        label="Comments" 
        description="Please provide your feedback" 
        data-cy="comments-textarea" 
      />
    )
    
    const description = screen.getByText('Please provide your feedback')
    expect(description).toBeInTheDocument()
  })

  it('renders with placeholder', () => {
    render(
      <TextArea 
        name="comments" 
        placeholder="Enter your comments here" 
        data-cy="comments-textarea" 
      />
    )
    
    const textarea = screen.getByPlaceholderText('Enter your comments here')
    expect(textarea).toBeInTheDocument()
  })

  it('accepts and displays initial value', () => {
    render(
      <TextArea 
        name="comments" 
        value="Initial comment" 
        data-cy="comments-textarea" 
      />
    )
    
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveValue('Initial comment')
  })

  it('handles user input', () => {
    const handleChange = jest.fn()
    
    render(
      <TextArea 
        name="comments" 
        onChange={handleChange} 
        data-cy="comments-textarea" 
      />
    )
    
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'Test input' } })
    
    expect(textarea).toHaveValue('Test input')
    expect(handleChange).toHaveBeenCalledWith('Test input')
  })

  it('calls onBlur when textarea loses focus', () => {
    const handleBlur = jest.fn()
    
    render(
      <TextArea 
        name="comments" 
        onBlur={handleBlur} 
        data-cy="comments-textarea" 
      />
    )
    
    const textarea = screen.getByRole('textbox')
    fireEvent.focus(textarea)
    fireEvent.blur(textarea)
    
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it('respects disabled state', () => {
    render(
      <TextArea 
        name="comments" 
        disabled 
        data-cy="comments-textarea" 
      />
    )
    
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeDisabled()
  })

  it('applies custom number of rows', () => {
    render(
      <TextArea 
        name="comments" 
        rows={8} 
        data-cy="comments-textarea" 
      />
    )
    
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('rows', '8')
  })

  it('applies non-resizable style when resize is false', () => {
    render(
      <TextArea 
        name="comments" 
        resize={false} 
        data-cy="comments-textarea" 
      />
    )
    
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('resize-none')
  })

  it('applies maxLength when specified', () => {
    render(
      <TextArea 
        name="comments" 
        maxLength={100} 
        data-cy="comments-textarea" 
      />
    )
    
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('maxLength', '100')
  })

  it('applies custom className', () => {
    render(
      <TextArea 
        name="comments" 
        className="custom-class" 
        data-cy="comments-textarea" 
      />
    )
    
    const wrapper = screen.getByRole('textbox').closest('div')
    expect(wrapper).toHaveClass('custom-class')
  })

  it('updates value when controlled value changes', () => {
    const { rerender } = render(
      <TextArea 
        name="comments" 
        value="Initial value" 
        data-cy="comments-textarea" 
      />
    )
    
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveValue('Initial value')
    
    rerender(
      <TextArea 
        name="comments" 
        value="Updated value" 
        data-cy="comments-textarea" 
      />
    )
    
    expect(textarea).toHaveValue('Updated value')
  })
}) 