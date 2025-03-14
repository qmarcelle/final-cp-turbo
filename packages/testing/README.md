# Testing Strategies for Consumer Portals

This document outlines the recommended testing strategies and best practices for the Consumer Portals application.

## Overview

Our testing strategy follows a layered approach:

1. **Unit Tests** - Test individual components and functions in isolation
2. **Component Tests** - Test React components with Cypress Component Testing
3. **Integration Tests** - Test interactions between components/modules
4. **End-to-End Tests** - Test complete user flows with Cypress

## Technologies

- **Jest** - For unit and integration tests
- **Cypress** - For component and E2E tests
- **Testing Library** - For component interaction in tests
- **MSW (Mock Service Worker)** - For API mocking

## Project Structure

```
packages/
├── testing/               # Testing utilities and configurations
│   ├── src/
│   │   ├── cypress/       # Cypress configuration and commands
│   │   ├── jest/          # Jest configuration
│   │   ├── msw/           # MSW handlers for API mocking
│   │   └── utils/         # Testing utilities
│   └── tsconfig.json      # TypeScript configuration for testing
└── [each package]/
    ├── src/
    │   ├── __tests__/     # Unit and integration tests
    │   └── components/
    │       └── __tests__/ # Component-specific tests
    ├── cypress/
    │   ├── e2e/           # E2E test specs
    │   └── component/     # Component test specs
    └── tsconfig.json      # Package-specific TypeScript config
```

## Testing Best Practices

### Unit Tests

- Test individual functions, hooks, and utilities
- Mock dependencies and external services
- Focus on business logic and edge cases
- Keep tests fast and deterministic

```typescript
// Example unit test
describe('calculatePremium', () => {
  it('should calculate correct premium for standard plan', () => {
    expect(calculatePremium({ age: 30, plan: 'standard' })).toBe(150);
  });
});
```

### Component Tests

- Use Cypress Component Testing for isolated component testing
- Test component rendering, user interactions, and state changes
- Use data-testid attributes for reliable selectors

```typescript
// Example component test
describe('LoginForm', () => {
  it('should display validation errors for empty fields', () => {
    cy.mount(<LoginForm />);
    cy.get('button[type="submit"]').click();
    cy.contains('Email is required').should('be.visible');
  });
});
```

### Integration Tests

- Test interactions between multiple components or modules
- Focus on data flow and component communication
- Use mock API responses for consistent results

```typescript
// Example integration test
describe('Authentication Flow', () => {
  it('should update UI state after successful login', async () => {
    render(<AuthProvider><LoginPage /></AuthProvider>);
    // Test login flow and resulting state
  });
});
```

### End-to-End Tests

- Test complete user journeys and workflows
- Focus on critical paths and business requirements
- Use realistic data and environment configurations

```typescript
// Example E2E test
describe('Broker Portal', () => {
  beforeEach(() => {
    cy.loginAs('broker');
  });

  it('should display client list and allow filtering', () => {
    cy.visit('/broker/clients');
    cy.getByTestId('client-filter').type('Acme');
    cy.getByTestId('client-list').should('contain', 'Acme Corp');
  });
});
```

## MSW (Mock Service Worker) Usage

### Quick Start

MSW is set up and ready to use in both Jest and Cypress tests. The package includes:

1. **Default handlers** - Common API endpoints defined in `packages/testing/src/msw/handlers.ts`
2. **Jest setup** - Server for Node.js environment tests 
3. **Cypress setup** - Browser worker for component tests
4. **Development utilities** - For using MSW during local development

### Usage in Jest Tests

```typescript
// Import the http and HttpResponse from MSW
import { http, HttpResponse } from 'msw';
// Import the test server
import { server } from '@cp/testing/msw';

describe('API Testing Example', () => {
  // Start the server before all tests
  beforeAll(() => server.listen());
  
  // Reset handlers after each test
  afterEach(() => server.resetHandlers());
  
  // Close server after all tests
  afterAll(() => server.close());

  it('should fetch user data', async () => {
    // Override handler for this test
    server.use(
      http.get('/api/user/profile', () => {
        return HttpResponse.json({
          id: '123',
          name: 'Test Broker',
          email: 'broker@example.com',
          role: 'broker'
        });
      })
    );

    // Make request
    const response = await fetch('/api/user/profile');
    const data = await response.json();

    // Assertions
    expect(response.status).toBe(200);
    expect(data.name).toBe('Test Broker');
    expect(data.role).toBe('broker');
  });
  
  it('should support POST requests with request body validation', async () => {
    server.use(
      http.post('/api/clients', async ({ request }) => {
        // Get the request body
        const body = await request.json();
        
        // Validate request body
        if (!body.name) {
          return new HttpResponse(
            JSON.stringify({ error: 'Client name is required' }),
            { status: 400 }
          );
        }
        
        // Return success response
        return HttpResponse.json(
          { 
            id: 'new-id', 
            name: body.name,
            createdAt: new Date().toISOString()
          },
          { status: 201 }
        );
      })
    );
    
    // Test with invalid data
    const badResponse = await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    expect(badResponse.status).toBe(400);
    
    // Test with valid data
    const goodResponse = await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'New Client' })
    });
    const data = await goodResponse.json();
    expect(goodResponse.status).toBe(201);
    expect(data.name).toBe('New Client');
  });
});
```

