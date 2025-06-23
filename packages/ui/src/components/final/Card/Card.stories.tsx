import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button/Button';

const meta = {
  title: '🧬 Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile card component that can be used to group related content and actions.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'This is a basic card with title and subtitle',
    children: 'Card content goes here. This can include text, images, or other components.',
    className: 'w-[350px]',
  },
};

export const WithActions: Story = {
  args: {
    title: 'Interactive Card',
    subtitle: 'A card with actions',
    children: 'This card demonstrates the use of action buttons.',
    className: 'w-[350px]',
    actions: (
      <div className="flex justify-between mt-4">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm">Save</Button>
      </div>
    ),
  },
};

export const Featured: Story = {
  args: {
    title: 'Featured Content',
    subtitle: 'A card with custom styling for featured content',
    children: 'This card uses custom styling to highlight important or featured content.',
    className: 'w-[350px]',
    variant: 'accent',
    actions: (
      <Button className="w-full mt-4">Learn More</Button>
    ),
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Card with Icon',
    subtitle: 'A card that includes an icon',
    children: 'This card demonstrates the use of an icon alongside content.',
    className: 'w-[350px]',
    icon: (
      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
        <span className="text-primary">🎉</span>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    title: 'Elevated Card',
    subtitle: 'A card with elevation',
    children: 'This card uses the elevated variant to stand out from the page.',
    className: 'w-[350px]',
    variant: 'elevated',
  },
};

export const Interactive: Story = {
  args: {
    title: 'Clickable Card',
    subtitle: 'Click to navigate',
    children: 'This entire card is clickable and will navigate to the specified URL.',
    className: 'w-[350px]',
    hoverable: true,
    actionHref: '#',
    showChevron: true,
  },
};