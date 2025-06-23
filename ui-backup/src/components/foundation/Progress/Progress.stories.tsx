import type { Meta, StoryObj } from '@storybook/react'
import { Progress, CircularProgress, StepProgress } from './Progress'
import { useState, useEffect } from 'react'

const meta: Meta<typeof Progress> = {
  title: '⚛️ Foundation/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Progress Indicators

A collection of versatile progress indicators, including linear, circular, and step-based components, designed to provide clear feedback on system processes and user workflows.

## Features
- **Linear Progress**: Standard horizontal bar for straightforward progress tracking.
- **Circular Progress**: A visually engaging circular indicator for tasks like loading or displaying stats.
- **Step Progress**: A multi-step indicator ideal for guiding users through sequential processes.
- **Customizable**: Control variants, sizes, and labels to fit your specific UI needs.
- **Accessible**: Built with ARIA attributes to ensure an inclusive user experience.

## When to Use
- **Linear**: Use for determinate processes like file uploads, downloads, or form submissions.
- **Circular**: Ideal for displaying loading states, user stats (e.g., profile completion), or system health.
- **Step**: Use for multi-stage forms, onboarding flows, or any sequential task.

## Accessibility
- All progress components use the \`role="progressbar"\` attribute.
- \`aria-valuenow\`, \`aria-valuemin\`, and \`aria-valuemax\` are used to convey progress to screen readers.
- For indeterminate states, ARIA attributes are managed to indicate ongoing activity without a specific value.
- Ensure that progress indicators are accompanied by a descriptive label.
`,
      },
    },
  },
  tags: ['foundation', 'stable', 'autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'The current progress value, from 0 to 100.',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'The visual style of the progress indicator.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'The size of the progress indicator.',
    },
    showPercentage: {
      control: 'boolean',
      description: 'Toggles the visibility of the percentage text.',
    },
    animated: {
      control: 'boolean',
      description: 'Applies a subtle animation to the progress bar.',
    },
    indeterminate: {
      control: 'boolean',
      description: 'For loading states where the progress is unknown.',
    },
    label: {
      control: 'text',
      description: 'A descriptive label for the progress indicator.',
    },
  },
}

export default meta
type Story = StoryObj<typeof Progress>

// Default linear progress
export const Default: Story = {
  args: {
    value: 50,
    showPercentage: true,
  },
}

// All variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <p className="text-sm font-medium mb-2">Default</p>
        <Progress value={60} variant="default" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Success</p>
        <Progress value={100} variant="success" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Warning</p>
        <Progress value={75} variant="warning" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Error</p>
        <Progress value={30} variant="error" />
      </div>
    </div>
  ),
}

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <p className="text-sm font-medium mb-2">Small</p>
        <Progress value={50} size="sm" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Medium (Default)</p>
        <Progress value={50} size="md" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Large</p>
        <Progress value={50} size="lg" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Extra Large</p>
        <Progress value={50} size="xl" />
      </div>
    </div>
  ),
}

// With labels and percentages
export const WithLabels: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Progress value={25} label="Uploading files..." showPercentage />
      <Progress
        value={60}
        label="Processing data..."
        showPercentage
        variant="warning"
      />
      <Progress
        value={100}
        label="Complete!"
        showPercentage
        variant="success"
      />
    </div>
  ),
}

// Animated progress
export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
      const timer = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0
          return prev + 10
        })
      }, 500)

      return () => window.clearInterval(timer)
    }, [])

    return (
      <div className="w-80">
        <Progress value={progress} label="Animated Progress" showPercentage />
      </div>
    )
  },
}

// Indeterminate loading
export const Indeterminate: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Progress indeterminate label="Loading..." />
      <Progress indeterminate variant="success" label="Processing..." />
    </div>
  ),
}

// Circular progress
export const CircularProgressStory: Story = {
  render: () => (
    <div className="flex gap-8">
      <CircularProgress value={25} />
      <CircularProgress value={50} variant="warning" />
      <CircularProgress value={75} variant="success" />
      <CircularProgress value={100} variant="error" />
    </div>
  ),
}

