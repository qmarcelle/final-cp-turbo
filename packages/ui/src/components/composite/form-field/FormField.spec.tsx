import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { FormField } from './FormField'

describe('FormField', () => {
  it('renders children correctly', () => {
    render(
      <FormField data-cy="test-field">
        <input type="text" data-cy="test-input" />
      </FormField>
    )
    
    const field = screen.getByTestId('test-field')
    const input = screen.getByTestId('test-input')
    expect(field).toBeInTheDocument()
    expect(input).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    render(
      <FormField label="Test Label" data-cy="test-field">
        <input type="text" />
      </FormField>
    )
    
    const label = screen.getByText('Test Label')
    expect(label).toBeInTheDocument()
  })

  it('shows required indicator when required prop is true', () => {
    render(
      <FormField label="Test Label" required data-cy="test-field">
        <input type="text" />
      </FormField>
    )
    
    const label = screen.getByText('Test Label')
    expect(label.parentElement).toHaveClass('after:content-["*"]')
  })

  it('renders description when provided', () => {
    render(
      <FormField 
        label="Test Label" 
        description="Test Description"
        data-cy="test-field"
      >
        <input type="text" />
      </FormField>
    )
    
    const description = screen.getByText('Test Description')
    expect(description).toBeInTheDocument()
  })

  it('renders error message when provided', () => {
    render(
      <FormField 
        label="Test Label" 
        error="Test Error"
        data-cy="test-field"
      >
        <input type="text" />
      </FormField>
    )
    
    const error = screen.getByText('Test Error')
    expect(error).toBeInTheDocument()
    expect(error).toHaveClass('text-red-500')
  })

  it('applies custom classNames', () => {
    render(
      <FormField 
        label="Test Label" 
        className="custom-field"
        labelClassName="custom-label"
        descriptionClassName="custom-description"
        errorClassName="custom-error"
        error="Test Error"
        description="Test Description"
        data-cy="test-field"
      >
        <input type="text" />
      </FormField>
    )
    
    const field = screen.getByTestId('test-field')
    const label = screen.getByText('Test Label')
    const description = screen.getByText('Test Description')
    const error = screen.getByText('Test Error')
    
    expect(field).toHaveClass('custom-field')
    expect(label.parentElement).toHaveClass('custom-label')
    expect(description).toHaveClass('custom-description')
    expect(error).toHaveClass('custom-error')
  })
}) 