### Testing React Components with MSW and Jest

When testing React components that make API calls, MSW provides a clean way to mock those requests:

```typescript
/// <reference types="jest" />
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

// Import the component to test
import { UserProfile } from './UserProfile';

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
    render(<UserProfile />);
    
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
    render(<UserProfile />);
    
    // Click the load button
    await user.click(screen.getByTestId('fetch-profile-btn'));
    
    // Wait for error message and verify
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
    
    expect(screen.getByTestId('error-message')).toHaveTextContent('Error fetching user data: 500');
  });
});
```

### Usage in Cypress Component Tests

```typescript
// Import the worker from the browser MSW setup
import { worker } from '@cp/testing/msw/browser';
import { http, HttpResponse } from 'msw';
import ClientList from './ClientList';

describe('ClientList Component', () => {
  beforeEach(() => {
    // Start the worker and reset handlers
    cy.wrap(worker.start({ onUnhandledRequest: 'bypass' }));
    
    // Add custom handlers for this test suite
    worker.use(
      http.get('/api/broker/clients', () => {
        return HttpResponse.json({
          clients: [
            { id: '1', name: 'Acme Corp', clientsCount: 150, status: 'active' },
            { id: '2', name: 'Example Inc', clientsCount: 75, status: 'active' },
            { id: '3', name: 'Test LLC', clientsCount: 42, status: 'pending' }
          ]
        });
      })
    );
  });
  
  afterEach(() => {
    // Stop the worker after each test
    cy.wrap(worker.stop());
  });

  it('displays client list with correct data', () => {
    // Mount the component
    cy.mount(<ClientList />);
    
    // Verify the data is displayed correctly
    cy.contains('Acme Corp').should('be.visible');
    cy.contains('150 clients').should('be.visible');
    cy.contains('Example Inc').should('be.visible');
    cy.contains('Test LLC').should('be.visible');
    cy.contains('pending').should('be.visible');
  });
  
  it('filters clients correctly', () => {
    cy.mount(<ClientList />);
    
    // Type in the filter
    cy.get('[placeholder="Search clients..."]').type('Acme');
    
    // Verify only Acme Corp is visible
    cy.contains('Acme Corp').should('be.visible');
    cy.contains('Example Inc').should('not.exist');
    cy.contains('Test LLC').should('not.exist');
  });
});
```

### Testing React Components with MSW and Cypress

Here's a more detailed example of testing React components with MSW in Cypress:

```typescript
/// <reference types="cypress" />
import React from 'react';
import { mount } from 'cypress/react';
import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';

// Import the component to test
import { UserDashboard } from './UserDashboard';

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
  })
);

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
    mount(<UserDashboard />);
    
    // Initially should show loading
    cy.get('[data-testid="loading-user"]').should('be.visible');
    
    // Wait for data to load and verify
    cy.get('[data-testid="user-dashboard"]').should('be.visible');
    
    // Verify the user banner shows the correct name
    cy.contains('Welcome, Jane Broker').should('be.visible');
  });
  
  it('loads broker clients when the load button is clicked', () => {
    // Mount the component
    mount(<UserDashboard />);
    
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
  });
  
  it('shows error when client loading fails', () => {
    // Override the handler for this test to return an error
    worker.use(
      http.get('/api/broker/clients', () => {
        return new HttpResponse(null, { status: 403 });
      })
    );
    
    // Mount the component
    mount(<UserDashboard />);
    
    // Wait for user data to load
    cy.get('[data-testid="user-dashboard"]').should('be.visible');
    
    // Click the load clients button
    cy.get('[data-testid="load-clients-btn"]').click();
    
    // Wait for error message and verify
    cy.get('[data-testid="clients-error"]').should('be.visible');
    cy.get('[data-testid="clients-error"]').should('contain', 'Error fetching clients: 403');
  });
});
```

### Using MSW with Cypress E2E Tests

For E2E tests, it's generally better to use Cypress's native interception tools, but MSW can be used for specific cases:

```typescript
describe('Broker Dashboard E2E', () => {
  beforeEach(() => {
    // Use Cypress's intercept capability for E2E tests
    cy.intercept('GET', '/api/broker/clients', {
      fixture: 'clients.json'
    }).as('getClients');
    
    // Log in and visit the dashboard
    cy.loginAs('broker');
    cy.visit('/broker/dashboard');
  });
  
  it('displays client statistics', () => {
    cy.wait('@getClients');
    cy.findByTestId('client-count').should('contain', '267');
    cy.findByTestId('active-clients').should('contain', '245');
  });
});
```

