/// <reference types="cypress" />
/**
 * Example Cypress component test for React components using MSW
 * 
 * This demonstrates how to use MSW in Cypress component tests
 * to test components that make API requests.
 */
import React from 'react';
import { mount } from 'cypress/react';
import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';

// Import our components to test
import { UserProfile, UserDashboard } from './msw-react-example';

// Create MSW worker
const worker = setupWorker(
  // Mock the user profile endpoint
  http.get('/api/user/profile', () => {
    return HttpResponse.json({
      id: '123',
      name: 'Jane Broker',
      email: 'jane@example.com',
      role: 'broker'
    });
  }),
  
  // Mock the broker clients endpoint
  http.get('/api/broker/clients', () => {
    return HttpResponse.json({
      clients: [
        { id: '1', name: 'Acme Corp', status: 'Active' },
        { id: '2', name: 'Example Inc', status: 'Active' },
        { id: '3', name: 'Test LLC', status: 'Pending' }
      ]
    });
  }),
  
  // Mock the employer clients endpoint
  http.get('/api/employer/clients', () => {
    return HttpResponse.json({
      clients: [
        { id: '101', name: 'HR Department', status: 'Active' },
        { id: '102', name: 'Benefits Team', status: 'Active' }
      ]
    });
  })
);

describe('UserProfile Component with MSW', () => {
  beforeEach(() => {
    // Start MSW worker before each test
    cy.wrap(worker.start({ onUnhandledRequest: 'bypass' }));
  });

  afterEach(() => {
    // Stop MSW worker after each test
    cy.wrap(worker.stop());
  });

  it('loads and displays user data when button is clicked', () => {
    // Mount the component
    mount(<React.Fragment><UserProfile /></React.Fragment>);
    
    // Verify initial state
    cy.get('[data-testid="fetch-profile-btn"]').should('be.visible');
    cy.get('[data-testid="profile-data"]').should('not.exist');
    
    // Click the load button
    cy.get('[data-testid="fetch-profile-btn"]').click();
    
    // Check loading state
    cy.get('[data-testid="fetch-profile-btn"]').should('be.disabled');
    
    // Wait for data to load and verify
    cy.get('[data-testid="profile-data"]').should('be.visible');
    
    // Verify the correct data is displayed
    cy.get('[data-testid="user-name"]').should('contain', 'Jane Broker');
    cy.get('[data-testid="user-email"]').should('contain', 'jane@example.com');
    cy.get('[data-testid="user-role"]').should('contain', 'broker');
  });
  
  it('shows error message when API fails', () => {
    // Override the handler for this test to return an error
    worker.use(
      http.get('/api/user/profile', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    
    // Mount the component
    mount(<React.Fragment><UserProfile /></React.Fragment>);
    
    // Click the load button
    cy.get('[data-testid="fetch-profile-btn"]').click();
    
    // Wait for error message and verify
    cy.get('[data-testid="error-message"]').should('be.visible');
    cy.get('[data-testid="error-message"]').should('contain', 'Error fetching user data: 500');
  });
});

describe('UserDashboard Component with MSW', () => {
  beforeEach(() => {
    // Start MSW worker before each test
    cy.wrap(worker.start({ onUnhandledRequest: 'bypass' }));
  });

  afterEach(() => {
    // Stop MSW worker after each test
    cy.wrap(worker.stop());
  });
  
  it('automatically loads user profile on mount', () => {
    // Mount the component
    mount(<React.Fragment><UserDashboard /></React.Fragment>);
    
    // Initially should show loading
    cy.get('[data-testid="loading-user"]').should('be.visible');
    
    // Wait for data to load and verify
    cy.get('[data-testid="user-dashboard"]').should('be.visible');
    
    // Verify the user banner shows the correct name
    cy.contains('Welcome, Jane Broker').should('be.visible');
  });
  
  it('loads broker clients when the load button is clicked', () => {
    // Mount the component
    mount(<React.Fragment><UserDashboard /></React.Fragment>);
    
    // Wait for user data to load
    cy.get('[data-testid="user-dashboard"]').should('be.visible');
    
    // Click the load clients button
    cy.get('[data-testid="load-clients-btn"]').click();
    
    // Wait for clients to load
    cy.get('[data-testid="client-list"]').should('be.visible');
    
    // Verify the client list has the expected items
    cy.contains('Acme Corp').should('be.visible');
    cy.contains('Example Inc').should('be.visible');
    cy.contains('Test LLC').should('be.visible');
    
    // Verify the status labels
    cy.contains('Active').should('have.length', 2);
    cy.contains('Pending').should('be.visible');
  });
  
  it('shows error when client loading fails', () => {
    // Override the handler for this test to return an error
    worker.use(
      http.get('/api/broker/clients', () => {
        return new HttpResponse(null, { status: 403 });
      })
    );
    
    // Mount the component
    mount(<React.Fragment><UserDashboard /></React.Fragment>);
    
    // Wait for user data to load
    cy.get('[data-testid="user-dashboard"]').should('be.visible');
    
    // Click the load clients button
    cy.get('[data-testid="load-clients-btn"]').click();
    
    // Wait for error message and verify
    cy.get('[data-testid="clients-error"]').should('be.visible');
    cy.get('[data-testid="clients-error"]').should('contain', 'Error fetching clients: 403');
  });
  
  it('loads employer clients for employer role', () => {
    // Override the user profile handler to return employer role
    worker.use(
      http.get('/api/user/profile', () => {
        return HttpResponse.json({
          id: '456',
          name: 'John Employer',
          email: 'john@employer.com',
          role: 'employer'
        });
      })
    );
    
    // Mount the component
    mount(<React.Fragment><UserDashboard /></React.Fragment>);
    
    // Wait for user data to load
    cy.get('[data-testid="user-dashboard"]').should('be.visible');
    
    // Verify the employer name is shown
    cy.contains('Welcome, John Employer').should('be.visible');
    
    // Click the load clients button
    cy.get('[data-testid="load-clients-btn"]').click();
    
    // Wait for clients to load
    cy.get('[data-testid="client-list"]').should('be.visible');
    
    // Verify the employer-specific clients are shown
    cy.contains('HR Department').should('be.visible');
    cy.contains('Benefits Team').should('be.visible');
    
    // Verify Acme Corp (from broker clients) is not shown
    cy.contains('Acme Corp').should('not.exist');
  });
}); 