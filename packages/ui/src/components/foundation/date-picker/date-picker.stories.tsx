import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { useForm, FormProvider } from 'react-hook-form'
import { DatePicker, type DatePickerProps, type DateRange as ImportedDateRange } from './date-picker'

type DateValue = Date | null
// Renamed to avoid conflict with imported DateRange type
type StoryDateRangeValue = { start: DateValue; end: DateValue }

// Define a specific type for form values used in stories
interface StoryFormValues {
  storyDateField: Date | StoryDateRangeValue | null;
}

const meta: Meta<DatePickerProps<StoryFormValues>> = {
  title: 'Foundation/date-picker',
  component: DatePicker as React.FC<DatePickerProps<StoryFormValues>>,
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
    name: { control: 'text', description: 'Form field name (must be keyof StoryFormValues)', defaultValue: 'storyDateField' },
    label: { control: 'text', description: 'Label for the date picker' },
    required: { control: 'boolean', description: 'Is the field required?' },
    disabled: { control: 'boolean', description: 'Is the field disabled?' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    className: { control: 'text', description: 'Custom CSS classes' },
    minDate: { control: 'date', description: 'Minimum selectable date' },
    maxDate: { control: 'date', description: 'Maximum selectable date' },
    showTime: { control: 'boolean', description: 'Show time selection?' },
    mode: { control: 'select', options: ['single', 'range'], description: 'Single date or range selection' },
    isClearable: { control: 'boolean', description: 'Show clear button?' },
    hint: { control: 'text', description: 'Hint text below the input' },
    dateFormat: { control: 'text', description: 'Custom date format string' },
    control: { table: { disable: true } }, // Injected by form wrapper
  },
} satisfies Meta<DatePickerProps<StoryFormValues>>

export default meta

// Args for the InteractiveDatePicker wrapper, extending DatePickerProps
interface InteractiveDatePickerStoryArgs extends DatePickerProps<StoryFormValues> {
  initialValue?: Date | StoryDateRangeValue | null; // Value to initialize the form with
  storyTitle?: string;
  description?: string;
  name: keyof StoryFormValues; // Ensure name is a valid key
}

type Story = StoryObj<InteractiveDatePickerStoryArgs>

// Helper function to safely convert string to Date
const toDate = (dateStr: string | Date | null | undefined): Date | null => {
  if (!dateStr) return null
  if (dateStr instanceof Date) return dateStr
  const date = new Date(dateStr)
  return isNaN(date.getTime()) ? null : date
}

// Helper function to handle both single date and date range values
const convertValue = (value: any): Date | StoryDateRangeValue | null => {
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

// Interactive wrapper component for stories with FormProvider
const InteractiveDatePicker = (args: InteractiveDatePickerStoryArgs) => {
  const { initialValue, storyTitle, description, name, ...restDatePickerProps } = args;
  
  const methods = useForm<StoryFormValues>({
    defaultValues: {
      [name]: convertValue(initialValue),
    } as StoryFormValues,
  });

  useEffect(() => {
    methods.setValue(name, convertValue(initialValue));
  }, [initialValue, methods, name]);

  const fieldError = methods.formState.errors[name];

  return (
    <FormProvider {...methods}>
      <div className="storybook-form-container w-full max-w-md p-4">
        {storyTitle && <h3 className="text-lg font-medium text-neutral-800 dark:text-white mb-4">{storyTitle}</h3>}
        <DatePicker 
          {...restDatePickerProps} // Pass through relevant DatePickerProps
          name={name} // name is a key prop for react-hook-form
          control={methods.control} // control is essential for react-hook-form
          minDate={toDate(args.minDate) || undefined} // Ensure dates are Date objects or undefined
          maxDate={toDate(args.maxDate) || undefined}
          data-cy="date-picker-demo"
        />
        {description && !fieldError && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">{description}</p>
        )}
        {fieldError && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">{fieldError.message}</p>
        )}
      </div>
    </FormProvider>
  )
}

export const Default: Story = {
  args: {
    name: 'storyDateField',
    placeholder: 'Select a date',
    initialValue: null,
    label: 'Event Date',
    storyTitle: 'Default Date Picker',
    description: 'Basic date picker with label for selecting a single date',
  },
  render: InteractiveDatePicker,
}

export const WithValue: Story = {
  args: {
    name: 'storyDateField',
    initialValue: new Date(),
    placeholder: 'Select a date',
    label: 'Start Date',
    storyTitle: 'Pre-selected Date',
    description: 'Date picker with a pre-selected value',
  },
  render: InteractiveDatePicker,
}

export const RequiredStory: Story = {
  name: 'Required Field',
  args: {
    name: 'storyDateField',
    initialValue: null,
    placeholder: 'Select a date',
    label: 'Appointment Date',
    required: true,
    storyTitle: 'Required Date Field',
    description: 'Date picker marked as required field with visual indicator',
  },
  render: InteractiveDatePicker,
}

export const WithError: Story = {
  args: {
    name: 'storyDateField',
    initialValue: null,
    placeholder: 'Select a date',
    label: 'Birth Date',
    storyTitle: 'Error State (Simulated)',
    description: 'Date picker showing a validation error message.',
  },
  render: (args: InteractiveDatePickerStoryArgs) => {
    const methods = useForm<StoryFormValues>({
      defaultValues: { [args.name]: convertValue(args.initialValue) } as StoryFormValues,
    });

    useEffect(() => {
      methods.setError(args.name, { type: "manual", message: "This birth date is invalid." });
    }, [methods, args.name]);

    const fieldError = methods.formState.errors[args.name];

    return (
      <FormProvider {...methods}>
        <div className="storybook-form-container w-full max-w-md p-4">
          {args.storyTitle && <h3 className="text-lg font-medium text-neutral-800 dark:text-white mb-4">{args.storyTitle}</h3>}
          <DatePicker 
            {...args} // Pass all args, DatePicker will pick what it needs
            control={methods.control} // Override control
            data-cy="date-picker-demo-error"
          />
          {args.description && !fieldError && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">{args.description}</p>
          )}
          {fieldError && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">{fieldError.message}</p>
          )}
        </div>
      </FormProvider>
    );
  },
}

export const WithMinMaxDate: Story = {
  args: {
    name: 'storyDateField',
    initialValue: null,
    minDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    maxDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    placeholder: 'Select a date (±1 month)',
    label: 'Booking Date',
    storyTitle: 'Date Range Restrictions',
    description: 'Date picker with minimum and maximum selectable dates (current month ±1)',
  },
  render: InteractiveDatePicker,
}

export const WithTimeSelection: Story = {
  args: {
    name: 'storyDateField',
    initialValue: null,
    showTime: true,
    placeholder: 'Select date and time',
    label: 'Meeting Schedule',
    storyTitle: 'Date & Time Picker',
    description: 'Date picker with additional time selection capability',
  },
  render: InteractiveDatePicker,
}

export const DateRangeStory: Story = {
  name: 'Date Range Picker', 
  args: {
    name: 'storyDateField',
    initialValue: null,
    mode: 'range',
    placeholder: 'Select date range',
    label: 'Vacation Period',
    storyTitle: 'Date Range Picker',
    description: 'Date picker configured for selecting a range of dates',
  },
  render: InteractiveDatePicker,
}

export const WithCustomClass: Story = {
  args: {
    name: 'storyDateField',
    initialValue: null,
    placeholder: 'Select a date',
    className: 'w-full md:w-80 border-blue-500', 
    label: 'Custom Styled Picker',
    storyTitle: 'Custom Styling',
    description: 'Date picker with custom width and border color applied via className.',
  },
  render: InteractiveDatePicker,
} 