import React from 'react'
import { render, screen, renderHook } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormProvider  } from '../FormContext'
import { useForm, FormProvider as RHFFormProvider, useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import '@testing-library/jest-dom'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
})

type FormData = z.infer<typeof schema>

// Test component that uses form context
const TestForm = () => {
  // Use the methods directly from react-hook-form
  const { register, formState: { errors } } = useFormContext<FormData>()
  
  return (
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register('name')}
          data-cy="name-input"
        />
        {errors.name && (
          <span data-cy="name-error">{errors.name.message}</span>
        )}
      </div>
      
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          data-cy="email-input"
        />
        {errors.email && (
          <span data-cy="email-error">{errors.email.message}</span>
        )}
      </div>
      
      <button type="submit" data-cy="submit-button">
        Submit
      </button>
    </form>
  )
}

// Wrapper component with the form setup
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '' }
  })
  
  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  )
}

describe('FormContext', () => {
  it('provides form context to child components', () => {
    render(
      <TestWrapper>
        <TestForm />
      </TestWrapper>
    )
    
    // Use query selectors to avoid testing-library matcher issues
    const nameInput = screen.getByRole('textbox', { name: 'Name' })
    const emailInput = screen.getByRole('textbox', { name: 'Email' })
    
    expect(nameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
  })

  it('handles form validation', async () => {
    render(
      <TestWrapper>
        <TestForm />
      </TestWrapper>
    )
    
    // Submit without filling required fields
    const user = userEvent.setup()
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    await user.click(submitButton)
    
    // Check for validation errors
    const errorElement = screen.getByText('Name is required')
    expect(errorElement).toBeInTheDocument()
  })

  it('validates email format', async () => {
    render(
      <TestWrapper>
        <TestForm />
      </TestWrapper>
    )
    
    // Enter invalid email
    const user = userEvent.setup()
    const emailInput = screen.getByRole('textbox', { name: 'Email' })
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    
    await user.type(emailInput, 'invalid-email')
    await user.click(submitButton)
    
    // Check for validation error
    const errorElement = screen.getByText('Invalid email')
    expect(errorElement).toBeInTheDocument()
  })

  it('allows valid form submission', async () => {
    // Create a mockable form wrapper with an onSubmit handler
    const handleSubmit = jest.fn()
    
    const TestFormWithSubmit = () => {
      const { register, formState: { errors }, handleSubmit: formHandleSubmit } = useFormContext<FormData>()
      
      return (
        <form onSubmit={formHandleSubmit(handleSubmit)}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              {...register('name')}
              data-cy="name-input"
            />
            {errors.name && (
              <span data-cy="name-error">{errors.name.message}</span>
            )}
          </div>
          
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              data-cy="email-input"
            />
            {errors.email && (
              <span data-cy="email-error">{errors.email.message}</span>
            )}
          </div>
          
          <button type="submit" data-cy="submit-button">
            Submit
          </button>
        </form>
      )
    }
    
    render(
      <TestWrapper>
        <TestFormWithSubmit />
      </TestWrapper>
    )
    
    // Fill in valid data
    const user = userEvent.setup()
    const nameInput = screen.getByRole('textbox', { name: 'Name' })
    const emailInput = screen.getByRole('textbox', { name: 'Email' })
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.click(submitButton)
    
    // Verify that handleSubmit was called with correct data
    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'John Doe',
        email: 'john@example.com'
      }),
      expect.anything()
    )
    
    // No validation errors should be present
    const nameErrorElement = screen.queryByText('Name is required')
    const emailErrorElement = screen.queryByText('Invalid email')
    
    expect(nameErrorElement).not.toBeInTheDocument()
    expect(emailErrorElement).not.toBeInTheDocument()
  })
}) 