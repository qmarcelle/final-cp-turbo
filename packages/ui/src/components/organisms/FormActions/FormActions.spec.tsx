import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { FormActions  } from '../FormActions'
import { FormButton  } from '../FormButton'

describe('FormActions Component', () => {
  it('renders children correctly', () => {
    render(
      <FormActions data-cy="test-actions">
        <FormButton data-cy="cancel-btn">Cancel</FormButton>
        <FormButton data-cy="submit-btn">Submit</FormButton>
      </FormActions>
    )
    
    const cancelBtn = screen.getByTestId('cancel-btn')
    const submitBtn = screen.getByTestId('submit-btn')
    
    expect(cancelBtn).toBeInTheDocument()
    expect(submitBtn).toBeInTheDocument()
  })

  it('applies correct alignment classes based on align prop', () => {
    const { rerender } = render(
      <FormActions align="left" data-cy="test-actions">
        <FormButton>Test Button</FormButton>
      </FormActions>
    )
    
    let actions = screen.getByTestId('test-actions')
    expect(actions).toHaveClass('justify-start')
    
    rerender(
      <FormActions align="center" data-cy="test-actions">
        <FormButton>Test Button</FormButton>
      </FormActions>
    )
    
    actions = screen.getByTestId('test-actions')
    expect(actions).toHaveClass('justify-center')
    
    rerender(
      <FormActions align="right" data-cy="test-actions">
        <FormButton>Test Button</FormButton>
      </FormActions>
    )
    
    actions = screen.getByTestId('test-actions')
    expect(actions).toHaveClass('justify-end')
    
    rerender(
      <FormActions align="between" data-cy="test-actions">
        <FormButton>Test Button</FormButton>
      </FormActions>
    )
    
    actions = screen.getByTestId('test-actions')
    expect(actions).toHaveClass('justify-between')
  })

  it('applies custom className', () => {
    render(
      <FormActions className="custom-class" data-cy="test-actions">
        <FormButton>Test Button</FormButton>
      </FormActions>
    )
    
    const actions = screen.getByTestId('test-actions')
    expect(actions).toHaveClass('custom-class')
  })

  it('uses default alignment when align prop is not provided', () => {
    render(
      <FormActions data-cy="test-actions">
        <FormButton>Test Button</FormButton>
      </FormActions>
    )
    
    const actions = screen.getByTestId('test-actions')
    expect(actions).toHaveClass('justify-end')
  })

  it('handles button clicks correctly', () => {
    const handleCancel = jest.fn()
    const handleSubmit = jest.fn()
    
    render(
      <FormActions data-cy="test-actions">
        <FormButton data-cy="cancel-btn" onClick={handleCancel}>
          Cancel
        </FormButton>
        <FormButton data-cy="submit-btn" onClick={handleSubmit}>
          Submit
        </FormButton>
      </FormActions>
    )
    
    const cancelBtn = screen.getByTestId('cancel-btn')
    const submitBtn = screen.getByTestId('submit-btn')
    
    fireEvent.click(cancelBtn)
    fireEvent.click(submitBtn)
    
    expect(handleCancel).toHaveBeenCalledTimes(1)
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
}) 