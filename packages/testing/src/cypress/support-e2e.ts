/**
 * Base support file for Cypress E2E tests
 * Import this file in your app's Cypress support/e2e.ts file
 */
/// <reference types="cypress" />
/// <reference types="cypress-axe" />
import '@testing-library/cypress/add-commands';
import '@cypress/code-coverage/support';
import 'cypress-axe';
import 'cypress-real-events';

// Import our custom commands
import './setup';

// Register your global E2E hooks here
beforeEach(() => {
  // You can add global setup for all E2E tests here
  cy.log('E2E test started');
});

// Add any E2E specific custom commands here
// Example of adding a custom command with proper typing
declare global {
  namespace Cypress {
    interface Chainable {
      visitWithAuth(url: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('visitWithAuth', (url: string) => {
  // Example implementation for authenticated page visits
  cy.log(`Visiting ${url} with authentication`);
  cy.visit(url);
});

// Preserve cookies between tests
// @ts-ignore - Cypress types are not up to date
Cypress.Cookies.defaults({
  preserve: ['auth-token', 'session', 'XSRF-TOKEN'],
});

// Disable specific types of console errors during tests
Cypress.on('uncaught:exception', (err) => {
  // Return false to prevent Cypress from failing the test on uncaught exceptions
  // This is helpful for issues with third-party scripts
  const skipErrors = [
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
  ];
  
  if (skipErrors.some(errMsg => err.message.includes(errMsg))) {
    return false;
  }
  
  // Let Cypress handle other errors normally
  return true;
});
