/// <reference types="jest" />
/**
 * Example Jest test using MSW
 * 
 * This demonstrates how to use MSW in Jest tests to mock API requests.
 */
import '../types/jest-test';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { describe, it, expect, beforeAll, afterEach, afterAll } from '@jest/globals';
// Add Jest expects for proper type checking
import '@testing-library/jest-dom';
// Make types available for better linting
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveProperty(property: string): R;
    }
  }
}

// Sample mock handlers for this test
const testHandlers = [
  http.get('https://api.example.com/user', () => {
    return HttpResponse.json({
      id: '123',
      name: 'Test User',
      email: 'test@example.com'
    });
  }),
  
  http.post('https://api.example.com/user', () => {
    return HttpResponse.json({
      id: '124',
      success: true
    }, { status: 201 });
  })
];

// Setup MSW server for this test suite
const server = setupServer(...testHandlers);

// Simple fetch wrapper for testing
const apiClient = {
  get: (path: string) => fetch(`https://api.example.com${path}`),
  post: (path: string, options?: RequestInit) => fetch(`https://api.example.com${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  })
};

describe('MSW with Jest example', () => {
  // Start the MSW server before tests
  beforeAll(() => server.listen());
  
  // Reset any request handlers between tests
  afterEach(() => server.resetHandlers());
  
  // Clean up after all tests
  afterAll(() => server.close());
  
  it('should fetch user data from mocked API', async () => {
    // Make request to mocked endpoint
    const response = await apiClient.get('/user');
    const data = await response.json();
    
    // Use more direct assertions that don't rely on matchers
    expect(response.status === 200).toBe(true);
    
    // Verify the exact object structure
    expect(data.id === '123').toBe(true);
    expect(data.name === 'Test User').toBe(true);
    expect(data.email === 'test@example.com').toBe(true);
  });
  
  it('should handle posting data to mocked API', async () => {
    // Make request to mocked endpoint
    const response = await apiClient.post('/user', {
      body: JSON.stringify({
        name: 'New User',
        email: 'new@example.com'
      })
    });
    const data = await response.json();
    
    // Use more direct assertions
    expect(response.status === 201).toBe(true);
    expect('id' in data).toBe(true); // Check property exists
    expect(data.success === true).toBe(true);
  });
  
  it('should allow runtime handler overrides', async () => {
    // Override handler for this test only
    server.use(
      http.get('https://api.example.com/user', () => {
        return HttpResponse.json({
          id: '999',
          name: 'Override User',
          role: 'admin'
        });
      })
    );
    
    // Make request to mocked endpoint
    const response = await apiClient.get('/user');
    const data = await response.json();
    
    // Use more direct assertions
    expect(response.status === 200).toBe(true);
    expect(data.name === 'Override User').toBe(true);
    expect(data.role === 'admin').toBe(true);
  });
}); 