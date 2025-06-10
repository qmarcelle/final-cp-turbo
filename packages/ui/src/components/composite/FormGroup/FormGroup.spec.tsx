import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { FormGroup } from './FormGroup'
import { Input  } from '../../foundation/Input/Input'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const schema = z.object({
    test: z.string(),
  })
  const form = useForm({
    defaultValues: {
      test: '',
    },
  })
  return <FormProvider {...form}>{children}</FormProvider>
}

describe('FormGroup Component', () => {
  it('renders children correctly', () => {
    render(
      <TestWrapper>
        <FormGroup data-cy="test-group">
          <Input name="test" />
        </FormGroup>
      </TestWrapper>
    )
    
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('renders label and description', () => {
    render(
      <TestWrapper>
        <FormGroup label="Test Label" description="Test Description" data-cy="test-group">
          <Input name="test" />
        </FormGroup>
      </TestWrapper>
    )
    
    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('shows required indicator when required is true', () => {
    render(
      <TestWrapper>
        <FormGroup label="Test Label" required data-cy="test-group">
          <Input name="test" />
        </FormGroup>
      </TestWrapper>
    )
    
    const label = screen.getByText('Test Label').closest('span')
    expect(label).toHaveClass('after:text-red-500')
  })

  it('applies custom className', () => {
    render(
      <TestWrapper>
        <FormGroup label="Test Label" className="custom-class">
          <Input name="test" />
        </FormGroup>
      </TestWrapper>
    )
    
    const group = screen.getByText('Test Label').closest('div')
    expect(group).toHaveClass('form-control')
    expect(group).toHaveClass('w-full')
    expect(group).toHaveClass('custom-class')
  })

  it('displays error message when error prop is provided', () => {
    render(
      <TestWrapper>
        <FormGroup error="Test Error" data-cy="test-group">
          <Input name="test" />
        </FormGroup>
      </TestWrapper>
    )
    
    expect(screen.getByText('Test Error')).toBeInTheDocument()
  })

  it('renders without label when label prop is not provided', () => {
    render(
      <TestWrapper>
        <FormGroup data-cy="test-group">
          <Input name="test" />
        </FormGroup>
      </TestWrapper>
    )
    
    const labelElement = screen.queryByRole('label')
    expect(labelElement).not.toBeInTheDocument()
  })

  it('renders without description when description prop is not provided', () => {
    render(
      <TestWrapper>
        <FormGroup data-cy="test-group">
          <Input name="test" />
        </FormGroup>
      </TestWrapper>
    )
    
    const descriptionElement = screen.queryByText(/description/i)
    expect(descriptionElement).not.toBeInTheDocument()
  })

  it('maintains proper spacing with mt-2 class on children wrapper', () => {
    render(
      <TestWrapper>
        <FormGroup data-cy="test-group">
          <Input name="test" />
        </FormGroup>
      </TestWrapper>
    )
    
    const childrenWrapper = screen.getByRole('textbox').closest('div')?.parentElement?.parentElement
    expect(childrenWrapper).toHaveClass('mt-2')
  })
}) 