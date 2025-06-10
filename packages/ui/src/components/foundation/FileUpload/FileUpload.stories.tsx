import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useForm, FormProvider } from 'react-hook-form'
import { FileUpload } from './FileUpload'

const meta: Meta<typeof FileUpload> = {
  title: '⚛️ Foundation/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# File Upload

A flexible and accessible file upload component with support for previews, validation, and form integration.

## Features
- **File Previews**: Shows image previews before uploading.
- **Validation**: Enforces file type, size, and quantity limits.
- **Form-Ready**: Integrates seamlessly with React Hook Form.
- **Drag and Drop**: Supports drag-and-drop functionality.
- **Accessible**: Designed for keyboard navigation and screen readers.

## When to Use
- When users need to upload documents, images, or other files.
- Ideal for forms that require file attachments, such as submitting medical records, insurance cards, or prior authorization forms.

## Accessibility
- The component uses a button and a hidden file input for accessibility.
- The drag-and-drop area provides visual feedback and is keyboard accessible.
- ARIA attributes are used to describe the component's state to screen readers.
`,
      },
    },
  },
  tags: ['foundation', 'stable', 'autodocs'],
  argTypes: {
    accept: {
      control: 'text',
      description: 'The accepted file types (e.g., "image/png,image/jpeg").',
    },
    maxSize: {
      control: 'number',
      description: 'The maximum file size in bytes.',
    },
    multiple: {
      control: 'boolean',
      description: 'If true, allows multiple files to be selected.',
    },
    maxFiles: {
      control: 'number',
      description: 'The maximum number of files allowed when `multiple` is true.',
    },
    preview: {
      control: 'boolean',
      description: 'If true, displays a preview for image files.',
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes for additional styling.',
    },
    label: {
      control: 'text',
      description: 'A descriptive label for the file upload area.',
    },
  },
  decorators: [
    Story => {
      const methods = useForm()
      return (
        <FormProvider {...methods}>
          <Story />
        </FormProvider>
      )
    },
  ],
}

export default meta
type Story = StoryObj<typeof FileUpload>

const InteractiveFileUpload = (args: any) => {
  const methods = useForm()
  return (
    <FormProvider {...methods}>
      <div className="w-96">
        <FileUpload {...args} control={methods.control} />
      </div>
    </FormProvider>
  )
}

export const Default: Story = {
  args: {
    name: 'files',
    label: 'Upload Document',
  },
  render: InteractiveFileUpload,
}

export const WithPreview: Story = {
  args: {
    name: 'image',
    label: 'Upload Profile Picture',
    accept: 'image/*',
    preview: true,
  },
  render: InteractiveFileUpload,
}

export const MultipleFiles: Story = {
  args: {
    name: 'attachments',
    label: 'Attach Files',
    multiple: true,
    maxFiles: 5,
  },
  render: InteractiveFileUpload,
}

export const WithRestrictions: Story = {
  name: 'With Size and Type Restrictions',
  args: {
    name: 'report',
    label: 'Upload PDF Report (Max 2MB)',
    accept: 'application/pdf',
    maxSize: 2 * 1024 * 1024, // 2MB
  },
  render: InteractiveFileUpload,
}

export const HealthcareExamples: Story = {
  name: 'Healthcare Use Cases',
  render: () => {
    const methods = useForm()
    return (
      <FormProvider {...methods}>
        <div className="space-y-8 max-w-lg">
          <div>
            <h3 className="font-semibold mb-2">Upload Insurance Card</h3>
            <FileUpload
              name="insuranceCard"
              control={methods.control}
              label="Front and Back of Insurance Card"
              accept="image/jpeg,image/png,application/pdf"
              multiple
              maxFiles={2}
              preview
            />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Submit Medical Records</h3>
            <FileUpload
              name="medicalRecords"
              control={methods.control}
              label="Upload Medical Records or Lab Results"
              accept="application/pdf,application/msword"
              multiple
            />
          </div>
          <div>
            <h3 className="font-semibold mb-2">
              Prior Authorization Form
            </h3>
            <FileUpload
              name="priorAuth"
              control={methods.control}
              label="Upload Completed Prior Authorization Form"
              accept="application/pdf"
            />
          </div>
        </div>
      </FormProvider>
    )
  },
} 