// Circular with different sizes
export const CircularSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <CircularProgress value={60} size={80} strokeWidth={6} />
      <CircularProgress value={60} size={120} strokeWidth={8} />
      <CircularProgress value={60} size={160} strokeWidth={10} />
    </div>
  ),
}

// Step progress
export const StepProgressStory: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1)
    const steps = ['Account Info', 'Verification', 'Payment', 'Complete']

    return (
      <div className="space-y-6">
        <StepProgress
          currentStep={currentStep}
          totalSteps={steps.length}
          steps={steps}
        />

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            className="px-3 py-1 text-sm border rounded"
            disabled={currentStep === 0}
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
            }
            className="px-3 py-1 text-sm border rounded"
            disabled={currentStep === steps.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    )
  },
}

// Vertical step progress
export const VerticalStepProgress: Story = {
  render: () => (
    <StepProgress
      currentStep={2}
      totalSteps={4}
      steps={['Start', 'In Progress', 'Review', 'Complete']}
      orientation="vertical"
    />
  ),
}

// Real-world examples
export const Examples: Story = {
  render: () => (
    <div className="space-y-8 max-w-md">
      {/* File upload progress */}
      <div className="space-y-2">
        <h3 className="font-semibold">File Upload</h3>
        <Progress value={85} label="document.pdf" showPercentage size="sm" />
        <Progress
          value={45}
          label="image.jpg"
          showPercentage
          size="sm"
          variant="warning"
        />
        <Progress
          value={100}
          label="spreadsheet.xlsx"
          showPercentage
          size="sm"
          variant="success"
        />
      </div>

      {/* System status */}
      <div className="space-y-4">
        <h3 className="font-semibold">System Status</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <CircularProgress
              value={78}
              size={100}
              label="CPU"
              variant="success"
            />
          </div>
          <div className="text-center">
            <CircularProgress
              value={92}
              size={100}
              label="Memory"
              variant="warning"
            />
          </div>
        </div>
      </div>

      {/* Multi-step form */}
      <div>
        <h3 className="font-semibold mb-4">Registration Process</h3>
        <StepProgress
          currentStep={1}
          totalSteps={3}
          steps={['Personal Info', 'Address', 'Confirmation']}
          size="lg"
        />
      </div>
    </div>
  ),
}

// Real-world examples
export const HealthcareExamples: Story = {
  name: 'Healthcare Use Cases',
  render: () => (
    <div className="space-y-8 max-w-lg">
      {/* Patient Onboarding Progress */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Patient Onboarding</h3>
        <p className="text-sm text-tertiary-gray3">Track completion of a new patient's registration process.</p>
        <StepProgress
          currentStep={2}
          totalSteps={4}
          steps={['Personal Info', 'Insurance Details', 'Medical History', 'Confirmation']}
          size="lg"
        />
      </div>

      {/* Claim Submission Status */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Claim Submission Status</h3>
        <p className="text-sm text-tertiary-gray3">Show the status of a submitted medical claim.</p>
        <Progress value={66} label="Claim #12345 processing" showPercentage variant="warning" />
        <Progress value={100} label="Claim #12344 approved" showPercentage variant="success" />
      </div>

      {/* Health Assessment Completion */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Health Assessment</h3>
        <p className="text-sm text-tertiary-gray3">Visualize how complete a patient's health assessment is.</p>
        <div className="flex items-center justify-center gap-8">
          <CircularProgress
            value={85}
            size={120}
            strokeWidth={8}
            label="Profile Complete"
            variant="success"
          />
           <CircularProgress
            value={40}
            size={100}
            strokeWidth={6}
            label="Pending Lab Results"
            variant="warning"
          />
        </div>
      </div>
    </div>
  ),
};

// Playground
export const Playground: Story = {
  args: {
    value: 50,
    variant: 'default',
    size: 'md',
    showPercentage: true,
    animated: true,
    label: 'Progress Label',
  },
}
