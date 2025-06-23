import type { Meta, StoryObj } from '@storybook/react'
import { Layout } from './Layout'

const meta: Meta<typeof Layout.Container> = {
  title: 'Components/Layout',
  parameters: {
    layout: 'padded',
  },
  tags: ['molecule', 'autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Box component for demo purposes
const Box = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-slate-100 p-4 rounded-lg ${className}`}>{children}</div>
)

export const Container: Story = {
  render: () => (
    <div className="space-y-4">
      <Layout.Container size="sm" className="bg-slate-100 p-4">
        Small Container
      </Layout.Container>
      <Layout.Container size="md" className="bg-slate-100 p-4">
        Medium Container
      </Layout.Container>
      <Layout.Container size="lg" className="bg-slate-100 p-4">
        Large Container
      </Layout.Container>
    </div>
  ),
}

export const ContainerPadding: Story = {
  render: () => (
    <div className="space-y-4">
      <Layout.Container padding="none" className="bg-slate-100">
        No Padding
      </Layout.Container>
      <Layout.Container padding="sm" className="bg-slate-100">
        Small Padding
      </Layout.Container>
      <Layout.Container padding="md" className="bg-slate-100">
        Medium Padding
      </Layout.Container>
      <Layout.Container padding="lg" className="bg-slate-100">
        Large Padding
      </Layout.Container>
    </div>
  ),
}

export const FlexDirection: Story = {
  render: () => (
    <div className="space-y-4">
      <Layout.Flex direction="row" gap={4}>
        <Box>Row 1</Box>
        <Box>Row 2</Box>
        <Box>Row 3</Box>
      </Layout.Flex>
      <Layout.Flex direction="column" gap={4}>
        <Box>Column 1</Box>
        <Box>Column 2</Box>
        <Box>Column 3</Box>
      </Layout.Flex>
    </div>
  ),
}

export const FlexAlignment: Story = {
  render: () => (
    <div className="space-y-4">
      <Layout.Flex align="start" gap={4} className="bg-slate-50 h-32">
        <Box>Start</Box>
        <Box>Aligned</Box>
        <Box>Items</Box>
      </Layout.Flex>
      <Layout.Flex align="center" gap={4} className="bg-slate-50 h-32">
        <Box>Center</Box>
        <Box>Aligned</Box>
        <Box>Items</Box>
      </Layout.Flex>
      <Layout.Flex align="end" gap={4} className="bg-slate-50 h-32">
        <Box>End</Box>
        <Box>Aligned</Box>
        <Box>Items</Box>
      </Layout.Flex>
    </div>
  ),
}

export const FlexJustify: Story = {
  render: () => (
    <div className="space-y-4">
      <Layout.Flex justify="start" gap={4} className="bg-slate-50">
        <Box>Start</Box>
        <Box>Justified</Box>
      </Layout.Flex>
      <Layout.Flex justify="center" gap={4} className="bg-slate-50">
        <Box>Center</Box>
        <Box>Justified</Box>
      </Layout.Flex>
      <Layout.Flex justify="end" gap={4} className="bg-slate-50">
        <Box>End</Box>
        <Box>Justified</Box>
      </Layout.Flex>
      <Layout.Flex justify="between" gap={4} className="bg-slate-50">
        <Box>Space</Box>
        <Box>Between</Box>
      </Layout.Flex>
    </div>
  ),
}

export const FlexWrap: Story = {
  render: () => (
    <Layout.Flex wrap="wrap" gap={4} className="w-64 bg-slate-50 p-4">
      <Box>Wrap</Box>
      <Box>These</Box>
      <Box>Items</Box>
      <Box>When</Box>
      <Box>Needed</Box>
    </Layout.Flex>
  ),
}

export const FlexResponsive: Story = {
  render: () => (
    <Layout.Flex
      direction="column"
      directionMd="row"
      align="center"
      alignMd="start"
      gap={4}
      className="bg-slate-50 p-4"
    >
      <Box>Responsive</Box>
      <Box>Layout</Box>
      <Box>Example</Box>
    </Layout.Flex>
  ),
}

export const GridBasic: Story = {
  render: () => (
    <Layout.Grid cols={3} gap={4}>
      <Box>Grid</Box>
      <Box>Item</Box>
      <Box>1</Box>
      <Box>Grid</Box>
      <Box>Item</Box>
      <Box>2</Box>
    </Layout.Grid>
  ),
}

export const GridResponsive: Story = {
  render: () => (
    <Layout.Grid
      cols={1}
      colsSm={2}
      colsMd={3}
      colsLg={4}
      gap={4}
    >
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
      <Box>5</Box>
      <Box>6</Box>
      <Box>7</Box>
      <Box>8</Box>
    </Layout.Grid>
  ),
}

export const GridFlow: Story = {
  render: () => (
    <Layout.Grid cols={3} gap={4} flow="dense">
      <Box className="col-span-2">Wide</Box>
      <Box>Normal</Box>
      <Box>Normal</Box>
      <Box className="col-span-2">Wide</Box>
      <Box>Normal</Box>
    </Layout.Grid>
  ),
}

export const RowAndColumn: Story = {
  render: () => (
    <div className="space-y-4">
      <Layout.Row gap={4}>
        <Box>Row</Box>
        <Box>Layout</Box>
        <Box>Shorthand</Box>
      </Layout.Row>
      <Layout.Column gap={4}>
        <Box>Column</Box>
        <Box>Layout</Box>
        <Box>Shorthand</Box>
      </Layout.Column>
    </div>
  ),
}

export const ComplexLayout: Story = {
  render: () => (
    <Layout.Container>
      <Layout.Flex direction="column" gap={4}>
        <Box>Header</Box>
        <Layout.Grid cols={1} colsMd={3} gap={4}>
          <Box className="md:col-span-2">
            <Layout.Flex direction="column" gap={4}>
              <Box>Main Content</Box>
              <Layout.Grid cols={2} gap={4}>
                <Box>Feature 1</Box>
                <Box>Feature 2</Box>
              </Layout.Grid>
            </Layout.Flex>
          </Box>
          <Box>Sidebar</Box>
        </Layout.Grid>
        <Box>Footer</Box>
      </Layout.Flex>
    </Layout.Container>
  ),
} 