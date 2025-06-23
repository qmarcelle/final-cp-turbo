import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormSection  } from '../FormSection'

describe('FormSection', () => {
  const defaultProps = {
    title: 'Test Section',
    description: 'Test description',
    'data-cy': 'test-section',
  }

  it('renders title and description', () => {
    render(
      <FormSection {...defaultProps}>
        <div>Test content</div>
      </FormSection>
    )

    expect(screen.getByText('Test Section')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('shows optional badge when isOptional is true', () => {
    render(
      <FormSection {...defaultProps} isOptional>
        <div>Test content</div>
      </FormSection>
    )

    expect(screen.getByText('Optional')).toBeInTheDocument()
  })

  it('does not show optional badge by default', () => {
    render(
      <FormSection {...defaultProps}>
        <div>Test content</div>
      </FormSection>
    )

    expect(screen.queryByText('Optional')).not.toBeInTheDocument()
  })

  it('collapses content when isCollapsible is true and collapse button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <FormSection {...defaultProps} isCollapsible defaultExpanded>
        <div>Test content</div>
      </FormSection>
    )

    // Content should be visible initially
    expect(screen.getByText('Test content')).toBeVisible()

    // Click collapse button
    const collapseButton = screen.getByRole('button', {
      name: /collapse section/i,
    })
    await user.click(collapseButton)

    // Content should be hidden
    expect(screen.getByText('Test content')).not.toBeVisible()
  })

  it('expands content when isCollapsible is true and expand button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <FormSection {...defaultProps} isCollapsible defaultExpanded={false}>
        <div>Test content</div>
      </FormSection>
    )

    // Content should be hidden initially
    expect(screen.getByText('Test content')).not.toBeVisible()

    // Click expand button
    const expandButton = screen.getByRole('button', {
      name: /expand section/i,
    })
    await user.click(expandButton)

    // Content should be visible
    expect(screen.getByText('Test content')).toBeVisible()
  })

  it('applies custom className', () => {
    render(
      <FormSection {...defaultProps} className="custom-class">
        <div>Test content</div>
      </FormSection>
    )

    const section = screen.getByTestId('test-section')
    expect(section).toHaveClass('custom-class')
  })

  it('renders with data-cy attribute', () => {
    render(
      <FormSection {...defaultProps}>
        <div>Test content</div>
      </FormSection>
    )

    expect(screen.getByTestId('test-section')).toBeInTheDocument()
    expect(screen.getByTestId('test-section-title')).toBeInTheDocument()
    expect(screen.getByTestId('test-section-description')).toBeInTheDocument()
  })
}) 