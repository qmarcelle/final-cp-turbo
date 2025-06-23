import type { Meta, StoryObj } from '@storybook/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardList,
  CardItem,
} from './Card'
import { Button } from '../Button/Button'
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  DocumentIcon,
  ClockIcon,
  CalendarIcon,
} from '@/lib/icons'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['molecule', 'autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content can contain any elements.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
}

export const InfoCard: Story = {
  render: () => (
    <Card variant="info" className="w-[350px]">
      <CardHeader
        icon={<InformationCircleIcon className="h-5 w-5 text-blue-500" />}
        actions={<Button variant="ghost" size="sm">View</Button>}
      >
        <CardTitle subtitle="Last updated 2 hours ago">
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardList>
          <CardItem
            icon={<CheckCircleIcon className="h-4 w-4" />}
            label="API Status"
            value="Operational"
          />
          <CardItem
            icon={<ClockIcon className="h-4 w-4" />}
            label="Response Time"
            value="120ms"
          />
          <CardItem
            icon={<CalendarIcon className="h-4 w-4" />}
            label="Uptime"
            value="99.9%"
          />
        </CardList>
      </CardContent>
    </Card>
  ),
}

export const StatusVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card variant="claim" status="approved" className="w-[350px]">
        <CardHeader
          icon={<CheckCircleIcon className="h-5 w-5 text-green-500" />}
          isCompact
        >
          <CardTitle subtitle="Claim #12345">
            Approved
          </CardTitle>
        </CardHeader>
      </Card>

      <Card variant="auth" status="pending" className="w-[350px]">
        <CardHeader
          icon={<ClockIcon className="h-5 w-5 text-yellow-500" />}
          isCompact
        >
          <CardTitle subtitle="Authorization #67890">
            Pending Review
          </CardTitle>
        </CardHeader>
      </Card>

      <Card variant="document" status="completed" className="w-[350px]">
        <CardHeader
          icon={<DocumentIcon className="h-5 w-5 text-blue-500" />}
          isCompact
        >
          <CardTitle subtitle="Form #34567">
            Completed
          </CardTitle>
        </CardHeader>
      </Card>

      <Card variant="error" status="denied" className="w-[350px]">
        <CardHeader
          icon={<ExclamationTriangleIcon className="h-5 w-5 text-red-500" />}
          isCompact
        >
          <CardTitle subtitle="Request #89012">
            Denied
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  ),
}

export const CardListExample: Story = {
  render: () => (
    <CardList spacing="default" dividers className="w-[400px]">
      <Card variant="info">
        <CardHeader isCompact>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>2 minutes ago</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="info">
        <CardHeader isCompact>
          <CardTitle>System Update</CardTitle>
          <CardDescription>1 hour ago</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="info">
        <CardHeader isCompact>
          <CardTitle>Maintenance Complete</CardTitle>
          <CardDescription>Yesterday</CardDescription>
        </CardHeader>
      </Card>
    </CardList>
  ),
}

export const CompactLayout: Story = {
  render: () => (
    <Card variant="info" className="w-[350px]" isCompact>
      <CardHeader
        icon={<InformationCircleIcon className="h-5 w-5 text-blue-500" />}
        actions={<Button variant="ghost" size="sm">Details</Button>}
        isCompact
      >
        <CardTitle subtitle="High priority" isCompact>
          New Notification
        </CardTitle>
      </CardHeader>
    </Card>
  ),
}

export const WithItems: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Account Details</CardTitle>
      </CardHeader>
      <CardContent>
        <CardList spacing="tight">
          <CardItem
            label="Account Name"
            value="John Doe"
          />
          <CardItem
            label="Email"
            value="john@example.com"
          />
          <CardItem
            label="Status"
            value="Active"
          />
          <CardItem
            label="Plan"
            value="Premium"
          />
        </CardList>
      </CardContent>
    </Card>
  ),
} 