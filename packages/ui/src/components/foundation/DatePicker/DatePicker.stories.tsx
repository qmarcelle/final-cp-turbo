import * as React from 'react';
import { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { useForm, FormProvider } from 'react-hook-form'
import { DatePicker } from './DatePicker'

type DateValue = Date | null
type DateRangeValue = { start: DateValue; end: DateValue }

const meta = {
  title: '⚛️ Atoms/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modern, accessible date picker component that integrates with React Hook Form. Supports single date selection, date ranges, and time selection.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: { 
      control: 'date',
      table: {
        type: { summary: 'Date | DateRangeValue | null' }
      }
    },
    placeholder: { control: 'text' },
    mode: { control: 'select', options: ['single', 'range'] },
    showTime: { control: 'boolean' },
    minDate: { 
      control: 'date',
      table: {
        type: { summary: 'Date | null' }
      }
    },
    maxDate: { 
      control: 'date',
      table: {
        type: { summary: 'Date | null' }
      }
    },
    className: { control: 'text' },
    label: { control: 'text' },
    required: { control: 'boolean' },
    error: { control: 'text' },
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof DatePicker>

// Helper function to safely convert string to Date
const toDate = (dateStr: string | Date | null | undefined): Date | null => {
  if (!dateStr) return null
  if (dateStr instanceof Date) return dateStr
  const date = new Date(dateStr)
  return isNaN(date.getTime()) ? null : date
}

// Helper function to handle both single date and date range values
const convertValue = (value: any): Date | DateRangeValue | null => {
  if (!value) return null
  if (typeof value === 'string' || value instanceof Date) return toDate(value)
  if (typeof value === 'object' && ('start' in value || 'end' in value)) {
    return {
      start: toDate(value.start),
      end: toDate(value.end)
    }
  }
  return null
}

// Define a type for the story args
type DatePickerStoryArgs = {
  value?: Date | null | { start: Date | null; end: Date | null };
  placeholder?: string;
  mode?: 'single' | 'range';
  showTime?: boolean;
  minDate?: Date | null;
  maxDate?: Date | null;
  className?: string;
  label?: string;
  required?: boolean;
  error?: string;
  storyTitle?: string;
  description?: string;
  [key: string]: any;
};

// Interactive wrapper component for stories with FormProvider
const InteractiveDatePicker = (args: DatePickerStoryArgs) => {
  const [value, setValue] = useState(convertValue(args.value))
  const methods = useForm({
    defaultValues: {
      dateValue: value
    }
  })

  // Update state when control value changes
  useEffect(() => {
    setValue(convertValue(args.value))
    methods.setValue('dateValue', convertValue(args.value))
  }, [args.value, methods])

  return (
    <FormProvider {...methods}>
      <div className="storybook-form-container">
        <h3 className="text-lg font-medium text-tertiaryGray1 mb-4">{args.storyTitle || 'Date Picker'}</h3>
        <DatePicker 
          {...args} 
          name="dateValue"
          control={methods.control}
          minDate={toDate(args.minDate) || undefined}
          maxDate={toDate(args.maxDate) || undefined}
          className={args.className}
          data-cy="date-picker-demo"
        />
        {args.description && (
          <p className="text-sm text-tertiaryGray3 mt-4">{args.description}</p>
        )}
      </div>
    </FormProvider>
  )
}

export const Default: Story = {
  args: {
    placeholder: 'Select a date',
    value: null,
    label: 'Event Date',
    storyTitle: 'Default Date Picker',
    description: 'Basic date picker with label for selecting a single date',
  },
  render: (args: DatePickerStoryArgs) => <InteractiveDatePicker {...args} />
}

export const WithValue: Story = {
  args: {
    value: new Date(),
    placeholder: 'Select a date',
    label: 'Start Date',
    storyTitle: 'Pre-selected Date',
    description: 'Date picker with a pre-selected value',
  },
  render: (args: DatePickerStoryArgs) => <InteractiveDatePicker {...args} />
}

export const Required: Story = {
  args: {
    value: null,
    placeholder: 'Select a date',
    label: 'Appointment Date',
    required: true,
    storyTitle: 'Required Date Field',
    description: 'Date picker marked as required field with visual indicator',
  },
  render: (args: DatePickerStoryArgs) => <InteractiveDatePicker {...args} />
}

export const WithError: Story = {
  args: {
    value: null,
    placeholder: 'Select a date',
    label: 'Birth Date',
    error: 'Please select a valid date',
    storyTitle: 'Error State',
    description: 'Date picker showing an error message',
  },
  render: (args: DatePickerStoryArgs) => <InteractiveDatePicker {...args} />
}

export const WithMinMaxDate: Story = {
  args: {
    value: null,
    minDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    maxDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    placeholder: 'Select a date (±1 month)',
    label: 'Booking Date',
    storyTitle: 'Date Range Restrictions',
    description: 'Date picker with minimum and maximum selectable dates (current month ±1)',
  },
  render: (args: DatePickerStoryArgs) => <InteractiveDatePicker {...args} />
}

export const WithTimeSelection: Story = {
  args: {
    value: null,
    showTime: true,
    placeholder: 'Select date and time',
    label: 'Meeting Schedule',
    storyTitle: 'Date & Time Picker',
    description: 'Date picker with additional time selection capability',
  },
  render: (args: DatePickerStoryArgs) => <InteractiveDatePicker {...args} />
}

export const DateRange: Story = {
  args: {
    value: null,
    mode: 'range',
    placeholder: 'Select date range',
    label: 'Vacation Period',
    storyTitle: 'Date Range Picker',
    description: 'Date picker configured for selecting a range of dates',
  },
  render: (args: DatePickerStoryArgs) => <InteractiveDatePicker {...args} />
}

export const WithCustomClass: Story = {
  args: {
    value: null,
    placeholder: 'Select a date',
    className: 'w-64',
    label: 'Custom Width',
    storyTitle: 'Custom Styling',
    description: 'Date picker with custom width applied via className',
  },
  render: (args: DatePickerStoryArgs) => <InteractiveDatePicker {...args} />
}