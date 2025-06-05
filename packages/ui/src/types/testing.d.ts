import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeChecked(): R;
      toBeDisabled(): R;
      toHaveClass(className: string): R;
    }
  }
} 