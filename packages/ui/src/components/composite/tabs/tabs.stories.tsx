import type { Meta, StoryObj } from '@storybook/react'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './Tabs'
import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '../../../lib/icons'

const meta: Meta<typeof Tabs> = {
  title: 'Composite/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Tabs

A set of layered sections of content, known as tab panels, that are displayed one at a time.
`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'pills', 'cards'],
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
  },
}

export default meta

const Template: StoryObj<typeof Tabs> = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="profile" icon={CheckCircleIcon}>
          Profile
        </TabsTrigger>
        <TabsTrigger value="account" icon={InformationCircleIcon}>
          Account
        </TabsTrigger>
        <TabsTrigger value="documents" icon={XCircleIcon} badge={3}>
          Documents
        </TabsTrigger>
        <TabsTrigger value="billing" disabled>
          Billing
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <div className="p-4">
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="mt-2 text-sm text-gray-600">
            Content for the Profile tab goes here.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="account">
        <div className="p-4">
          <h3 className="text-lg font-medium">Account</h3>
          <p className="mt-2 text-sm text-gray-600">
            Content for the Account tab goes here.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="documents">
        <div className="p-4">
          <h3 className="text-lg font-medium">Documents</h3>
          <p className="mt-2 text-sm text-gray-600">
            Content for the Documents tab goes here.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="billing">
        <div className="p-4">
          <h3 className="text-lg font-medium">Billing</h3>
          <p className="mt-2 text-sm text-gray-600">
            This content will not be displayed as the trigger is disabled.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

export const Default: StoryObj<typeof Tabs> = {
  ...Template,
  args: {
    defaultValue: 'profile',
    variant: 'default',
    orientation: 'horizontal',
  },
}

export const Pills: StoryObj<typeof Tabs> = {
  ...Template,
  args: {
    ...Default.args,
    variant: 'pills',
  },
}

export const Cards: StoryObj<typeof Tabs> = {
  ...Template,
  args: {
    ...Default.args,
    variant: 'cards',
  },
}

export const Vertical: StoryObj<typeof Tabs> = {
  ...Template,
  args: {
    ...Default.args,
    orientation: 'vertical',
  },
}
