import type { Meta, StoryObj } from '@storybook/react';
import { Grid, Row, Column, Spacer } from './Grid';

const meta = {
  title: '📐 Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Grid System

A flexible grid system that includes Grid, Row, Column, and Spacer components for creating complex layouts.

## Features
- Responsive grid columns (1-12)
- Customizable gaps
- Row and column organization
- Flexible alignment options
- Spacing utilities
- Built with Flexbox and CSS Grid

## Usage

\`\`\`tsx
import { Grid, Row, Column, Spacer } from '@portals/ui';

// Basic grid
<Grid columns={3} gap={4}>
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</Grid>

// Row and Column layout
<Row justify="between" align="center">
  <Column span={6}>Left content</Column>
  <Column span={6}>Right content</Column>
</Row>

// With spacing
<div>
  <div>Content</div>
  <Spacer size={4} />
  <div>More content</div>
</div>
\`\`\`
`
      }
    }
  },
  argTypes: {
    columns: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Number of grid columns',
    },
    gap: {
      control: { type: 'number', min: 0, max: 16 },
      description: 'Gap between grid items',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof Grid>;

const GridItem = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-100 p-4 rounded text-center">{children}</div>
);

export const Default: Story = {
  args: {
    columns: 3,
    gap: 4,
    children: (
      <>
        <GridItem>1</GridItem>
        <GridItem>2</GridItem>
        <GridItem>3</GridItem>
      </>
    ),
  },
};

export const Columns: Story = {
  render: () => (
    <div className="space-y-4">
      <Grid columns={2} gap={4}>
        <GridItem>Two columns</GridItem>
        <GridItem>Two columns</GridItem>
      </Grid>
      <Grid columns={3} gap={4}>
        <GridItem>Three columns</GridItem>
        <GridItem>Three columns</GridItem>
        <GridItem>Three columns</GridItem>
      </Grid>
      <Grid columns={4} gap={4}>
        <GridItem>Four columns</GridItem>
        <GridItem>Four columns</GridItem>
        <GridItem>Four columns</GridItem>
        <GridItem>Four columns</GridItem>
      </Grid>
    </div>
  ),
};

export const WithRows: Story = {
  render: () => (
    <div className="space-y-4">
      <Row justify="start" gap={4}>
        <Column span={4}>
          <GridItem>Start</GridItem>
        </Column>
        <Column span={4}>
          <GridItem>Start</GridItem>
        </Column>
      </Row>
      <Row justify="center" gap={4}>
        <Column span={4}>
          <GridItem>Center</GridItem>
        </Column>
        <Column span={4}>
          <GridItem>Center</GridItem>
        </Column>
      </Row>
      <Row justify="end" gap={4}>
        <Column span={4}>
          <GridItem>End</GridItem>
        </Column>
        <Column span={4}>
          <GridItem>End</GridItem>
        </Column>
      </Row>
    </div>
  ),
};

export const WithSpacing: Story = {
  render: () => (
    <div>
      <GridItem>First section</GridItem>
      <Spacer size={8} />
      <GridItem>Second section</GridItem>
      <Spacer size={4} />
      <GridItem>Third section</GridItem>
    </div>
  ),
}; 