import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';

const meta = {
  title: '📐 Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Stack

A flexible layout component for creating vertical or horizontal stacks of elements with consistent spacing.

## Features
- Multiple direction options (row, column, reverse)
- Alignment controls
- Justification options
- Configurable spacing
- Responsive behavior
- Wrap control

## Usage

\`\`\`tsx
import { Stack } from '@portals/ui';

// Vertical stack (default)
<Stack gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

// Horizontal stack
<Stack direction="row" align="center" gap={4}>
  <div>Left</div>
  <div>Center</div>
  <div>Right</div>
</Stack>

// Responsive stack
<Stack responsive gap={4}>
  <div>Stacks vertically on mobile</div>
  <div>Horizontal on larger screens</div>
</Stack>
\`\`\`
`
      }
    }
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
      description: 'Stack direction',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'baseline', 'stretch'],
      description: 'Cross-axis alignment',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Main-axis justification',
    },
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
      description: 'Space between items',
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'Wrap behavior',
    },
    responsive: {
      control: 'boolean',
      description: 'Enable responsive behavior',
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof Stack>;

const StackItem = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-100 p-4 rounded">{children}</div>
);

export const Default: Story = {
  args: {
    gap: 4,
    children: (
      <>
        <StackItem>Item 1</StackItem>
        <StackItem>Item 2</StackItem>
        <StackItem>Item 3</StackItem>
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    direction: 'row',
    gap: 4,
    children: (
      <>
        <StackItem>Left</StackItem>
        <StackItem>Center</StackItem>
        <StackItem>Right</StackItem>
      </>
    ),
  },
};

export const Alignment: Story = {
  render: () => (
    <div className="space-y-4">
      <Stack direction="row" align="start" gap={4} className="h-32 bg-gray-100">
        <StackItem>Top</StackItem>
        <StackItem>Top</StackItem>
        <StackItem>Top</StackItem>
      </Stack>
      <Stack direction="row" align="center" gap={4} className="h-32 bg-gray-100">
        <StackItem>Center</StackItem>
        <StackItem>Center</StackItem>
        <StackItem>Center</StackItem>
      </Stack>
      <Stack direction="row" align="end" gap={4} className="h-32 bg-gray-100">
        <StackItem>Bottom</StackItem>
        <StackItem>Bottom</StackItem>
        <StackItem>Bottom</StackItem>
      </Stack>
    </div>
  ),
};

export const Justification: Story = {
  render: () => (
    <div className="space-y-4">
      <Stack direction="row" justify="start" gap={4}>
        <StackItem>Start</StackItem>
        <StackItem>Start</StackItem>
      </Stack>
      <Stack direction="row" justify="center" gap={4}>
        <StackItem>Center</StackItem>
        <StackItem>Center</StackItem>
      </Stack>
      <Stack direction="row" justify="end" gap={4}>
        <StackItem>End</StackItem>
        <StackItem>End</StackItem>
      </Stack>
      <Stack direction="row" justify="between" gap={4}>
        <StackItem>Between</StackItem>
        <StackItem>Between</StackItem>
      </Stack>
    </div>
  ),
};

export const Responsive: Story = {
  args: {
    responsive: true,
    gap: 4,
    children: (
      <>
        <StackItem>Stacks vertically on mobile</StackItem>
        <StackItem>Horizontal on larger screens</StackItem>
        <StackItem>Adapts to viewport</StackItem>
      </>
    ),
  },
}; 