import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import type { CheckboxProps } from '../../../types';
import { useState } from 'react';
import * as React from 'react';

const meta: Meta<typeof Checkbox> = {
  title: '⚛️ Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# ✅ Checkbox Component

A fully accessible checkbox component with support for controlled and uncontrolled states, validation, and custom styling.

## Features
- **Accessibility**: Full ARIA support with proper labeling
- **Validation**: Error states and required field indicators  
- **Flexibility**: Works with or without form libraries
- **Design System**: Uses design tokens for consistent styling
- **States**: Support for checked, unchecked, indeterminate, and disabled states

## Usage
\`\`\`tsx
<Checkbox 
  label="I agree to the terms and conditions"
  checked={checked}
  onChange={setChecked}
  required
/>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled'
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in an indeterminate state'
    },
    label: {
      control: 'text',
      description: 'The label text for the checkbox'
    },
    hint: {
      control: 'text',
      description: 'Optional hint text displayed below the label'
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required (shows asterisk)'
    },
  },
  args: {
    label: 'I agree to the terms and conditions',
    checked: false,
    disabled: false,
    indeterminate: false,
    required: false,
    hint: '',
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: (args: CheckboxProps) => {
    const [checked, setChecked] = useState(args.checked || false)
    return (
      <div className="p-4">
        <Checkbox 
          {...args} 
          checked={checked} 
          onChange={(value) => setChecked(value === true)}
        />
      </div>
    )
  },
}

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Checked by default'
  },
  render: (args: CheckboxProps) => {
    const [checked, setChecked] = useState(args.checked || false)
    return (
      <div className="p-4">
        <Checkbox 
          {...args} 
          checked={checked} 
          onChange={(value) => setChecked(value === true)}
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled checkbox'
  },
  render: (args: CheckboxProps) => {
    const [checked, setChecked] = useState(args.checked || false)
    return (
      <div className="p-4">
        <Checkbox 
          {...args} 
          checked={checked} 
          onChange={(value) => setChecked(value === true)}
        />
      </div>
    )
  },
}

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: 'Indeterminate state'
  },
  render: (args: CheckboxProps) => {
    const [checked, setChecked] = useState(args.checked || false)
    return (
      <div className="p-4">
        <Checkbox 
          {...args} 
          checked={checked} 
          onChange={(value) => setChecked(value === true)}
        />
      </div>
    )
  },
}

export const WithHint: Story = {
  args: {
    label: 'Send me email notifications',
    hint: 'You can change this setting later in your preferences'
  },
  render: (args: CheckboxProps) => {
    const [checked, setChecked] = useState(args.checked || false)
    return (
      <div className="p-4">
        <Checkbox 
          {...args} 
          checked={checked} 
          onChange={(value) => setChecked(value === true)}
        />
      </div>
    )
  },
}

export const Required: Story = {
  args: {
    required: true,
    label: 'I accept the privacy policy'
  },
  render: (args: CheckboxProps) => {
    const [checked, setChecked] = useState(args.checked || false)
    return (
      <div className="p-4">
        <Checkbox 
          {...args} 
          checked={checked} 
          onChange={(value) => setChecked(value === true)}
        />
      </div>
    )
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <h3 className="text-lg font-semibold text-tertiary-gray1 mb-4">All Checkbox States</h3>
      
      <div className="space-y-4">
        <Checkbox label="✅ Unchecked" checked={false} onChange={() => {}} />
        <Checkbox label="✅ Checked" checked={true} onChange={() => {}} />
        <Checkbox label="⚡ Indeterminate" indeterminate={true} onChange={() => {}} />
        <Checkbox label="🚫 Disabled unchecked" disabled checked={false} onChange={() => {}} />
        <Checkbox label="🚫 Disabled checked" disabled checked={true} onChange={() => {}} />
        <Checkbox label="⭐ Required with hint" required hint="This field is required for account creation" checked={false} onChange={() => {}} />
      </div>
    </div>
  ),
}

export const InteractiveExample: Story = {
  render: () => {
    const [preferences, setPreferences] = useState({
      emails: false,
      newsletters: true,
      updates: false,
      terms: false
    });

    const handleChange = (key: keyof typeof preferences) => (checked: boolean | 'indeterminate') => {
      setPreferences(prev => ({ ...prev, [key]: checked === true }));
    };

    const allSelected = Object.values(preferences).every(Boolean);
    const someSelected = Object.values(preferences).some(Boolean);

    return (
      <div className="p-6 bg-white border rounded-lg shadow-sm max-w-md">
        <h3 className="text-lg font-semibold text-tertiary-gray1 mb-4">📧 Email Preferences</h3>
        
        <div className="space-y-4 mb-4">
          <Checkbox
            label="Select All"
            checked={allSelected}
            indeterminate={someSelected && !allSelected}
            onChange={(checked) => {
              const newState = Object.keys(preferences).reduce((acc, key) => ({
                ...acc, [key]: checked === true
              }), {} as typeof preferences);
              setPreferences(newState);
            }}
          />
          
          <hr className="divider" />
          
          <Checkbox
            label="📬 Marketing emails"
            checked={preferences.emails}
            onChange={handleChange('emails')}
            hint="Receive promotional offers and product updates"
          />
          
          <Checkbox
            label="📰 Weekly newsletter"
            checked={preferences.newsletters}
            onChange={handleChange('newsletters')}
            hint="Stay updated with our weekly digest"
          />
          
          <Checkbox
            label="🔔 Product updates"
            checked={preferences.updates}
            onChange={handleChange('updates')}
            hint="Get notified about new features and improvements"
          />
          
          <Checkbox
            label="📋 Terms and conditions"
            required
            checked={preferences.terms}
            onChange={handleChange('terms')}
            hint="Required to use our services"
          />
        </div>
        
        <div className="text-sm text-tertiary-gray3 mt-4 p-3 bg-tertiary-gray5 rounded">
          <strong>Current selection:</strong> {Object.entries(preferences).filter(([_, value]) => value).map(([key]) => key).join(', ') || 'None'}
        </div>
      </div>
    );
  }
};