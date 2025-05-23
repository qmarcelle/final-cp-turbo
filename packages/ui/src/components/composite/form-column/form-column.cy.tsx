/// <reference types="cypress" />
import React from 'react'
import { FormColumn } from '.' // Corrected import

describe('FormColumn', () => {
  it('renders children in a single column', () => {
    const MockChild = () => <div className="h-10 w-full bg-gray-200" />

    cy.mount(
      <FormColumn data-cy="test-column">
        <MockChild />
        <MockChild />
      </FormColumn>
    )

    cy.get('[data-cy="test-column"]')
      .should('exist')
      .and('have.class', 'grid-cols-1')
    
    // Verify children are stacked vertically
    cy.get('.h-10').should('have.length', 2)
  })
}) 