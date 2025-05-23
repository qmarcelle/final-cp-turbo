import React from 'react';
import { FormStepper, Step } from './FormStepper';
import { z } from 'zod';
import { FieldValues } from 'react-hook-form';

// Define a simple schema for testing
const step1Schema = z.object({
  name: z.string().min(2, 'Name is required'),
});

const step2Schema = z.object({
  email: z.string().email('Valid email is required'),
});

// Combined schema for the full form
const testSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
});

type TestFormValues = z.infer<typeof testSchema>;

describe('FormStepper Component', () => {
  beforeEach(() => {
    // Reset any previous test state
  });

  it('renders the stepper with steps', () => {
    // Create test components for steps
    const Step1Component = ({ control }: { control: any }) => (
      <div data-cy="step1-content">Step 1 Content</div>
    );
    
    const Step2Component = ({ control }: { control: any }) => (
      <div data-cy="step2-content">Step 2 Content</div>
    );

    // Define steps matching the Step interface
    const steps: Step<FieldValues>[] = [
      {
        id: 'step1',
        title: 'Step 1',
        description: 'First step',
        component: Step1Component,
        schema: step1Schema,
      },
      {
        id: 'step2',
        title: 'Step 2',
        description: 'Second step',
        component: Step2Component,
        schema: step2Schema,
      },
    ];

    // Mount the component with standard mount (FormStepper creates its own form context)
    cy.mount(
      <FormStepper 
        steps={steps}
        data-cy="form-stepper"
      />
    );

    // Verify stepper renders with the correct steps
    cy.getByCy('form-stepper').should('exist');
    cy.contains('Step 1').should('exist');
    cy.contains('Step 2').should('exist');
    
    // First step should be visible
    cy.getByCy('step1-content').should('exist');
  });
}); 