/// <reference types="jest" />

import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeChecked(): R;
      toBeDisabled(): R;
      toHaveClass(className: string): R;
      not: {
        toBeInTheDocument(): R;
        toBeChecked(): R;
      };
    }
    
    interface Expect {
      <T = any>(actual: T): Matchers<void, T>;
    }
  }
} 