import type { Meta, StoryObj } from '@storybook/react';
import { BookOfBusinessPage } from './BookOfBusinessPage';
import { getStoryMeta } from '../../utils/getStoryMeta';

// Get the meta data from the utility function
const metaData = getStoryMeta({
  component: BookOfBusinessPage,
  category: 'pages',
  name: 'BookOfBusinessPage',
  description: 'Book of business overview with group listings, analytics, and business metrics',
  parameters: {
    layout: 'fullscreen',
  },
});

// Create the meta object that satisfies Storybook's requirements
const meta = {
  ...metaData,
} satisfies Meta<typeof BookOfBusinessPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with default props
export const Default: Story = {
  args: {
    showFilters: true,
  },
};

// TODO: Implement this file