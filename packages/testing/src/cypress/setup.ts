/**
 * Cypress Setup and Common Commands
 * This file contains utilities and custom commands for Cypress testing
 */
/// <reference types="cypress" />
/// <reference types="cypress-axe" />

import { initializeMsw } from '../msw';

// Initialize MSW for API mocking in Cypress
if (typeof window !== 'undefined') {
  initializeMsw().catch((err: Error) => {
    console.error('Error initializing MSW in Cypress:', err);
  });
}

// Custom command definitions
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select by data-testid attribute.
       * @example cy.getByTestId('greeting')
       */
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      
      /**
       * Custom command to login as a particular role
       * @example cy.loginAs('broker')
       */
      loginAs(role: 'admin' | 'broker' | 'employer' | 'guest'): Chainable<void>;
      
      /**
       * Custom command to navigate to a specific page
       * @example cy.navigateTo('dashboard')
       */
      navigateTo(page: string): Chainable<void>;
      
      /**
       * Command to login a user via the authentication API
       * @example cy.login('test@example.com', 'password')
       */
      login(email?: string, password?: string): Chainable<Element>;
      
      /**
       * Command to stub claim data for testing
       * @example cy.stubClaims(5, 'approved')
       */
      stubClaims(count?: number, status?: string): Chainable<Element>;
    }
  }
}

// Custom command implementations
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('loginAs', (role: 'admin' | 'broker' | 'employer' | 'guest') => {
  // Example implementation - to be customized based on your auth flow
  cy.log(`Logging in as ${role}`);
  
  // Example implementation:
  // cy.visit('/api/auth/signin');
  // cy.get('#username').type('test-user');
  // cy.get('#password').type('test-password');
  // cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('navigateTo', (page: string) => {
  cy.log(`Navigating to ${page}`);
  // Example: cy.visit(`/${page}`);
});

// Command to login a user via the authentication API
Cypress.Commands.add('login', (email = 'test@example.com', password = 'password') => {
  // Intercept the auth call to ensure successful login
  cy.intercept('POST', '/api/auth/login', {
    statusCode: 200,
    body: {
      token: 'fake-jwt-token',
      user: {
        id: 'user-1',
        email,
        name: 'Test User',
        role: 'broker',
        permissions: ['view:clients', 'view:plans'],
      },
    },
  }).as('loginRequest');

  // Visit login page
  cy.visit('/login');
  
  // Fill in login form
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  
  // Wait for the login request to complete
  cy.wait('@loginRequest');
  
  // Set the token in local storage to maintain session
  cy.window().then(window => {
    window.localStorage.setItem('auth-token', 'fake-jwt-token');
  });
});

// Command to stub claim data for testing
Cypress.Commands.add('stubClaims', (count = 5, status = 'approved') => {
  const claims = Array.from({ length: count }, (_, i) => ({
    id: `claim-${i}`,
    claimNumber: `CL1234567${i}`,
    status,
    type: 'medical',
    provider: {
      id: `PR00${i}`,
      name: `Provider ${i}`,
      network: 'in',
    },
    dateOfService: '2025-02-15',
    totalBilled: 1000 + i * 100,
    totalPaid: 800 + i * 80,
  }));

  cy.intercept('GET', '/api/claims*', {
    body: {
      claims,
      totalCount: count,
      page: 1,
      pageSize: 10,
      totalPages: 1,
    },
  }).as('getClaimsRequest');
});
