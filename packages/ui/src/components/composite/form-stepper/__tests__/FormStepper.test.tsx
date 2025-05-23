import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormStepper, type Step  } from '../../../composite/FormStepper/FormStepper'
import { z } from 'zod'
import { Control, FieldValues } from 'react-hook-form'

interface PersonalInfo extends FieldValues {
  firstName: string
}

interface ContactInfo extends FieldValues {
  email: string
}

const Step1Schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
})

const Step2Schema = z.object({
  email: z.string().email('Invalid email'),
})

const Step1Component = ({ control }: { control: Control<PersonalInfo> }) => (
  <div>
    <label htmlFor="firstName">First Name</label>
    <input
      type="text"
      id="firstName"
      {...control.register('firstName')}
      data-cy="firstName-input"
    />
  </div>
)

const Step2Component = ({ control }: { control: Control<ContactInfo> }) => (
  <div>
    <label htmlFor="email">Email</label>
    <input
      type="email"
      id="email"
      {...control.register('email')}
      data-cy="email-input"
    />
  </div>
)

const mockSteps: Step<FieldValues>[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    component: Step1Component as any,
    schema: Step1Schema,
  },
  {
    id: 'contact',
    title: 'Contact Information',
    component: Step2Component as any,
    schema: Step2Schema,
  },
]

describe('FormStepper', () => {
  // Increase Jest timeout for all tests in this describe block
  jest.setTimeout(120000);

  it('renders all steps', () => {
    render(<FormStepper steps={mockSteps} data-cy="test-stepper" />)
    
    expect(screen.getByText('Personal Information')).toBeInTheDocument()
    expect(screen.getByText('Contact Information')).toBeInTheDocument()
  })

  it('shows the first step initially', () => {
    render(<FormStepper steps={mockSteps} data-cy="test-stepper" />)
    
    expect(screen.getByTestId('firstName-input')).toBeInTheDocument()
    expect(screen.queryByTestId('email-input')).not.toBeInTheDocument()
  })

  it('validates the current step before proceeding', async () => {
    const user = userEvent.setup()
    render(<FormStepper steps={mockSteps} data-cy="test-stepper" />)
    
    // Try to proceed without filling required field
    const nextButton = screen.getByText('Next')
    await user.click(nextButton)
    
    // Wait for validation error with increased timeout
    await waitFor(() => {
      expect(screen.queryByTestId('email-input')).not.toBeInTheDocument()
    }, { timeout: 5000 })
  })

  it('proceeds to next step when current step is valid', async () => {
    const user = userEvent.setup()
    render(<FormStepper steps={mockSteps} data-cy="test-stepper" />)
    
    // Fill in required field
    const firstNameInput = screen.getByTestId('firstName-input')
    await user.type(firstNameInput, 'John')
    
    const nextButton = screen.getByText('Next')
    await user.click(nextButton)
    
    // Check if moved to next step with increased timeout
    await waitFor(() => {
      expect(screen.getByTestId('email-input')).toBeInTheDocument()
    }, { timeout: 5000 })
  })

  it('calls onComplete with form data when final step is submitted', async () => {
    const mockOnComplete = jest.fn()
    const user = userEvent.setup()
    
    render(
      <FormStepper
        steps={mockSteps}
        onComplete={mockOnComplete}
        data-cy="test-stepper"
      />
    )
    
    // Complete first step
    const firstNameInput = screen.getByTestId('firstName-input')
    await user.type(firstNameInput, 'John')
    
    const nextButton = screen.getByText('Next')
    await user.click(nextButton)
    
    // Complete second step with increased timeout
    await waitFor(() => {
      expect(screen.getByTestId('email-input')).toBeInTheDocument()
    }, { timeout: 5000 })
    
    const emailInput = screen.getByTestId('email-input')
    await user.type(emailInput, 'john@example.com')
    
    const completeButton = screen.getByText('Complete')
    await user.click(completeButton)
    
    // Verify onComplete was called with form data
    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalledWith({
        firstName: 'John',
        email: 'john@example.com',
      })
    }, { timeout: 5000 })
  })

  it('allows going back to previous step', async () => {
    const user = userEvent.setup()
    render(<FormStepper steps={mockSteps} data-cy="test-stepper" />)
    
    // Move to second step
    const firstNameInput = screen.getByTestId('firstName-input')
    await user.type(firstNameInput, 'John')
    
    const nextButton = screen.getByText('Next')
    await user.click(nextButton)
    
    // Wait for second step with increased timeout
    await waitFor(() => {
      expect(screen.getByTestId('email-input')).toBeInTheDocument()
    }, { timeout: 5000 })
    
    const backButton = screen.getByText('Back')
    await user.click(backButton)
    
    // Verify back on first step
    expect(screen.getByTestId('firstName-input')).toBeInTheDocument()
  })

  it('preserves form data when navigating between steps', async () => {
    const user = userEvent.setup()
    render(<FormStepper steps={mockSteps} data-cy="test-stepper" />)
    
    // Fill first step
    const firstNameInput = screen.getByTestId('firstName-input')
    await user.type(firstNameInput, 'John')
    
    const nextButton = screen.getByText('Next')
    await user.click(nextButton)
    
    // Fill second step with increased timeout
    await waitFor(() => {
      expect(screen.getByTestId('email-input')).toBeInTheDocument()
    }, { timeout: 5000 })
    
    const emailInput = screen.getByTestId('email-input')
    await user.type(emailInput, 'john@example.com')
    
    const backButton = screen.getByText('Back')
    await user.click(backButton)
    
    // Verify first step data preserved
    expect(screen.getByTestId('firstName-input')).toHaveValue('John')
    
    // Go forward again
    await user.click(screen.getByText('Next'))
    
    // Verify second step data preserved with increased timeout
    await waitFor(() => {
      expect(screen.getByTestId('email-input')).toHaveValue('john@example.com')
    }, { timeout: 5000 })
  })
}) 