import type { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { DatePicker } from './DatePicker';
import { addDays } from 'date-fns';
import { ReactNode } from 'react';

const meta = {
  title: '🦜 Molecules/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modern, accessible date picker component that supports single date selection, date ranges, and form integration.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'date',
      description: 'Selected date value',
    },
    mode: {
      control: 'select',
      options: ['single', 'range'],
      description: 'Date selection mode',
    },
    showTime: {
      control: 'boolean',
      description: 'Enable time selection',
    },
    timeFormat: {
      control: 'radio',
      options: ['12h', '24h'],
      description: 'Time format display',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the date picker',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    hint: {
      control: 'text',
      description: 'Hint text to display',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper for form integration stories
const FormWrapper = ({ children, defaultValues = {} }: { children: ReactNode; defaultValues?: Record<string, any> }) => {
  const methods = useForm({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

// Basic Usage Stories
export const Default: Story = {
  args: {
    label: 'Event Date',
    placeholder: 'Select a date',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Appointment Date',
    placeholder: 'Select a date',
    required: true,
  },
};

export const WithHint: Story = {
  args: {
    label: 'Appointment Date',
    placeholder: 'Select a date',
    hint: 'Select your preferred appointment date',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Appointment Date',
    placeholder: 'Select a date',
    disabled: true,
  },
};

// Validation Stories
export const WithError: Story = {
  args: {
    label: 'Appointment Date',
    placeholder: 'Select a date',
    error: 'Please select a valid date',
    required: true,
  },
};

export const WithFormIntegration: Story = {
  decorators: [
    (Story) => (
      <FormWrapper defaultValues={{ appointmentDate: null }}>
        <Story />
      </FormWrapper>
    ),
  ],
  args: {
    name: 'appointmentDate',
    label: 'Appointment Date',
    placeholder: 'Select a date',
    required: true,
  },
};

// Advanced Features Stories
export const DateRange: Story = {
  args: {
    label: 'Date Range',
    placeholder: 'Select date range',
    mode: 'range',
  },
};

export const WithTimeSelection: Story = {
  args: {
    label: 'Appointment Time',
    placeholder: 'Select date and time',
    showTime: true,
    timeFormat: '12h',
  },
};

export const WithDateConstraints: Story = {
  args: {
    label: 'Booking Date',
    placeholder: 'Select a date',
    minDate: new Date(),
    maxDate: addDays(new Date(), 30),
    disabledDaysOfWeek: [0, 6], // Disable weekends
  },
};

// Responsive Stories
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
  args: {
    label: 'Mobile Date',
    placeholder: 'Select a date',
  },
};

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  args: {
    label: 'Tablet Date',
    placeholder: 'Select a date',
  },
};

// Theme Stories
export const DarkTheme: Story = {
  parameters: {
    themes: { theme: 'dark' },
  },
  args: {
    label: 'Dark Theme Date',
    placeholder: 'Select a date',
  },
}; 