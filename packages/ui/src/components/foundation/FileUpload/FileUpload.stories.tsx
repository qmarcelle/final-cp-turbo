import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useForm, FormProvider } from 'react-hook-form'
import { FileUpload } from './FileUpload'

const meta = {
  title: '⚛️ Atoms/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    accept: { control: 'text' },
    maxSize: { control: 'number' },
    multiple: { control: 'boolean' },
    maxFiles: { control: 'number' },
    preview: { control: 'boolean' },
    className: { control: 'text' },
    label: { control: 'text' },
  },
  decorators: [
    (Story) => {
      const methods = useForm();
      return React.createElement(FormProvider, { ...methods, children: React.createElement(Story) });
    },
  ],
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof FileUpload>

export const Default: Story = {
  args: {
    name: 'files',
    label: 'Upload Files',
  },
}

export const WithAcceptedTypes: Story = {
  args: {
    name: 'files',
    label: 'Upload Images',
    accept: 'image/jpeg,image/png',
  },
}

export const WithMaxSize: Story = {
  args: {
    name: 'files',
    label: 'Upload Files (Max 5MB)',
    maxSize: 5 * 1024 * 1024, // 5MB
  },
}

export const MultipleFiles: Story = {
  args: {
    name: 'files',
    label: 'Upload Multiple Files',
    multiple: true,
    maxFiles: 5,
  },
}

export const WithCustomClass: Story = {
  args: {
    name: 'files',
    label: 'Upload Files',
    className: 'w-96 h-48',
  },
}

export const WithPreview: Story = {
  args: {
    name: 'files',
    label: 'Upload Files with Preview',
    preview: true,
  },
} 