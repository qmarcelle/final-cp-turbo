import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { FormSection  } from '../FormSection'
import { FormGroup  } from '../FormGroup'
import { Input  } from '../../foundation/Input'

describe('FormSection Component', () => {
  it('renders title and description', () => {
    render(
      <FormSection
        title="Test Title"
        description="Test Description"
        data-cy="test-section"
      >
        <div>Test Content</div>
      </FormSection>
    )
    
    const title = screen.getByTestId('test-section-title')
    const description = screen.getByTestId('test-section-description')
    
    expect(title).toHaveTextContent('Test Title')
    expect(description).toHaveTextContent('Test Description')
  })

  it('renders children correctly', () => {
    render(
      <FormSection
        title="Test Title"
        data-cy="test-section"
      >
        <FormGroup label="Test Label" data-cy="test-group">
          <Input data-cy="test-input" />
        </FormGroup>
      </FormSection>
    )
    
    const group = screen.getByTestId('test-group')
    const input = screen.getByTestId('test-input')
    
    expect(group).toBeInTheDocument()
    expect(input).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <FormSection
        title="Test Title"
        className="custom-class"
        data-cy="test-section"
      >
        <div>Test Content</div>
      </FormSection>
    )
    
    const section = screen.getByTestId('test-section')
    expect(section).toHaveClass('custom-class')
  })

  it('renders without description', () => {
    render(
      <FormSection
        title="Test Title"
        data-cy="test-section"
      >
        <div>Test Content</div>
      </FormSection>
    )
    
    const title = screen.getByTestId('test-section-title')
    const description = screen.queryByTestId('test-section-description')
    
    expect(title).toBeInTheDocument()
    expect(description).not.toBeInTheDocument()
  })
}) 