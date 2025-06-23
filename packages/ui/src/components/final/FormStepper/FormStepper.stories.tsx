import type { Meta, StoryObj } from '@storybook/react';
import { FormStepper } from './FormStepper';
import { Button } from '../Button/Button';
import { useState } from 'react';

const meta = {
  title: '🦠 Organisms/FormStepper',
  component: FormStepper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Form Stepper

A component for breaking down complex forms into manageable steps with progress tracking.

## Features
- Step progress tracking
- Navigation controls
- Step validation
- Conditional steps
- Progress persistence
- Mobile responsive
- Accessibility support

## Usage

\`\`\`tsx
import { FormStepper } from '@portals/ui';

function MyForm() {
  const steps = [
    { title: 'Account', component: <AccountForm /> },
    { title: 'Profile', component: <ProfileForm /> },
    { title: 'Review', component: <ReviewStep /> },
  ];

  return (
    <FormStepper
      steps={steps}
      onComplete={handleComplete}
    />
  );
}
\`\`\`
`
      }
    }
  },
  argTypes: {
    currentStep: {
      control: 'number',
      description: 'Current active step index',
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
    },
    showStepNumbers: {
      control: 'boolean',
      description: 'Show step numbers',
    },
  },
} satisfies Meta<typeof FormStepper>;

export default meta;
type Story = StoryObj<typeof FormStepper>;

const steps = [
  {
    title: 'Account Details',
    description: 'Basic account information',
    content: (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full rounded-md border p-2"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full rounded-md border p-2"
            placeholder="Create a password"
          />
        </div>
      </div>
    ),
  },
  {
    title: 'Personal Information',
    description: 'Tell us about yourself',
    content: (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            className="w-full rounded-md border p-2"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            className="w-full rounded-md border p-2"
            placeholder="Enter your phone number"
          />
        </div>
      </div>
    ),
  },
  {
    title: 'Preferences',
    description: 'Set your preferences',
    content: (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Communication Preferences
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Email notifications
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              SMS notifications
            </label>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Review',
    description: 'Review your information',
    content: (
      <div className="space-y-4">
        <div className="rounded-lg bg-gray-50 p-4">
          <h4 className="font-medium mb-2">Summary</h4>
          <p className="text-sm text-gray-600">
            Please review your information before submitting.
          </p>
        </div>
      </div>
    ),
  },
];

const StepperTemplate = (args: any) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="w-[600px]">
      <FormStepper
        {...args}
        currentStep={currentStep}
        steps={steps}
        onStepChange={setCurrentStep}
      >
        {steps[currentStep].content}
        <div className="flex justify-between mt-6">
          <Button
            variant="secondary"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            variant="primary"
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
          >
            {currentStep === steps.length - 2 ? 'Review' : 'Next'}
          </Button>
        </div>
      </FormStepper>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <StepperTemplate {...args} />,
};

export const Vertical: Story = {
  render: (args) => (
    <StepperTemplate {...args} orientation="vertical" />
  ),
};

export const WithStepNumbers: Story = {
  render: (args) => (
    <StepperTemplate {...args} showStepNumbers />
  ),
};

export const WithCustomIcons: Story = {
  render: (args) => (
    <StepperTemplate
      {...args}
      icons={{
        pending: '○',
        current: '●',
        completed: '✓',
      }}
    />
  ),
};