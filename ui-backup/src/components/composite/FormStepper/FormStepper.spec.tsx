import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { FormStepper, Step  } from '.'
import { z } from 'zod'
import { FormGroup  } from '../FormGroup'
import { Input  } from '../../foundation/Input'

type FormData = {
  name: string
  city: string
  confirm?: boolean
}

const mockSteps: Step<FormData>[] = [
  {
    id: 'step1',
    title: 'Step 1',
    description: 'First step',
    schema: z.object({ name: z.string() }),
    component: (
      <FormGroup name="name" label="Name">
        <Input data-cy="name-input" />
      </FormGroup>
    ),
  },
  {
    id: 'step2',
    title: 'Step 2',
    description: 'Second step',
    schema: z.object({ city: z.string() }),
    component: (
      <FormGroup name="city" label="City">
        <Input data-cy="city-input" />
      </FormGroup>
    ),
  },
  {
    id: 'step3',
    title: 'Step 3',
    description: 'Third step',
    schema: z.object({ confirm: z.boolean().optional() }),
    component: <div>Step 3 Content</div>,
    isOptional: true,
  },
]

describe('FormStepper Component', () => {
  it('renders all steps', () => {
    render(
      <FormStepper<FormData>
        steps={mockSteps}
        data-cy="test-stepper"
      />
    )
    
    mockSteps.forEach((step) => {
      const stepElement = screen.getByText(step.title)
      expect(stepElement).toBeInTheDocument()
    })
  })

  it('shows first step content by default', () => {
    render(
      <FormStepper<FormData>
        steps={mockSteps}
        data-cy="test-stepper"
      />
    )
    
    const nameInput = screen.getByTestId('name-input')
    expect(nameInput).toBeInTheDocument()
  })

  it('navigates to next step when clicking next button', async () => {
    render(
      <FormStepper<FormData>
        steps={mockSteps}
        data-cy="test-stepper"
      />
    )
    
    const nextButton = screen.getByText('Next')
    await fireEvent.click(nextButton)
    
    const cityInput = screen.getByTestId('city-input')
    expect(cityInput).toBeInTheDocument()
  })

  it('navigates to previous step when clicking back button', () => {
    render(
      <FormStepper<FormData>
        steps={mockSteps}
        currentStep={1}
        data-cy="test-stepper"
      />
    )
    
    const backButton = screen.getByText('Back')
    fireEvent.click(backButton)
    
    const nameInput = screen.getByTestId('name-input')
    expect(nameInput).toBeInTheDocument()
  })

  it('shows complete button on last step', () => {
    render(
      <FormStepper<FormData>
        steps={mockSteps}
        currentStep={2}
        data-cy="test-stepper"
      />
    )
    
    const completeButton = screen.getByText('Complete')
    expect(completeButton).toBeInTheDocument()
  })

  it('calls onComplete when clicking complete on last step', () => {
    const handleComplete = jest.fn()
    render(
      <FormStepper<FormData>
        steps={mockSteps}
        currentStep={2}
        onComplete={handleComplete}
        data-cy="test-stepper"
      />
    )
    
    const completeButton = screen.getByText('Complete')
    fireEvent.click(completeButton)
    
    expect(handleComplete).toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(
      <FormStepper<FormData>
        steps={mockSteps}
        className="custom-class"
        data-cy="test-stepper"
      />
    )
    
    const stepper = screen.getByTestId('test-stepper')
    expect(stepper).toHaveClass('custom-class')
  })
}) 