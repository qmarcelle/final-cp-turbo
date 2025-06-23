import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Typography } from './Typography'

expect.extend(toHaveNoViolations)

describe('Typography', () => {
  it('renders text content correctly', () => {
    render(<Typography>Hello World</Typography>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders different variants correctly', () => {
    const { rerender } = render(<Typography variant="h1">Heading 1</Typography>)
    expect(screen.getByText('Heading 1')).toHaveClass('text-4xl')

    rerender(<Typography variant="p">Paragraph</Typography>)
    expect(screen.getByText('Paragraph')).toHaveClass('leading-7')

    rerender(<Typography variant="blockquote">Quote</Typography>)
    expect(screen.getByText('Quote')).toHaveClass('border-l-2')
  })

  it('applies font weights correctly', () => {
    const { rerender } = render(<Typography weight="bold">Bold Text</Typography>)
    expect(screen.getByText('Bold Text')).toHaveClass('font-bold')

    rerender(<Typography weight="light">Light Text</Typography>)
    expect(screen.getByText('Light Text')).toHaveClass('font-light')
  })

  it('applies text alignment correctly', () => {
    const { rerender } = render(<Typography align="center">Centered</Typography>)
    expect(screen.getByText('Centered')).toHaveClass('text-center')

    rerender(<Typography align="right">Right</Typography>)
    expect(screen.getByText('Right')).toHaveClass('text-right')
  })

  it('applies text decorations correctly', () => {
    const { rerender } = render(
      <Typography decoration="underline">Underlined</Typography>
    )
    expect(screen.getByText('Underlined')).toHaveClass('underline')

    rerender(<Typography decoration="lineThrough">Strikethrough</Typography>)
    expect(screen.getByText('Strikethrough')).toHaveClass('line-through')
  })

  it('applies text transformations correctly', () => {
    const { rerender } = render(
      <Typography transform="uppercase">Upper</Typography>
    )
    expect(screen.getByText('Upper')).toHaveClass('uppercase')

    rerender(<Typography transform="capitalize">capitalized</Typography>)
    expect(screen.getByText('capitalized')).toHaveClass('capitalize')
  })

  it('handles truncation correctly', () => {
    render(<Typography truncate>Long text that should truncate</Typography>)
    expect(screen.getByText('Long text that should truncate')).toHaveClass(
      'truncate'
    )
  })

  it('renders with prefix and suffix', () => {
    render(
      <Typography
        prefix={<span data-testid="prefix">Pre</span>}
        suffix={<span data-testid="suffix">Post</span>}
      >
        Content
      </Typography>
    )
    expect(screen.getByTestId('prefix')).toBeInTheDocument()
    expect(screen.getByTestId('suffix')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('supports asChild prop', () => {
    render(
      <Typography asChild>
        <a href="/test">Link Text</a>
      </Typography>
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/test')
    expect(link).toHaveTextContent('Link Text')
  })

  it('applies responsive styles correctly', () => {
    render(
      <Typography
        weightSm="bold"
        weightMd="normal"
        weightLg="semibold"
        alignSm="center"
        alignMd="left"
        alignLg="right"
      >
        Responsive Text
      </Typography>
    )
    const element = screen.getByText('Responsive Text')
    expect(element).toHaveClass('sm:font-bold')
    expect(element).toHaveClass('md:font-normal')
    expect(element).toHaveClass('lg:font-semibold')
    expect(element).toHaveClass('sm:text-center')
    expect(element).toHaveClass('md:text-left')
    expect(element).toHaveClass('lg:text-right')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLParagraphElement>()
    render(<Typography ref={ref}>Reference Text</Typography>)
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement)
  })

  it('renders semantic heading elements', () => {
    const { rerender } = render(<Typography variant="h1">H1</Typography>)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()

    rerender(<Typography variant="h2">H2</Typography>)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('is accessible', async () => {
    const { container } = render(
      <div>
        <Typography variant="h1">Main Heading</Typography>
        <Typography variant="p">
          Some paragraph text with <Typography variant="code">code</Typography>{' '}
          inside.
        </Typography>
        <Typography variant="blockquote">A quote for testing</Typography>
      </div>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
}) 