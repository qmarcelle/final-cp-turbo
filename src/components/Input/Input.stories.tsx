import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'
import { MagnifyingGlassIcon } from '@/lib/icons'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['atom', 'autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Input placeholder="Enter text..." />,
}

export const Variants: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input variant="default" placeholder="Default variant" />
      <Input variant="error" placeholder="Error variant" />
      <Input variant="success" placeholder="Success variant" />
      <Input variant="warning" placeholder="Warning variant" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input inputSize="sm" placeholder="Small size" />
      <Input inputSize="default" placeholder="Default size" />
      <Input inputSize="lg" placeholder="Large size" />
    </div>
  ),
}

export const WithPrefixSuffix: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input prefix="$" placeholder="Enter amount" />
      <Input suffix=".00" placeholder="Enter amount" />
      <Input
        prefix={<MagnifyingGlassIcon className="h-4 w-4" />}
        placeholder="Search..."
      />
      <Input
        prefix="https://"
        suffix=".com"
        placeholder="Enter domain"
      />
    </div>
  ),
}

export const WithHelperText: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input
        placeholder="With help text"
        helpText="This is a helpful message"
      />
      <Input
        placeholder="With error message"
        error="This field is required"
      />
    </div>
  ),
}

export const WithCharacterCount: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input
        placeholder="Limited to 20 characters"
        maxLength={20}
        showCount
      />
      <Input
        placeholder="With error and count"
        maxLength={50}
        showCount
        error="Please enter a valid value"
      />
    </div>
  ),
}

export const WithDebounce: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input
        placeholder="Debounced input (500ms)"
        debounceMs={500}
        onDebouncedChange={(value) => console.log('Debounced value:', value)}
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input disabled placeholder="Disabled input" />
      <Input
        disabled
        prefix="$"
        suffix=".00"
        placeholder="Disabled with prefix/suffix"
      />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="tel" placeholder="Telephone input" />
      <Input type="url" placeholder="URL input" />
      <Input type="search" placeholder="Search input" />
    </div>
  ),
}

export const ReadOnly: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input readOnly value="Read-only value" />
      <Input
        readOnly
        value="Read-only with prefix/suffix"
        prefix="$"
        suffix=".00"
      />
    </div>
  ),
}

export const Required: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input required placeholder="Required field" />
      <Input
        required
        placeholder="Required with error"
        error="This field is required"
      />
    </div>
  ),
} 