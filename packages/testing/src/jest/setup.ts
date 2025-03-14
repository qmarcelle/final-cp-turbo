/**
 * Global Jest setup file
 * This runs before each test file and sets up the testing environment
 */
import '@testing-library/jest-dom';

// Extend expect with custom matchers
import { expect } from '@jest/globals';
import { toHaveNoViolations } from 'jest-axe';

// @ts-ignore - jest-axe types are not compatible with the latest Jest types
expect.extend({ toHaveNoViolations });

// Import MSW for API mocking
import { initializeMswNode } from '../msw';

// Initialize MSW server for Node.js environment
initializeMswNode();

// Mock environment variables needed for tests
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000';
process.env.NODE_ENV = 'test';

// Global test setup
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock matchMedia which is not implemented in JSDOM
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn(),
});

// Silence console errors during tests
const originalConsoleError = console.error;
console.error = (...args) => {
  // Filter out specific React warnings that might come from testing scenarios
  const suppressedWarnings = [
    'Warning: ReactDOM.render is no longer supported',
    'Warning: An update to Component inside a test was not wrapped in act',
    'Error: Uncaught [Error: expect',
  ];

  if (
    typeof args[0] === 'string' &&
    suppressedWarnings.some(warning => args[0].includes(warning))
  ) {
    return;
  }

  originalConsoleError(...args);
};
