import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile input component that supports various types including text, number, textarea, and more.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'number', 'textarea', 'search', 'url'],
      description: 'Input type',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the field is disabled',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    resize: {
      control: 'select',
      options: [true, false, 'none', 'both', 'horizontal', 'vertical'],
      description: 'Resize behavior for textarea',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Input Stories
export const Default: Story = {
  args: {
    name: 'input',
    label: 'Label',
    placeholder: 'Enter text...',
  },
};

// TextArea Stories
export const TextArea: Story = {
  args: {
    name: 'message',
    type: 'textarea',
    label: 'Message',
    placeholder: 'Enter your message here...',
    rows: 4,
  },
};

export const TextAreaWithResize: Story = {
  args: {
    name: 'message',
    type: 'textarea',
    label: 'Message',
    placeholder: 'Enter your message here...',
    rows: 4,
    resize: 'vertical',
  },
};

export const TextAreaWithAutoResize: Story = {
  args: {
    name: 'message',
    type: 'textarea',
    label: 'Message',
    placeholder: 'Enter your message here...',
    rows: 4,
    autoResize: true,
    minRows: 4,
    maxRows: 10,
  },
};

export const TextAreaWithCharCount: Story = {
  args: {
    name: 'message',
    type: 'textarea',
    label: 'Message',
    placeholder: 'Enter your message here...',
    rows: 4,
    maxLength: 500,
    showCount: true,
  },
};

export const TextAreaWithValidation: Story = {
  args: {
    name: 'message',
    type: 'textarea',
    label: 'Message',
    placeholder: 'Enter your message here...',
    rows: 4,
    required: true,
    error: 'Please enter a message',
  },
};

// Add search stories
export const Search: Story = {
  args: {
    name: 'search',
    type: 'search',
    placeholder: 'Search...',
    showSearchButton: true,
  },
};

export const SearchWithClear: Story = {
  args: {
    name: 'search',
    type: 'search',
    placeholder: 'Search...',
    showClearButton: true,
    value: 'Search term',
  },
};

export const SearchWithSuggestions: Story = {
  args: {
    name: 'search',
    type: 'search',
    placeholder: 'Search...',
    showClearButton: true,
    suggestions: [
      {
        id: '1',
        label: 'Suggestion 1',
        description: 'Description for suggestion 1',
        category: 'Category A',
      },
      {
        id: '2',
        label: 'Suggestion 2',
        description: 'Description for suggestion 2',
        category: 'Category A',
      },
      {
        id: '3',
        label: 'Suggestion 3',
        description: 'Description for suggestion 3',
        category: 'Category B',
      },
    ],
  },
};

export const SearchWithAsyncSuggestions: Story = {
  args: {
    name: 'search',
    type: 'search',
    placeholder: 'Search...',
    showClearButton: true,
    debounceMs: 300,
    loadSuggestions: async (query: string) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return [
        {
          id: '1',
          label: `Result for "${query}" 1`,
          description: 'Description for result 1',
          category: 'Search Results',
        },
        {
          id: '2',
          label: `Result for "${query}" 2`,
          description: 'Description for result 2',
          category: 'Search Results',
        },
      ];
    },
  },
};

export const SearchWithAdvanced: Story = {
  args: {
    name: 'search',
    type: 'search',
    placeholder: 'Search...',
    showClearButton: true,
    showAdvancedSearch: true,
    onAdvancedSearch: () => {
      console.log('Advanced search clicked');
    },
    suggestions: [
      {
        id: '1',
        label: 'Suggestion 1',
        description: 'Description for suggestion 1',
        category: 'Category A',
      },
      {
        id: '2',
        label: 'Suggestion 2',
        description: 'Description for suggestion 2',
        category: 'Category B',
      },
    ],
  },
}; 