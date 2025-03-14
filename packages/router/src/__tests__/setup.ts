/**
 * Router Package Test Setup
 * 
 * This file contains setup code that runs before tests
 */

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
    pathname: '/test-path',
    query: {},
  }),
  usePathname: () => '/test-path',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next/cache
jest.mock('next/cache', () => ({
  unstable_cache: jest.fn((fn) => fn),
}));

// Mock the document.startViewTransition API
Object.defineProperty(global.document, 'startViewTransition', {
  value: jest.fn((callback) => {
    // Execute the callback
    const callbackResult = callback();
    
    // Return a mock ViewTransition object
    return {
      ready: Promise.resolve(),
      finished: Promise.resolve(),
      updateCallbackDone: Promise.resolve(),
      skipTransition: jest.fn(),
    };
  }),
  configurable: true,
});

// Mock server functions
global.jest.mock('server-only', () => ({}));

// Mock 'use server' directive
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    // Add any React-specific mocks here if needed
  };
});

// Set up environment variables for testing
process.env.NEXT_PUBLIC_BASE_PATH = '';
process.env.NODE_ENV = 'test';

// Add custom matchers if needed
expect.extend({
  // Add custom matchers here
});

// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});

// Global test teardown
afterAll(() => {
  jest.restoreAllMocks();
}); 