/**
 * Example of using MSW with Cypress Component Testing
 * 
 * This file demonstrates how to:
 * 1. Set up MSW in a Cypress component test
 * 2. Mock API responses for components that fetch data
 * 3. Override handlers during tests
 */
import React, { useState, useEffect } from 'react';
// Using Cypress's native mount command instead of the deprecated @cypress/react18 package
import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import { UserProfile, UserDashboard } from '../examples/msw-react-example';

// Define TypeScript interfaces for our data
interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface Client {
  id: string;
  name: string;
  status: string;
}

// Define MSW handlers for the tests
const handlers = [
  // GET user profile endpoint
  http.get('https://api.example.com/user', () => {
    return HttpResponse.json<User>({
      id: 'user123',
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'admin'
    });
  }),
  
  // GET clients endpoint
  http.get('https://api.example.com/clients', () => {
    return HttpResponse.json<Client[]>([
      { id: 'client1', name: 'ACME Corp', status: 'active' },
      { id: 'client2', name: 'Globex', status: 'pending' },
      { id: 'client3', name: 'Initech', status: 'inactive' }
    ]);
  })
];

// Create the MSW worker
const worker = setupWorker(...handlers);

// Start the worker before tests
worker.start({ onUnhandledRequest: 'bypass' });

// Create a simple HTML user component to test
const HtmlUserComponent = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://api.example.com/user');
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      <button onClick={fetchUser} data-cy="fetch-button">
        {loading ? 'Loading...' : 'Fetch User Data'}
      </button>
      
      {error && <div data-cy="error">{error}</div>}
      
      {userData && (
        <div data-cy="user-data">
          <p data-cy="user-name">Name: {userData.name}</p>
          <p data-cy="user-email">Email: {userData.email}</p>
          {userData.role && <p data-cy="user-role">Role: {userData.role}</p>}
        </div>
      )}
    </div>
  );
};

// Cypress tests
describe('MSW with Cypress Component Example', () => {
  it('simple HTML component should fetch and display user data', () => {
    // Mount the component using Cypress' built-in mount function
    cy.mount(<HtmlUserComponent />);
    
    // Click the fetch button
    cy.get('[data-cy=fetch-button]').click();
    
    // Verify loading state shows briefly (if we can catch it)
    cy.get('[data-cy=fetch-button]').should('contain', 'Loading');
    
    // Verify data is displayed after loading
    cy.get('[data-cy=user-data]').should('be.visible');
    cy.get('[data-cy=user-name]').should('contain', 'Jane Doe');
    cy.get('[data-cy=user-email]').should('contain', 'jane@example.com');
    cy.get('[data-cy=user-role]').should('contain', 'admin');
  });
  
  it('UserProfile component should load data when button is clicked', () => {
    // Mount the component from our example file
    cy.mount(<UserProfile />);
    
    // Click the load button
    cy.get('[data-testid=load-profile-button]').click();
    
    // Verify loading indicator appears
    cy.get('[data-testid=loading-indicator]').should('be.visible');
    
    // Verify data appears after loading
    cy.get('[data-testid=user-data]').should('be.visible');
    cy.get('[data-testid=user-name]').should('contain', 'Jane Doe');
    cy.get('[data-testid=user-email]').should('contain', 'jane@example.com');
  });
  
  it('UserDashboard should load data automatically on mount', () => {
    // Mount the dashboard component
    cy.mount(<UserDashboard />);
    
    // Verify initial loading state
    cy.get('[data-testid=dashboard-loading]').should('be.visible');
    
    // Verify welcome message appears after loading
    cy.get('[data-testid=dashboard-welcome]').should('be.visible')
      .and('contain', 'Jane Doe')
      .and('contain', 'admin');
    
    // Verify client list is displayed
    cy.get('[data-testid=client-list]').should('be.visible');
    cy.get('[data-testid=client-list] li').should('have.length', 3);
  });
  
  it('should allow overriding handlers mid-test', () => {
    // Override the user handler for this test only
    worker.use(
      http.get('https://api.example.com/user', () => {
        return HttpResponse.json<User>({
          id: 'user999',
          name: 'Override User',
          email: 'override@example.com',
          role: 'developer'
        });
      })
    );
    
    // Mount the component
    cy.mount(<UserProfile />);
    
    // Click the load button  
    cy.get('[data-testid=load-profile-button]').click();
    
    // Verify the overridden data appears
    cy.get('[data-testid=user-name]').should('contain', 'Override User');
    cy.get('[data-testid=user-email]').should('contain', 'override@example.com');
    cy.get('[data-testid=user-role]').should('contain', 'developer');
  });
  
  it('should handle API errors', () => {
    // Override with an error response
    worker.use(
      http.get('https://api.example.com/user', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    
    // Mount the component
    cy.mount(<UserProfile />);
    
    // Click the load button
    cy.get('[data-testid=load-profile-button]').click();
    
    // Verify error message appears
    cy.get('[data-testid=error-message]').should('be.visible')
      .and('contain', 'API error: 500');
  });
}); 