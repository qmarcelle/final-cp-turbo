import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, type Tab } from './tabs'
import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '../../../lib/icons'

const meta: Meta<typeof Tabs> = {
  title: 'Organisms/Tabs (Experimental)',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Experimental

This component is experimental and pending approval. It should not be used in production.

<hr />
`,
      },
    },
  },
}

export default meta

const tabs: Tab[] = [
  { label: 'Profile', value: 'profile', icon: CheckCircleIcon },
  { label: 'Account', value: 'account', icon: InformationCircleIcon },
  { label: 'Documents', value: 'documents', icon: XCircleIcon, badge: 3 },
  { label: 'Billing', value: 'billing', disabled: true },
]

const TabContent = ({ value }: { value: string }) => (
  <div className="p-4">
    <h3 className="text-lg font-medium">
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </h3>
    <p className="mt-2 text-sm text-gray-600">
      Content for the {value} tab goes here.
    </p>
  </div>
)

export const Default: StoryObj<typeof Tabs> = {
  args: {
    tabs: tabs,
    children: (activeTab: string) => <TabContent value={activeTab} />,
  },
}

export const Pills: StoryObj<typeof Tabs> = {
  args: {
    ...Default.args,
    variant: 'pills',
  },
}

export const Cards: StoryObj<typeof Tabs> = {
  args: {
    ...Default.args,
    variant: 'cards',
  },
}

export const Vertical: StoryObj<typeof Tabs> = {
  args: {
    ...Default.args,
    orientation: 'vertical',
  },
}
