import React from 'react'
import { FormInlineGroup } from './FormInlineGroup'
import { Input  } from '../../foundation/input/input'
import { z } from 'zod'
import { Control } from 'react-hook-form'

const schema = z.object({
  field1: z.string(),
  field2: z.string()
})

type TestForm = z.infer<typeof schema>

describe('FormInlineGroup', () => {
  const MockChild = () => <div className="h-10 w-full bg-gray-200" />

  it('renders inline form fields with label', () => {
    cy.mount(
      <FormInlineGroup
        label="Test Group"
        required
        data-cy="test-group"
      >
        <MockChild />
        <MockChild />
      </FormInlineGroup>
    )

    cy.getByCy('test-group-label').should('contain', 'Test Group')
    cy.getByCy('test-group').find('.h-10').should('have.length', 2)
  })

  it('shows error message when provided', () => {
    cy.mount(
      <FormInlineGroup
        label="Test Group"
        error="Test error"
        data-cy="test-group"
      >
        <MockChild />
        <MockChild />
      </FormInlineGroup>
    )

    cy.getByCy('test-group-error').should('contain', 'Test error')
  })

  it('shows description when provided', () => {
    cy.mount(
      <FormInlineGroup
        label="Test Group"
        description="Test description"
        data-cy="test-group"
      >
        <MockChild />
        <MockChild />
      </FormInlineGroup>
    )

    cy.getByCy('test-group-description').should('contain', 'Test description')
  })
}) 