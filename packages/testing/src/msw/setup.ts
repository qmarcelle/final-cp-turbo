/**
 * MSW Setup module
 * Provides utilities for setting up and using MSW in tests
 */
import { setupWorker } from 'msw/browser';
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Create MSW server for Node.js environment (Jest)
export const server = setupServer(...handlers);

/**
 * Initialize MSW for browser environment
 * Use this in browser-based tests (Cypress, Storybook)
 */
export const initializeMsw = async () => {
  if (typeof window === 'undefined') {
    return;
  }

  const worker = setupWorker(...handlers);
  await worker.start({
    onUnhandledRequest: process.env.NODE_ENV === 'test' ? 'bypass' : 'warn',
  });

  return worker;
};

/**
 * Setup MSW for Jest tests
 * This should be called in jest.setup.js
 */
export const setupMswForJest = () => {
  // Establish API mocking before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  
  // Reset any request handlers that we may add during the tests
  afterEach(() => server.resetHandlers());
  
  // Clean up after the tests are finished
  afterAll(() => server.close());
};

/**
 * Add or replace MSW handlers at runtime
 * Useful for test-specific API mocking
 * @param newHandlers - Additional handlers to add temporarily
 */
export const addHandlers = (newHandlers: any[]) => {
  server.use(...newHandlers);
};
