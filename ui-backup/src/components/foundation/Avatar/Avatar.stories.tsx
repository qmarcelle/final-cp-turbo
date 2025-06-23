import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarImage, AvatarFallback } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: '⚛️ Foundation/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    tags: ['foundation', 'stable'],
    docs: {
      description: {
        component: `
# Avatar

User profile images with automatic fallbacks and multiple display sizes.

## Features
- **Automatic fallbacks**: Graceful degradation from image to initials to icon
- **Multiple sizes**: Flexible sizing from small indicators to large profile displays
- **Accessibility**: Proper alt text and screen reader support
- **Image optimization**: Lazy loading and error handling built-in
- **Composable**: Built with separate Image and Fallback components
- **Consistent styling**: Integrated with design system spacing and borders
- **High performance**: Optimized rendering and minimal re-renders

## Usage

\`\`\`tsx
import { Avatar, AvatarImage, AvatarFallback } from '@portals/ui';

// Basic avatar with image and fallback
<Avatar>
  <AvatarImage src="/user-photo.jpg" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// Different sizes
<Avatar className="h-8 w-8">
  <AvatarImage src="/user-photo.jpg" alt="Small avatar" />
  <AvatarFallback>SM</AvatarFallback>
</Avatar>

// Fallback only (no image)
<Avatar>
  <AvatarFallback>AB</AvatarFallback>
</Avatar>
\`\`\`

## When to use
- Display user profile pictures in interfaces
- Show team member photos in lists
- Represent users in comment threads
- Create user identification in headers
- Build contact lists and directories

## Accessibility
- Images include descriptive alt text
- Fallback text provides meaningful user identification
- Proper contrast ratios for text fallbacks
- Screen reader friendly with semantic markup
- Keyboard accessible when interactive
        `
      }
    }
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    children: {
      control: false,
      description: 'Avatar content (AvatarImage and AvatarFallback components)',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
  args: {
    className: '',
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default avatar with image and fallback. The fallback displays when the image fails to load.',
      },
    },
  },
}

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="" alt="Profile" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar with fallback text when no image is available. Use user initials for personalization.',
      },
    },
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="Small" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar className="h-10 w-10">
        <AvatarImage src="https://github.com/shadcn.png" alt="Default" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="h-16 w-16">
        <AvatarImage src="https://github.com/shadcn.png" alt="Large" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar className="h-24 w-24">
        <AvatarImage src="https://github.com/shadcn.png" alt="Extra Large" />
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different avatar sizes for various contexts. Use smaller sizes in dense layouts and larger for profiles.',
      },
    },
  },
}

export const UserProfiles: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="Sarah Chen" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">Sarah Chen</p>
          <p className="text-xs text-gray-500">Product Designer</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src="" alt="Alex Rodriguez" />
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">Alex Rodriguez</p>
          <p className="text-xs text-gray-500">Software Engineer</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src="https://github.com/octocat.png" alt="Jamie Taylor" />
          <AvatarFallback>JT</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">Jamie Taylor</p>
          <p className="text-xs text-gray-500">UX Researcher</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatars in user profile contexts showing real-world usage with names and titles.',
      },
    },
  },
}

export const TeamList: Story = {
  render: () => (
    <div className="flex space-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="Team member 1" />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
      <Avatar className="h-8 w-8">
        <AvatarImage src="" alt="Team member 2" />
        <AvatarFallback>B</AvatarFallback>
      </Avatar>
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/octocat.png" alt="Team member 3" />
        <AvatarFallback>C</AvatarFallback>
      </Avatar>
      <Avatar className="h-8 w-8">
        <AvatarImage src="" alt="Team member 4" />
        <AvatarFallback>D</AvatarFallback>
      </Avatar>
      <Avatar className="h-8 w-8 bg-gray-100">
        <AvatarFallback className="text-gray-600">+5</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact avatar list showing team members with overflow indicator. Common in project cards and team displays.',
      },
    },
  },
} 