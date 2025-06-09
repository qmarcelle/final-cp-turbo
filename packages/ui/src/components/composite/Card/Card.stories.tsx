import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card'

const meta: Meta<typeof Card> = {
  title: '🦠 Organisms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Cards contain content and actions about a single subject.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['main', 'elevated', 'highlight', 'neutral', 'info'],
      description: 'Visual variant of the card',
    },
    padding: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Padding size inside the card',
    },
    hoverable: {
      control: 'boolean',
      description: 'Whether the card has hover effects',
    },
  },
  args: {
    variant: 'main',
    padding: 'md',
    hoverable: false,
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
        </CardHeader>
        <CardContent>
          This is a basic card with default styling. It contains some sample
          content to demonstrate the layout.
        </CardContent>
      </>
    ),
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
        </CardHeader>
        <CardContent>
          This card has a shadow to make it appear elevated above the page
          surface.
        </CardContent>
      </>
    ),
  },
}

export const Highlight: Story = {
  args: {
    variant: 'highlight',
    children: (
      <>
        <CardHeader>
          <CardTitle>Highlighted Card</CardTitle>
        </CardHeader>
        <CardContent>
          This card uses a highlighted background to draw attention to important
          content.
        </CardContent>
      </>
    ),
  },
}

export const WithFooter: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <CardHeader>
          <CardTitle>Card with Footer</CardTitle>
        </CardHeader>
        <CardContent>
          This card includes a footer section with additional actions or
          information.
        </CardContent>
        <CardFooter>
          <button className="px-4 py-2 bg-primaryBlue text-white rounded text-sm">
            Learn More
          </button>
        </CardFooter>
      </>
    ),
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      <Card variant="main">
        <CardHeader>
          <CardTitle>Main Card</CardTitle>
        </CardHeader>
        <CardContent>Standard card with basic styling and border.</CardContent>
      </Card>

      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
        </CardHeader>
        <CardContent>Card with shadow for emphasis and depth.</CardContent>
      </Card>

      <Card variant="highlight">
        <CardHeader>
          <CardTitle>Highlight Card</CardTitle>
        </CardHeader>
        <CardContent>Special background for important content.</CardContent>
      </Card>

      <Card variant="neutral">
        <CardHeader>
          <CardTitle>Neutral Card</CardTitle>
        </CardHeader>
        <CardContent>Subtle background for secondary content.</CardContent>
      </Card>

      <Card variant="info">
        <CardHeader>
          <CardTitle>Info Card</CardTitle>
        </CardHeader>
        <CardContent>Blue accent for informational content.</CardContent>
      </Card>
    </div>
  ),
}

export const Hoverable: Story = {
  args: {
    variant: 'elevated',
    hoverable: true,
    children: (
      <>
        <CardHeader>
          <CardTitle>Hoverable Card</CardTitle>
        </CardHeader>
        <CardContent>
          Hover over this card to see the interaction effect.
        </CardContent>
      </>
    ),
  },
}

export const HealthcareExample: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <Card variant="elevated" hoverable>
        <CardHeader>
          <CardTitle>Medical Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Deductible:</span>
              <span className="font-medium">$500</span>
            </div>
            <div className="flex justify-between">
              <span>Out-of-pocket max:</span>
              <span className="font-medium">$3,000</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <button className="text-primaryBlue text-sm hover:underline">
            View full benefits →
          </button>
        </CardFooter>
      </Card>

      <Card variant="highlight">
        <CardHeader>
          <CardTitle>Recent Claims</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-sm">Last claim processed: March 15</div>
            <div className="text-sm">Amount paid: $125.00</div>
          </div>
        </CardContent>
        <CardFooter>
          <button className="text-primaryBlue text-sm hover:underline">
            View all claims →
          </button>
        </CardFooter>
      </Card>
    </div>
  ),
}
