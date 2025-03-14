import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

declare global {
  // Ensure jest is available as a global
  const jest: typeof import('@jest/globals').jest;
  
  // Add Jest matcher types to avoid errors with expect()
  namespace jest {
    interface Mock<T = any, Y extends any[] = any[]> {
      (...args: Y): T;
      mockImplementation: (fn: (...args: Y) => T) => Mock<T, Y>;
      mockImplementationOnce: (fn: (...args: Y) => T) => Mock<T, Y>;
      mockReturnValue: <U extends T>(value: U) => Mock<T, Y>;
      mockReturnValueOnce: <U extends T>(value: U) => Mock<T, Y>;
      mockRestore: () => void;
      mockReset: () => void;
      mockClear: () => void;
    }
  }
  
  // Add matchers for expect()
  namespace jest {
    interface Expect {
      <T = any>(actual: T): jest.Matchers<T>;
    }
    
    interface Matchers<T> {
      toHaveBeenCalled(): void;
      toHaveBeenCalledWith(...args: any[]): void;
      toHaveBeenCalledTimes(times: number): void;
      toHaveProperty(key: string, value?: any): void;
      toBe(expected: any): void;
      toEqual(expected: any): void;
      toStrictEqual(expected: any): void;
      toThrow(error?: string | Error | RegExp): void;
      toBeNull(): void;
      toBeUndefined(): void;
      toBeTruthy(): void;
      toBeFalsy(): void;
      not: jest.Matchers<T>;
    }
  }
} 