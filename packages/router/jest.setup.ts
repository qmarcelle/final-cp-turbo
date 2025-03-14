// This file is used by Jest to configure the test environment
import '@testing-library/jest-dom';

// Add custom matchers for testing-library
declare global {
  namespace jest {
    // Add testing-library matchers
    interface Matchers<R> {
      // DOM Testing Library
      toBeInTheDocument(): R;
      toBeVisible(): R;
      toBeEmpty(): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBeInvalid(): R;
      toBeRequired(): R;
      toBeValid(): R;
      toBeChecked(): R;
      toBePartiallyChecked(): R;
      toHaveAttribute(attr: string, value?: any): R;
      toHaveClass(...classNames: string[]): R;
      toHaveFocus(): R;
      toHaveFormValues(expectedValues: Record<string, any>): R;
      toHaveStyle(css: string | Record<string, any>): R;
      toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): R;
      toHaveValue(value: any): R;
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R;
      toBeEmptyDOMElement(): R;
      toContainElement(element: HTMLElement | null): R;
      toContainHTML(htmlText: string): R;
    }
  }
}

// Mock fetch API for tests that make network requests
global.fetch = jest.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: new Headers(),
  } as Response)
);

// Reset all mocks between tests
beforeEach(() => {
  jest.resetAllMocks();
});

// Make URL constructor available in test environment (Node.js doesn't have it by default)
if (typeof window === 'undefined') {
  global.URL = URL;
  global.URLSearchParams = URLSearchParams;
}

// Suppress console errors during tests
// Uncomment these if needed for debugging
// const originalConsoleError = console.error;
// console.error = (...args) => {
//   if (
//     /Warning.*not wrapped in act/i.test(args[0]) ||
//     /Warning.*cannot update a component/i.test(args[0])
//   ) {
//     return;
//   }
//   originalConsoleError(...args);
// }; 