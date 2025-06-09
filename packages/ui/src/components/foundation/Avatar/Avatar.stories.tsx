import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarGroup } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: '⚛️ Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Avatar Component

A versatile avatar component for displaying user profile images, initials, or fallback content.

## Features
- **Image Support**: Display user profile images
- **Fallback Initials**: Auto-generate initials from names
- **Multiple Sizes**: From small to extra large
- **Avatar Groups**: Display multiple avatars with overlap
- **Accessibility**: Full ARIA support

## Usage
\`\`\`tsx
<Avatar src="/avatar.jpg" alt="User Name" name="John Doe" />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image',
    },
    name: {
      control: 'text',
      description: 'Name to generate initials from',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Size of the avatar',
    },
    fallback: {
      control: 'text',
      description: 'Custom fallback content',
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    name: 'John Doe',
  },
}

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    alt: 'John Doe',
    name: 'John Doe',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="JD" size="sm" />
      <Avatar name="JD" size="md" />
      <Avatar name="JD" size="lg" />
      <Avatar name="JD" size="xl" />
      <Avatar name="JD" size="2xl" />
      <Avatar name="JD" size="3xl" />
    </div>
  ),
}

export const InitialsVariations: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="John Doe" />
      <Avatar name="Jane Smith" />
      <Avatar name="Alex Johnson" />
      <Avatar name="Maria Garcia" />
      <Avatar name="Single" />
    </div>
  ),
}

export const CustomFallback: Story = {
  args: {
    fallback: '?',
    size: 'lg',
  },
}

export const AvatarGroupStory: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Default Group (max 3)</h3>
        <AvatarGroup
          avatars={[
            {
              name: 'John Doe',
              src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            },
            {
              name: 'Jane Smith',
              src: 'https://images.unsplash.com/photo-1494790108755-2616b612b75c?w=100&h=100&fit=crop&crop=face',
            },
            { name: 'Alex Johnson' },
            { name: 'Maria Garcia' },
            { name: 'Bob Wilson' },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Larger Group (max 5)</h3>
        <AvatarGroup
          max={5}
          avatars={[
            { name: 'User 1' },
            { name: 'User 2' },
            { name: 'User 3' },
            { name: 'User 4' },
            { name: 'User 5' },
            { name: 'User 6' },
            { name: 'User 7' },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Large Size Group</h3>
        <AvatarGroup
          size="lg"
          avatars={[
            { name: 'Large 1' },
            { name: 'Large 2' },
            { name: 'Large 3' },
            { name: 'Large 4' },
          ]}
        />
      </div>
    </div>
  ),
}
