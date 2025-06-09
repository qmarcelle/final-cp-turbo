import type { Meta, StoryObj } from '@storybook/react'
import { Progress, CircularProgress, StepProgress } from './Progress'
import { useState, useEffect } from 'react'

const meta: Meta<typeof Progress> = {
  title: '⚛️ Atoms/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Progress Component

A comprehensive progress component with linear, circular, and step variants.

## Features
- **Linear Progress**: Standard horizontal progress bar
- **Circular Progress**: Circular progress indicator
- **Step Progress**: Multi-step workflow indicator
- **Variants**: Different visual styles for different states
- **Sizes**: Multiple size options
- **Accessibility**: Full ARIA support

## Usage
\`\`\`tsx
<Progress value={75} showPercentage />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Progress value (0-100)',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the progress bar',
    },
    showPercentage: {
      control: 'boolean',
      description: 'Whether to show percentage',
    },
    animated: {
      control: 'boolean',
      description: 'Whether to animate progress',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate loading state',
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
