import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['Informational', 'Success', 'Warning', 'Critical', 'Neutral'],
    },
    children: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Tag>

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-2">
      <Tag variant="Informational">Informational</Tag>
      <Tag variant="Success">Success</Tag>
      <Tag variant="Warning">Warning</Tag>
      <Tag variant="Critical">Critical</Tag>
      <Tag variant="Neutral">Neutral</Tag>
    </div>
  ),
  args: {
    children: 'Tag Label',
  },
}
