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