// ***********************************************************
// This file is processed and loaded automatically before your component test files.
//
// This is a great place to put global configuration and behavior that modifies Cypress.
//
// For comprehensive examples of custom commands please read:
// https://on.cypress.io/custom-commands
// ***********************************************************

// Register a custom command for component testing
// cypress.Commands.add('login', (email, password) => { ... });

// Alternatively, we can have TypeScript definitions:
declare global {
  namespace Cypress {
    interface Chainable {
      // mount(component: React.ReactElement): Chainable<Element>;
      // login(email: string, password: string): Chainable<Element>;
    }
  }
}

// Register imports for component testing support
import './commands'

// Import Cypress commands and global type definitions
import { mount } from 'cypress/react';
import 'cypress/react';

// Import global styles if needed
// import '../../src/styles/globals.css';

// Make the mount command available
Cypress.Commands.add('mount', mount);

// Add custom commands here
// Example: Cypress.Commands.add('login', (email, password) => { ... });

// Declare global Cypress types
declare global {
  namespace Cypress {
    interface Chainable {
      // Add types for custom commands here
      mount: typeof mount;
      // Example: login(email: string, password: string): Chainable<Element>;
    }
  }
}

// This file is processed and loaded automatically before your test files 