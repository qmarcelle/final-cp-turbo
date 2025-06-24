import type { Meta, StoryObj } from '@storybook/react'
import { BookOfBusinessPage } from './BookOfBusinessPage'

const meta = {
  title: '📄 Pages/📚 BookOfBusinessPage',
  component: BookOfBusinessPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Book of business overview with group listings, analytics, and business metrics',
      },
    },
  },
} satisfies Meta<typeof BookOfBusinessPage>

export default meta
type Story = StoryObj<typeof meta>

// Basic story with default props
export const Default: Story = {
  args: {
    showFilters: true,
  },
}

// TODO: Implement this file
