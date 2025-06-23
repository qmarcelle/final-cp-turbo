import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta = {
  title: '📐 Layout/Container',
  component: Container,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Container

A layout component that centers content and maintains consistent max-widths across different screen sizes.

## Features
- Multiple size variants (sm, md, lg, xl, 2xl, full)
- Responsive padding
- Centered content
- Customizable via className
- Polymorphic "as" prop support

## Usage

\`\`\`tsx
import { Container } from '@portals/ui';

// Basic usage
<Container>
  Content goes here
</Container>

// With size variant
<Container size="lg">
  Wide content
</Container>

// With custom padding
<Container padding="lg">
  Content with more padding
</Container>

// As a different element
<Container as="section">
  Section content
</Container>
\`\`\`
`
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Maximum width constraint',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Horizontal padding size',
    },
    as: {
      control: 'text',
      description: 'HTML element to render as',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    children: (
      <div className="w-full h-32 bg-blue-100 flex items-center justify-center">
        Container content
      </div>
    ),
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Container size="sm">
        <div className="w-full h-16 bg-blue-100 flex items-center justify-center">
          Small container
        </div>
      </Container>
      <Container size="md">
        <div className="w-full h-16 bg-blue-200 flex items-center justify-center">
          Medium container
        </div>
      </Container>
      <Container size="lg">
        <div className="w-full h-16 bg-blue-300 flex items-center justify-center">
          Large container
        </div>
      </Container>
      <Container size="xl">
        <div className="w-full h-16 bg-blue-400 flex items-center justify-center">
          Extra large container
        </div>
      </Container>
    </div>
  ),
};

export const Padding: Story = {
  render: () => (
    <div className="space-y-4">
      <Container padding="none" className="bg-gray-100">
        <div className="w-full h-16 bg-blue-100 flex items-center justify-center">
          No padding
        </div>
      </Container>
      <Container padding="sm" className="bg-gray-100">
        <div className="w-full h-16 bg-blue-200 flex items-center justify-center">
          Small padding
        </div>
      </Container>
      <Container padding="md" className="bg-gray-100">
        <div className="w-full h-16 bg-blue-300 flex items-center justify-center">
          Medium padding
        </div>
      </Container>
      <Container padding="lg" className="bg-gray-100">
        <div className="w-full h-16 bg-blue-400 flex items-center justify-center">
          Large padding
        </div>
      </Container>
    </div>
  ),
};

export const AsComponent: Story = {
  render: () => (
    <div className="space-y-4">
      <Container as="main">
        <div className="w-full h-16 bg-blue-100 flex items-center justify-center">
          As main element
        </div>
      </Container>
      <Container as="section">
        <div className="w-full h-16 bg-blue-200 flex items-center justify-center">
          As section element
        </div>
      </Container>
      <Container as="article">
        <div className="w-full h-16 bg-blue-300 flex items-center justify-center">
          As article element
        </div>
      </Container>
    </div>
  ),
}; 