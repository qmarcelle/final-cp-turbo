/**
 * Base support file for Cypress Component tests
 * Import this file in your app's Cypress support/component.ts file
 */
/// <reference types="cypress" />
/// <reference types="cypress-axe" />
import '@testing-library/cypress/add-commands';
import '@cypress/code-coverage/support';
import 'cypress-axe';
import 'cypress-real-events';

// Import React mount function
import { mount } from 'cypress/react';

// Import our custom commands
import './setup';

// Register component testing
// This ensures React component testing is properly configured
beforeEach(() => {
  // You can add component-specific setup here
  cy.log('Component test started');
});

// Add accessibility testing commands if needed
Cypress.Commands.add('checkA11y', () => {
  cy.injectAxe();
  cy.checkA11y();
});

// Add mount command
Cypress.Commands.add('mount', mount);

// Add mount command typing
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mount a React component in the DOM for testing
       * @param component - React component to mount
       * @param options - Options to pass to the mount function
       */
      mount: typeof mount
    }
  }
}

Cypress.on('test:after:run', (_attributes) => {
  if (Cypress.config('isInteractive')) {
    return;
  }
  
  // Custom test reporting or logging can be added here
});

// You can add component-specific commands here

