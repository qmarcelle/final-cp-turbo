import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Layout } from './Layout'

expect.extend(toHaveNoViolations)

describe('Layout', () => {
  describe('Container', () => {
    it('renders with default props', () => {
      render(<Layout.Container>Content</Layout.Container>)
      expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('applies size classes correctly', () => {
      const { rerender } = render(
        <Layout.Container size="sm">Small</Layout.Container>
      )
      expect(screen.getByText('Small')).toHaveClass('max-w-screen-sm')

      rerender(<Layout.Container size="lg">Large</Layout.Container>)
      expect(screen.getByText('Large')).toHaveClass('max-w-screen-lg')
    })

    it('applies padding classes correctly', () => {
      const { rerender } = render(
        <Layout.Container padding="sm">Small</Layout.Container>
      )
      expect(screen.getByText('Small')).toHaveClass('px-4')

      rerender(<Layout.Container padding="lg">Large</Layout.Container>)
      expect(screen.getByText('Large')).toHaveClass('px-8')
    })
  })

  describe('Flex', () => {
    it('renders with default props', () => {
      render(<Layout.Flex>Content</Layout.Flex>)
      expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('applies direction classes correctly', () => {
      const { rerender } = render(
        <Layout.Flex direction="row">Row</Layout.Flex>
      )
      expect(screen.getByText('Row')).toHaveClass('flex-row')

      rerender(<Layout.Flex direction="column">Column</Layout.Flex>)
      expect(screen.getByText('Column')).toHaveClass('flex-col')
    })

    it('applies responsive direction classes', () => {
      render(
        <Layout.Flex
          direction="column"
          directionMd="row"
        >
          Content
        </Layout.Flex>
      )
      const element = screen.getByText('Content')
      expect(element).toHaveClass('flex-col')
      expect(element).toHaveClass('md:flex-row')
    })

    it('applies alignment classes correctly', () => {
      const { rerender } = render(
        <Layout.Flex align="center">Center</Layout.Flex>
      )
      expect(screen.getByText('Center')).toHaveClass('items-center')

      rerender(<Layout.Flex align="end">End</Layout.Flex>)
      expect(screen.getByText('End')).toHaveClass('items-end')
    })

    it('applies justify classes correctly', () => {
      const { rerender } = render(
        <Layout.Flex justify="between">Between</Layout.Flex>
      )
      expect(screen.getByText('Between')).toHaveClass('justify-between')

      rerender(<Layout.Flex justify="around">Around</Layout.Flex>)
      expect(screen.getByText('Around')).toHaveClass('justify-around')
    })

    it('applies wrap classes correctly', () => {
      render(<Layout.Flex wrap="wrap">Wrap</Layout.Flex>)
      expect(screen.getByText('Wrap')).toHaveClass('flex-wrap')
    })

    it('applies gap classes correctly', () => {
      render(<Layout.Flex gap={4}>Gap</Layout.Flex>)
      expect(screen.getByText('Gap')).toHaveClass('gap-4')
    })
  })

  describe('Grid', () => {
    it('renders with default props', () => {
      render(<Layout.Grid>Content</Layout.Grid>)
      expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('applies column classes correctly', () => {
      const { rerender } = render(
        <Layout.Grid cols={3}>Three</Layout.Grid>
      )
      expect(screen.getByText('Three')).toHaveClass('grid-cols-3')

      rerender(<Layout.Grid cols={6}>Six</Layout.Grid>)
      expect(screen.getByText('Six')).toHaveClass('grid-cols-6')
    })

    it('applies responsive column classes', () => {
      render(
        <Layout.Grid
          cols={1}
          colsMd={2}
          colsLg={3}
        >
          Content
        </Layout.Grid>
      )
      const element = screen.getByText('Content')
      expect(element).toHaveClass('grid-cols-1')
      expect(element).toHaveClass('md:grid-cols-2')
      expect(element).toHaveClass('lg:grid-cols-3')
    })

    it('applies gap classes correctly', () => {
      render(<Layout.Grid gap={4}>Gap</Layout.Grid>)
      expect(screen.getByText('Gap')).toHaveClass('gap-4')
    })

    it('applies flow classes correctly', () => {
      render(<Layout.Grid flow="dense">Dense</Layout.Grid>)
      expect(screen.getByText('Dense')).toHaveClass('grid-flow-dense')
    })
  })

  describe('Row and Column', () => {
    it('renders Row with correct direction', () => {
      render(<Layout.Row>Row</Layout.Row>)
      expect(screen.getByText('Row')).toHaveClass('flex-row')
    })

    it('renders Column with correct direction', () => {
      render(<Layout.Column>Column</Layout.Column>)
      expect(screen.getByText('Column')).toHaveClass('flex-col')
    })
  })

  describe('Accessibility', () => {
    it('Container is accessible', async () => {
      const { container } = render(
        <Layout.Container>
          <h1>Heading</h1>
          <p>Content</p>
        </Layout.Container>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('Flex layout is accessible', async () => {
      const { container } = render(
        <Layout.Flex>
          <div>Item 1</div>
          <div>Item 2</div>
        </Layout.Flex>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('Grid layout is accessible', async () => {
      const { container } = render(
        <Layout.Grid cols={2}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
        </Layout.Grid>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
}) 