### Using MSW in Development

To use MSW during local development:

```typescript
// In your app's entry point (e.g., main.tsx)
if (process.env.NODE_ENV === 'development') {
  import('@cp/testing/msw/init-msw').then(({ initMswForDevelopment }) => {
    initMswForDevelopment({
      // Enable console logging of intercepted requests
      enableLogging: true,
      // Show the MSW banner in the console
      showBanner: true,
      // Add any runtime-specific handlers
      customHandlers: [
        // Development-only handlers can be added here
      ]
    });
  });
}
```

### Adding New API Mocks

To add new API handlers:

1. **For shared handlers** used across multiple tests:

```typescript
// In packages/testing/src/msw/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Existing handlers...
  
  // New handler for broker clients
  http.get('/api/broker/clients', () => {
    return HttpResponse.json({
      clients: [
        { id: '1', name: 'Acme Corp', size: 'Large', status: 'Active' },
        { id: '2', name: 'Example Inc', size: 'Medium', status: 'Active' },
        { id: '3', name: 'Test LLC', size: 'Small', status: 'Pending' }
      ]
    });
  }),
  
  // Handler with dynamic response based on request
  http.get('/api/broker/clients/:id', ({ params }) => {
    const { id } = params;
    
    // Return different data based on ID
    if (id === '1') {
      return HttpResponse.json({
        id: '1',
        name: 'Acme Corp',
        details: {
          size: 'Large',
          employees: 500,
          industry: 'Technology'
        }
      });
    }
    
    // Default 404 for unknown IDs
    return new HttpResponse(null, { status: 404 });
  })
];
```

2. **For test-specific handlers**, add them in your test file:

```typescript
// In your test file
import { http, HttpResponse } from 'msw';
import { server } from '@cp/testing/msw';

beforeEach(() => {
  // Add custom handlers just for this test suite
  server.use(
    http.get('/api/specific-endpoint', () => {
      return HttpResponse.json({
        specificData: 'This is test-specific'
      });
    })
  );
});
```

### Advanced MSW Patterns

#### 1. Simulating network delays

```typescript
http.get('/api/slow-endpoint', async () => {
  // Delay the response by 2 seconds
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return HttpResponse.json({
    data: 'This response was delayed'
  });
});
```

#### 2. Simulating errors

```typescript
// Network error
http.get('/api/network-error', () => {
  return HttpResponse.error();
});

// Server error
http.get('/api/server-error', () => {
  return new HttpResponse(null, { status: 500 });
});

// Validation error
http.post('/api/validation-error', () => {
  return new HttpResponse(
    JSON.stringify({
      errors: [
        { field: 'email', message: 'Invalid email format' },
        { field: 'password', message: 'Password too short' }
      ]
    }),
    {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
});
```

#### 3. Request validation

```typescript
http.post('/api/validate-request', async ({ request, cookies }) => {
  // Check authentication
  const authToken = cookies.authToken || request.headers.get('Authorization');
  if (!authToken) {
    return new HttpResponse(null, { status: 401 });
  }
  
  // Validate request body
  const body = await request.json();
  const errors = [];
  
  if (!body.name) errors.push('Name is required');
  if (!body.email) errors.push('Email is required');
  
  if (errors.length > 0) {
    return new HttpResponse(
      JSON.stringify({ errors }),
      { status: 400 }
    );
  }
  
  // Success response
  return HttpResponse.json({
    success: true,
    id: 'new-id'
  });
});
```

## Type Management

To avoid conflicts between Jest and Cypress type definitions:

1. Use triple-slash directives in test files:
   ```typescript
   /// <reference types="cypress" />
   ```

2. Create separate tsconfig files for different test types:
   - `tsconfig.json` - Main configuration
   - `tsconfig.test.json` - Jest test configuration
   - `packages/testing/tsconfig.json` - Testing utilities configuration

3. Explicitly specify test types in each configuration

## Testing Broker/Employer Contexts

Since the application focuses on broker and employer contexts:

1. Create test fixtures that reflect broker/employer user types
2. Test authorization flows specific to these roles
3. Mock appropriate business data for these contexts

## Accessibility Testing

Include accessibility tests in your component and E2E tests:

```typescript
// In component tests
it('should meet accessibility standards', () => {
  cy.mount(<MyComponent />);
  cy.checkA11y();
});

// In E2E tests
it('should have no accessibility violations on the dashboard', () => {
  cy.visit('/broker/dashboard');
  cy.checkA11y();
});
```

## CI/CD Integration

Configure your CI pipeline to:

1. Run unit and component tests on all PRs
2. Run E2E tests on staging deployments
3. Generate and store test coverage reports

## Debugging Tips

1. Use `cy.debug()` to pause Cypress tests
2. Use browser devtools with the `debugger` statement in tests
3. Configure test timeouts appropriately for async operations

## Additional Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library Documentation](https://testing-library.com/docs/)
- [MSW Documentation](https://mswjs.io/docs/)
