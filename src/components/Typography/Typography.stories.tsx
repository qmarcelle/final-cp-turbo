import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from './Typography'
import { InformationCircleIcon } from '@/lib/icons'

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['atom', 'autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
    </div>
  ),
}

export const BodyText: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="p">
        Default paragraph text. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Typography variant="lead">
        Lead text is slightly larger and muted. Perfect for introductions or
        summaries.
      </Typography>
      <Typography variant="large">
        Large text for emphasis without using a heading.
      </Typography>
      <Typography variant="small">
        Small text for less important information.
      </Typography>
      <Typography variant="muted">
        Muted text for secondary information.
      </Typography>
    </div>
  ),
}

export const Alignment: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography align="left">Left aligned text</Typography>
      <Typography align="center">Center aligned text</Typography>
      <Typography align="right">Right aligned text</Typography>
      <Typography align="justify">
        Justified text that spans multiple lines. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua.
      </Typography>
    </div>
  ),
}

export const FontWeights: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography weight="light">Light weight text</Typography>
      <Typography weight="normal">Normal weight text</Typography>
      <Typography weight="medium">Medium weight text</Typography>
      <Typography weight="semibold">Semibold weight text</Typography>
      <Typography weight="bold">Bold weight text</Typography>
      <Typography weight="extrabold">Extra bold weight text</Typography>
    </div>
  ),
}

export const Decorations: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography decoration="underline">Underlined text</Typography>
      <Typography decoration="lineThrough">Strikethrough text</Typography>
      <Typography decoration="none">No decoration</Typography>
    </div>
  ),
}

export const Transformations: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography transform="uppercase">Uppercase text</Typography>
      <Typography transform="lowercase">LOWERCASE TEXT</Typography>
      <Typography transform="capitalize">capitalize text</Typography>
      <Typography transform="normal">Normal text</Typography>
    </div>
  ),
}

export const WithPrefixSuffix: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography
        prefix={<InformationCircleIcon className="mr-2 inline-block h-5 w-5" />}
      >
        Text with prefix icon
      </Typography>
      <Typography
        suffix={<InformationCircleIcon className="ml-2 inline-block h-5 w-5" />}
      >
        Text with suffix icon
      </Typography>
      <Typography
        prefix={<span className="mr-2 font-bold">Note:</span>}
        suffix={<span className="ml-2 text-slate-500">(optional)</span>}
      >
        Text with prefix and suffix elements
      </Typography>
    </div>
  ),
}

export const ResponsiveStyles: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography
        align="left"
        alignSm="center"
        alignMd="right"
        alignLg="center"
      >
        Responsive alignment (resize to see changes)
      </Typography>
      <Typography
        weight="normal"
        weightSm="medium"
        weightMd="semibold"
        weightLg="bold"
      >
        Responsive weight (resize to see changes)
      </Typography>
    </div>
  ),
}

export const AsChild: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography asChild>
        <a href="#" className="text-blue-600 hover:underline">
          This renders as a link
        </a>
      </Typography>
      <Typography asChild variant="h2">
        <button
          type="button"
          className="w-full rounded-lg bg-slate-100 px-4 py-2 hover:bg-slate-200"
        >
          This renders as a button
        </button>
      </Typography>
    </div>
  ),
}

export const Truncate: Story = {
  render: () => (
    <div className="w-48">
      <Typography truncate>
        This is a very long text that will be truncated with an ellipsis at the
        end because it does not fit in the container width.
      </Typography>
    </div>
  ),
}

export const CodeBlock: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography>
        You can use the <Typography variant="code">code</Typography> variant for
        inline code.
      </Typography>
      <Typography variant="code">
        const greeting = 'Hello, World!'
        console.log(greeting)
      </Typography>
    </div>
  ),
}

export const Blockquote: Story = {
  render: () => (
    <Typography variant="blockquote">
      "The best way to predict the future is to invent it." - Alan Kay
    </Typography>
  ),
} 