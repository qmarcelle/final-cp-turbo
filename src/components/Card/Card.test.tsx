import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
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
import { InformationCircleIcon } from '@/lib/icons'

expect.extend(toHaveNoViolations)

describe('Card', () => {
  it('renders basic card correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test Content</CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
    expect(screen.getByText('Test Footer')).toBeInTheDocument()
  })

  it('applies variant styles correctly', () => {
    const { rerender } = render(
      <Card variant="info">Content</Card>
    )
    expect(screen.getByText('Content')).toHaveClass('border-slate-200')

    rerender(
      <Card variant="claim">Content</Card>
    )
    expect(screen.getByText('Content')).toHaveClass('border-l-blue-500')
  })

  it('applies status styles correctly', () => {
    const { rerender } = render(
      <Card status="approved">Content</Card>
    )
    expect(screen.getByText('Content')).toHaveClass('bg-green-50')

    rerender(
      <Card status="denied">Content</Card>
    )
    expect(screen.getByText('Content')).toHaveClass('bg-red-50')
  })

  it('renders compact layout correctly', () => {
    render(
      <Card isCompact>
        <CardHeader isCompact>
          <CardTitle isCompact>Compact Title</CardTitle>
        </CardHeader>
      </Card>
    )
    expect(screen.getByText('Compact Title')).toHaveClass('text-base')
  })

  describe('CardHeader', () => {
    it('renders with icon and actions', () => {
      render(
        <Card>
          <CardHeader
            icon={<InformationCircleIcon data-testid="icon" />}
            actions={<button>Action</button>}
          >
            <CardTitle>Title</CardTitle>
          </CardHeader>
        </Card>
      )

      expect(screen.getByTestId('icon')).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('adjusts layout based on compact mode', () => {
      const { rerender } = render(
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
      )
      expect(screen.getByText('Title').closest('div')).toHaveClass('flex-col')

      rerender(
        <CardHeader isCompact>
          <CardTitle>Title</CardTitle>
        </CardHeader>
      )
      expect(screen.getByText('Title').closest('div')).toHaveClass('items-center')
    })
  })

  describe('CardTitle', () => {
    it('renders with subtitle', () => {
      render(
        <CardTitle subtitle="Subtitle">Title</CardTitle>
      )
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Subtitle')).toBeInTheDocument()
    })

    it('adjusts size based on compact mode', () => {
      const { rerender } = render(
        <CardTitle>Title</CardTitle>
      )
      expect(screen.getByText('Title')).toHaveClass('text-2xl')

      rerender(
        <CardTitle isCompact>Title</CardTitle>
      )
      expect(screen.getByText('Title')).toHaveClass('text-base')
    })
  })

  describe('CardList', () => {
    it('applies spacing variants correctly', () => {
      const { rerender } = render(
        <CardList spacing="tight">
          <div>Item 1</div>
          <div>Item 2</div>
        </CardList>
      )
      expect(screen.getByText('Item 1').parentElement).toHaveClass('space-y-2')

      rerender(
        <CardList spacing="loose">
          <div>Item 1</div>
          <div>Item 2</div>
        </CardList>
      )
      expect(screen.getByText('Item 1').parentElement).toHaveClass('space-y-6')
    })

    it('applies dividers when specified', () => {
      render(
        <CardList dividers>
          <div>Item 1</div>
          <div>Item 2</div>
        </CardList>
      )
      expect(screen.getByText('Item 1').parentElement).toHaveClass('divide-y')
    })
  })

  describe('CardItem', () => {
    it('renders label-value pair with icon', () => {
      render(
        <CardItem
          label="Status"
          value="Active"
          icon={<InformationCircleIcon data-testid="icon" />}
        />
      )

      expect(screen.getByText('Status')).toBeInTheDocument()
      expect(screen.getByText('Active')).toBeInTheDocument()
      expect(screen.getByTestId('icon')).toBeInTheDocument()
    })

    it('aligns content correctly', () => {
      render(
        <CardItem label="Label" value="Value" />
      )
      expect(screen.getByText('Label').closest('div')).toHaveClass('justify-between')
    })
  })

  it('is accessible', async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Accessible Card</CardTitle>
          <CardDescription>With description</CardDescription>
        </CardHeader>
        <CardContent>
          <CardList>
            <CardItem label="Status" value="Active" />
          </CardList>
        </CardContent>
      </Card>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
}) 