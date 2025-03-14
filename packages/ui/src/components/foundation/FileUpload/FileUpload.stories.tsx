import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FileUpload } from './FileUpload'

const meta = {
  title: 'Foundation/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'object' },
    accept: { control: 'text' },
    maxSize: { control: 'number' },
    multiple: { control: 'boolean' },
    maxFiles: { control: 'number' },
    preview: { control: 'boolean' },
    className: { control: 'text' },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof FileUpload>

export const Default: Story = {
  args: {
    value: [],
    onChange: (files) => console.log('Selected files:', files),
  },
}

export const WithAcceptedTypes: Story = {
  args: {
    accept: 'image/jpeg,image/png',
    value: [],
    onChange: (files) => console.log('Selected files:', files),
  },
}

export const WithMaxSize: Story = {
  args: {
    maxSize: 5 * 1024 * 1024, // 5MB
    value: [],
    onChange: (files) => console.log('Selected files:', files),
  },
}

export const MultipleFiles: Story = {
  args: {
    multiple: true,
    maxFiles: 5,
    value: [],
    onChange: (files) => console.log('Selected files:', files),
  },
}

export const WithCustomClass: Story = {
  args: {
    className: 'w-96 h-48',
    value: [],
    onChange: (files) => console.log('Selected files:', files),
  },
}

export const WithPreview: Story = {
  args: {
    preview: true,
    value: [
      new File([''], 'example.jpg', { type: 'image/jpeg' }),
      new File([''], 'document.pdf', { type: 'application/pdf' }),
    ] as File[],
    onChange: (files) => console.log('Selected files:', files),
  },
} 