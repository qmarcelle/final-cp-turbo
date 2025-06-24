import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Navigation } from './Navigation'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Navigation', () => {
  const DemoContent = () => (
    <Navigation.Content>
      <Navigation.Brand>
        <span>Brand</span>
      </Navigation.Brand>

      <Navigation.Toggle />

      <Navigation.Menu>
        <Navigation.Item href="/">Home</Navigation.Item>
        <Navigation.Item href="/about">About</Navigation.Item>

        <Navigation.Dropdown label="Products">
          <Navigation.DropdownItem href="/products/analytics">
            Analytics
          </Navigation.DropdownItem>
          <Navigation.DropdownItem href="/products/automation">
            Automation
          </Navigation.DropdownItem>
        </Navigation.Dropdown>
      </Navigation.Menu>
    </Navigation.Content>
  )

  it('renders navigation with all its parts', () => {
    render(
      <Navigation>
        <DemoContent />
      </Navigation>
    )

    // Check if main navigation elements are present
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('Brand')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
  })

  it('handles mobile toggle correctly', () => {
    render(
      <Navigation>
        <DemoContent />
      </Navigation>
    )

    const toggleButton = screen.getByRole('button', { name: /open menu/i })
    expect(toggleButton).toBeInTheDocument()

    // Click toggle button
    fireEvent.click(toggleButton)
    expect(
      screen.getByRole('button', { name: /close menu/i })
    ).toBeInTheDocument()

    // Click again to close
    fireEvent.click(toggleButton)
    expect(
      screen.getByRole('button', { name: /open menu/i })
    ).toBeInTheDocument()
  })

  it('marks active item based on current path', () => {
    render(
      <Navigation>
        <DemoContent />
      </Navigation>
    )

    const homeLink = screen.getByText('Home')
    expect(homeLink.closest('a')).toHaveAttribute('aria-current', 'page')

    const aboutLink = screen.getByText('About')
    expect(aboutLink.closest('a')).not.toHaveAttribute('aria-current', 'page')
  })

  it('supports different variants', () => {
    const { rerender } = render(
      <Navigation variant="default">
        <DemoContent />
      </Navigation>
    )

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('bg-background')

    rerender(
      <Navigation variant="colored">
        <DemoContent />
      </Navigation>
    )
    expect(nav).toHaveClass('bg-primary')

    rerender(
      <Navigation variant="transparent">
        <DemoContent />
      </Navigation>
    )
    expect(nav).toHaveClass('bg-transparent')
  })

  it('supports fixed positioning', () => {
    render(
      <Navigation position="fixed">
        <DemoContent />
      </Navigation>
    )

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('fixed')
    expect(nav).toHaveClass('top-0')
  })

  it('handles dropdown interaction', () => {
    render(
      <Navigation>
        <DemoContent />
      </Navigation>
    )

    const productsButton = screen.getByText('Products')
    fireEvent.click(productsButton)

    expect(screen.getByText('Analytics')).toBeVisible()
    expect(screen.getByText('Automation')).toBeVisible()
  })

  it('is accessible', () => {
    render(
      <Navigation>
        <DemoContent />
      </Navigation>
    )

    // Check for proper ARIA attributes
    expect(screen.getByRole('navigation')).toHaveAttribute(
      'aria-label',
      'Main navigation'
    )

    // Check toggle button accessibility
    const toggleButton = screen.getByRole('button', { name: /open menu/i })
    expect(toggleButton).toHaveAttribute('aria-label')

    // Check dropdown accessibility
    const productsButton = screen.getByText('Products').closest('button')
    expect(productsButton).toHaveAttribute('aria-expanded')
  })
})
