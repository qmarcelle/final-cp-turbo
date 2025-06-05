/// <reference types="jest" />
/**
 * Example Jest test for React components using MSW
 * 
 * This demonstrates how to use MSW in Jest tests with React Testing Library
 * to test components that make API requests.
 */
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

// Import our components to test
import { UserProfile, UserDashboard } from './msw-react-example';

// Setup MSW server with initial handlers
const server = setupServer(
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

describe('UserProfile Component', () => {
  // Start MSW Server before tests
  beforeAll(() => server.listen());
  
  // Reset handlers after each test
  afterEach(() => server.resetHandlers());
  
  // Clean up after all tests
  afterAll(() => server.close());
  
  it('loads and displays user data when button is clicked', async () => {
    // Set up user event for interactions
    const user = userEvent.setup();
    
    // Render the component
    render(<React.Fragment><UserProfile /></React.Fragment>);
    
    // Verify initial state
    expect(screen.getByTestId('fetch-profile-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('profile-data')).not.toBeInTheDocument();
    
    // Click the load button
    await user.click(screen.getByTestId('fetch-profile-btn'));
    
    // Check loading state
    expect(screen.getByTestId('fetch-profile-btn')).toBeDisabled();
    
    // Wait for data to load and verify
    await waitFor(() => {
      expect(screen.getByTestId('profile-data')).toBeInTheDocument();
    });
    
    // Verify the correct data is displayed
    expect(screen.getByTestId('user-name')).toHaveTextContent('Jane Broker');
    expect(screen.getByTestId('user-email')).toHaveTextContent('jane@example.com');
    expect(screen.getByTestId('user-role')).toHaveTextContent('broker');
  });
  
  it('shows error message when API fails', async () => {
    // Override the handler for this test to return an error
    server.use(
      http.get('/api/user/profile', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    
    // Set up user event
    const user = userEvent.setup();
    
    // Render the component
    render(<React.Fragment><UserProfile /></React.Fragment>);
    
    // Click the load button
    await user.click(screen.getByTestId('fetch-profile-btn'));
    
    // Wait for error message and verify
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
    
    expect(screen.getByTestId('error-message')).toHaveTextContent('Error fetching user data: 500');
  });
});

describe('UserDashboard Component', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  
  it('automatically loads user profile on mount', async () => {
    // Render the component
    render(<React.Fragment><UserDashboard /></React.Fragment>);
    
    // Initially should show loading
    expect(screen.getByTestId('loading-user')).toBeInTheDocument();
    
    // Wait for data to load and verify
    await waitFor(() => {
      expect(screen.getByTestId('user-dashboard')).toBeInTheDocument();
    });
    
    // Verify the user banner shows the correct name
    expect(screen.getByText('Welcome, Jane Broker')).toBeInTheDocument();
  });
  
  it('loads broker clients when the load button is clicked', async () => {
    // Set up user event
    const user = userEvent.setup();
    
    // Render the component
    render(<React.Fragment><UserDashboard /></React.Fragment>);
    
    // Wait for user data to load
    await waitFor(() => {
      expect(screen.getByTestId('user-dashboard')).toBeInTheDocument();
    });
    
    // Click the load clients button
    await user.click(screen.getByTestId('load-clients-btn'));
    
    // Wait for clients to load
    await waitFor(() => {
      expect(screen.getByTestId('client-list')).toBeInTheDocument();
    });
    
    // Verify the client list has the expected items
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Example Inc')).toBeInTheDocument();
    expect(screen.getByText('Test LLC')).toBeInTheDocument();
    
    // Verify the status labels
    expect(screen.getAllByText('Active')).toHaveLength(2);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });
  
  it('shows error when client loading fails', async () => {
    // Override the handler for this test to return an error
    server.use(
      http.get('/api/broker/clients', () => {
        return new HttpResponse(null, { status: 403 });
      })
    );
    
    // Set up user event
    const user = userEvent.setup();
    
    // Render the component
    render(<React.Fragment><UserDashboard /></React.Fragment>);
    
    // Wait for user data to load
    await waitFor(() => {
      expect(screen.getByTestId('user-dashboard')).toBeInTheDocument();
    });
    
    // Click the load clients button
    await user.click(screen.getByTestId('load-clients-btn'));
    
    // Wait for error message and verify
    await waitFor(() => {
      expect(screen.getByTestId('clients-error')).toBeInTheDocument();
    });
    
    expect(screen.getByTestId('clients-error')).toHaveTextContent('Error fetching clients: 403');
  });
  
  it('loads employer clients for employer role', async () => {
    // Override the user profile handler to return employer role
    server.use(
      http.get('/api/user/profile', () => {
        return HttpResponse.json({
          id: '456',
          name: 'John Employer',
          email: 'john@employer.com',
          role: 'employer'
        });
      })
    );
    
    // Set up user event
    const user = userEvent.setup();
    
    // Render the component
    render(<React.Fragment><UserDashboard /></React.Fragment>);
    
    // Wait for user data to load
    await waitFor(() => {
      expect(screen.getByTestId('user-dashboard')).toBeInTheDocument();
    });
    
    // Verify the employer name is shown
    expect(screen.getByText('Welcome, John Employer')).toBeInTheDocument();
    
    // Click the load clients button
    await user.click(screen.getByTestId('load-clients-btn'));
    
    // Wait for clients to load
    await waitFor(() => {
      expect(screen.getByTestId('client-list')).toBeInTheDocument();
    });
    
    // Verify the employer-specific clients are shown
    expect(screen.getByText('HR Department')).toBeInTheDocument();
    expect(screen.getByText('Benefits Team')).toBeInTheDocument();
    
    // Verify Acme Corp (from broker clients) is not shown
    expect(screen.queryByText('Acme Corp')).not.toBeInTheDocument();
  });
}); 