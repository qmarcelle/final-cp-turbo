import * as React from 'react';
import { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { useForm, FormProvider } from 'react-hook-form'
import { DatePicker } from './DatePicker'
import { cn } from '../../../lib/utils'

type DateValue = Date | null
type DateRangeValue = { start: DateValue; end: DateValue }

const meta = {
  title: '⚛️ Foundation/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Date Picker

A modern and accessible date picker component that supports single dates, date ranges, and time selection, with seamless integration into forms.

## Features
- **Single and Range Modes**: Supports both single date and date range selection.
- **Time Selection**: Optional time selection for precise scheduling.
- **Form-Ready**: Built to work with React Hook Form.
- **Customizable**: Allows for custom styling, placeholders, and date restrictions.
- **Accessible**: Designed for keyboard navigation and screen reader support.

## When to Use
- For any input that requires a date, such as a date of birth, appointment, or coverage period.
- Use range mode for selecting start and end dates.
- Use time selection for scheduling specific appointments.

## Accessibility
- The component uses a button to trigger a dialog with a calendar grid.
- The calendar is navigable via keyboard.
- ARIA attributes are used to announce selected dates and other state changes.
`,
      },
    },
  },
  tags: ['foundation', 'stable', 'autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'The placeholder text to display when no date is selected.',
    },
    mode: {
      control: 'select',
      options: ['single', 'range'],
      description: 'The selection mode of the date picker.',
    },
    showTime: {
      control: 'boolean',
      description: 'If true, allows the user to select a time.',
    },
    minDate: {
      control: 'date',
      description: 'The minimum selectable date.',
      table: {
        type: { summary: 'Date | null' },
      },
    },
    maxDate: {
      control: 'date',
      description: 'The maximum selectable date.',
      table: {
        type: { summary: 'Date | null' },
      },
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes for additional styling.',
    },
    required: {
      control: 'boolean',
      description: 'Marks the field as required.',
    },
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
      dateValue: value,
    },
  })

  // Update state when control value changes
  useEffect(() => {
    setValue(convertValue(args.value))
    methods.setValue('dateValue', convertValue(args.value))
  }, [args.value, methods])

  const {
    formState: { errors },
  } = methods

  const error = args.error || errors.dateValue?.message

  return (
    <FormProvider {...methods}>
      <div className={cn('storybook-form-container', args.className)}>
        {args.label && (
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            {args.label}
            {args.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <DatePicker
          {...args}
          name="dateValue"
          control={methods.control}
          minDate={toDate(args.minDate) || undefined}
          maxDate={toDate(args.maxDate) || undefined}
          data-cy="date-picker-demo"
        />
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        {args.description && !error && (
          <p className="text-sm text-tertiaryGray3 mt-2">
            {args.description}
          </p>
        )}
      </div>
    </FormProvider>
  )
}

export const Default: Story = {
  args: {
    placeholder: 'Select a date',
    label: 'Event Date',

  },
  render: (args: DatePickerStoryArgs) => <InteractiveDatePicker {...args} />
}

export const WithValue: Story = {
  args: {
    placeholder: 'Select a date',
    label: 'Start Date',

  },
  render: (args: DatePickerStoryArgs) => <InteractiveDatePicker {...args} />
}

export const Required: Story = {
  args: {
    placeholder: 'Select a date',
    label: 'Appointment Date',
    required: true,

    
  },
  render: (args: DatePickerStoryArgs) => <InteractiveDatePicker {...args} />
}

export const WithError: Story = {
  args: {
    placeholder: 'Select a date',
    label: 'Birth Date',
  },
  render: (args: DatePickerStoryArgs) => <InteractiveDatePicker {...args} />
}

export const WithMinMaxDate: Story = {
  args: {
    minDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    maxDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    placeholder: 'Select a date (±1 month)',
    label: 'Booking Date',
  },
  render: (args: DatePickerStoryArgs) => <InteractiveDatePicker {...args} />
}

export const WithTimeSelection: Story = {
  args: {
    showTime: true,
    placeholder: 'Select date and time',
  },
  render: (args: DatePickerStoryArgs) => <InteractiveDatePicker {...args} />
}

export const DateRange: Story = {
  args: {
    mode: 'range',
    placeholder: 'Select date range',
  },
  render: (args: DatePickerStoryArgs) => <InteractiveDatePicker {...args} />
}

export const WithCustomClass: Story = {
  args: {
    placeholder: 'Select a date',
    className: 'w-64',
  },
  render: (args: DatePickerStoryArgs) => <InteractiveDatePicker {...args} />
}

export const HealthcareExamples: Story = {
  name: 'Healthcare Use Cases',
  render: () => {
    const [dob, setDob] = useState<DateValue>(new Date('1985-06-12'))
    const [appointment, setAppointment] = useState<DateValue>(new Date())
    const [coverage, setCoverage] = useState<DateRangeValue>({
      start: new Date(),
      end: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    })

    return (
      <div className="space-y-8 max-w-md">
        <InteractiveDatePicker
          label="Date of Birth"
          value={dob}
          onChange={setDob}
          storyTitle="Patient Date of Birth"
        />
        <InteractiveDatePicker
          label="Schedule Appointment"
          value={appointment}
          onChange={setAppointment}
          showTime
          storyTitle="Appointment Scheduling"
        />
        <InteractiveDatePicker
          label="Coverage Period"
          value={coverage}
          onChange={setCoverage}
          mode="range"
          storyTitle="Insurance Coverage Dates"
        />
      </div>
    )
  },
}