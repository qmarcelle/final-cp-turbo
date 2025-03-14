/**
 * Jest setup file for auth package
 * 
 * This configures the testing environment with the necessary extensions
 * and global settings needed for tests to run correctly.
 */
import '@testing-library/jest-dom';

// Mock the next/router module
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    reload: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn()
    }
  })
}));

// Mock localStorage (for environments where it's not available)
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn()
    },
    writable: true
  });
}

// Type for Jest mock functions with promise methods
type JestMockWithPromise<T = any> = jest.Mock<Promise<T>> & {
  mockResolvedValue: (value: T) => jest.Mock<Promise<T>>;
  mockRejectedValue: (reason: any) => jest.Mock<Promise<T>>;
};

// Create and initialize mock functions
const jsonMock = jest.fn() as JestMockWithPromise;
jsonMock.mockResolvedValue({});

const textMock = jest.fn() as JestMockWithPromise;
textMock.mockResolvedValue('');

const blobMock = jest.fn() as JestMockWithPromise;
blobMock.mockResolvedValue(new Blob());

// Use a simpler approach for fetch mocking
// @ts-ignore
global.fetch = jest.fn() as any;
// @ts-ignore
global.Headers = jest.fn() as any;
// @ts-ignore
global.Request = jest.fn() as any;
// @ts-ignore
global.Response = jest.fn(() => ({
  json: jsonMock,
  text: textMock,
  blob: blobMock,
  ok: true,
  status: 200,
  headers: {}
})) as any;

// Suppress error logs during tests
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  // Filter out specific React DOM warnings
  if (typeof args[0] === 'string' && (
    args[0].includes('Warning: ReactDOM.render is no longer supported') ||
    args[0].includes('Warning: React.createFactory()')
  )) {
    return;
  }
  originalConsoleError(...args);
}; 