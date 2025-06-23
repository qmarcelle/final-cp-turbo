import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from './Navigation';
import { ProfileMenu } from '../foundation/ProfileMenu/ProfileMenu';
import { Breadcrumb } from '../organisms/Breadcrumb';
import { Input } from '../atoms/Input/Input';
import { Button } from '../atoms/Button/Button';

const meta = {
  title: 'Organisms/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A consolidated, atomic Navigation organism with slots for profile, breadcrumbs, search, and support actions.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockUser = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane.doe@example.com',
};

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  {
    label: 'Products',
    items: [
      { label: 'Product A', href: '/products/a', description: 'The A product' },
      { label: 'Product B', href: '/products/b', description: 'The B product' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
];

const breadcrumbs = (
  <Breadcrumb
    items={[
      { label: 'Home', href: '/' },
      { label: 'Section', href: '/section' },
      { label: 'Current Page' },
    ]}
  />
);

const search = (
  <Input
    type="search"
    name="search"
    placeholder="Search..."
    showSearchButton
    showClearButton
    style={{ minWidth: 220 }}
  />
);

const supportActions = (
  <Button variant="outline">Support</Button>
);

export const DesktopFull: Story = {
  args: {
    brand: <span className="font-bold text-lg">MyBrand</span>,
    items: menuItems,
    profileMenu: <ProfileMenu user={mockUser} />,
    breadcrumbs,
    search,
    supportActions,
    collapsible: true,
  },
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
};

export const DesktopNoProfile: Story = {
  args: {
    brand: <span className="font-bold text-lg">MyBrand</span>,
    items: menuItems,
    breadcrumbs,
    search,
    supportActions,
    collapsible: true,
  },
};

export const DesktopNoBreadcrumbs: Story = {
  args: {
    brand: <span className="font-bold text-lg">MyBrand</span>,
    items: menuItems,
    profileMenu: <ProfileMenu user={mockUser} />,
    search,
    supportActions,
    collapsible: true,
  },
};

export const DesktopNoSearch: Story = {
  args: {
    brand: <span className="font-bold text-lg">MyBrand</span>,
    items: menuItems,
    profileMenu: <ProfileMenu user={mockUser} />,
    breadcrumbs,
    supportActions,
    collapsible: true,
  },
};

export const MobileFull: Story = {
  args: {
    brand: <span className="font-bold text-lg">MyBrand</span>,
    items: menuItems,
    profileMenu: <ProfileMenu user={mockUser} />,
    breadcrumbs,
    search,
    supportActions,
    collapsible: true,
  },
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
  },
}; 