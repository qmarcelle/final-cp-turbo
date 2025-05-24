/**
 * Global TypeScript declarations for the monorepo
 */

// Add support for Jest global types in all test files
declare namespace jest {
  type Mock<T = any, Y extends any[] = any[]> = {
    (...args: Y): T;
    mockImplementation: (fn: (...args: Y) => T) => Mock<T, Y>;
    mockImplementationOnce: (fn: (...args: Y) => T) => Mock<T, Y>;
    mockReturnValue: <U extends T>(value: U) => Mock<T, Y>;
    mockReturnValueOnce: <U extends T>(value: U) => Mock<T, Y>;
    mockRestore: () => void;
    mockReset: () => void;
    mockClear: () => void;
    getMockName: () => string;
    mockName: (name: string) => Mock<T, Y>;
    mock: {
      calls: Y[];
      instances: T[];
      invocationCallOrder: number[];
      results: Array<{
        type: 'return' | 'throw';
        value: T;
      }>;
    };
  };

  type MockedFunction<T extends (...args: any[]) => any> = Mock<ReturnType<T>, Parameters<T>>;
  
  function fn<T = any, Y extends any[] = any[]>(): Mock<T, Y>;
  function fn<T = any, Y extends any[] = any[]>(implementation: (...args: Y) => T): Mock<T, Y>;
  
  function mock(moduleName: string, factory?: any, options?: any): typeof jest;
  function clearAllMocks(): typeof jest;
  function resetAllMocks(): typeof jest;
  function restoreAllMocks(): typeof jest;
  function spyOn<T extends {}, M extends keyof T>(object: T, method: M): Mock;
}

// Add global test API types
interface Describe {
  (name: string, fn: () => void): void;
  each: any;
  only: Describe;
  skip: Describe;
}

interface It {
  (name: string, fn: () => void | Promise<void>, timeout?: number): void;
  each: any;
  only: It;
  skip: It;
  todo: It;
}

// Enhanced Assertion interface for Jest matchers
interface JestAssertion<T = any> {
  not: JestAssertion<T>;
  toBe(expected: any): void;
  toEqual(expected: any): void;
  toStrictEqual(expected: any): void;
  toBeNull(): void;
  toBeUndefined(): void;
  toBeDefined(): void;
  toBeTruthy(): void;
  toBeFalsy(): void;
  toBeGreaterThan(expected: number): void;
  toBeGreaterThanOrEqual(expected: number): void;
  toBeLessThan(expected: number): void;
  toBeLessThanOrEqual(expected: number): void;
  toBeCloseTo(expected: number, precision?: number): void;
  toContain(item: any): void;
  toContainEqual(item: any): void;
  toHaveLength(length: number): void;
  toHaveProperty(keyPath: string | string[], value?: any): void;
  toMatch(regExp: RegExp | string): void;
  toMatchObject(object: {}): void;
  toThrow(error?: string | Error | RegExp): void;
  toThrowError(error?: string | Error | RegExp): void;
  toBeInstanceOf(constructor: Function): void;
  toBeCalledWith(...args: any[]): void;
  toHaveBeenCalled(): void;
  toHaveBeenCalledWith(...args: any[]): void;
  toHaveBeenCalledTimes(times: number): void;
  toHaveBeenLastCalledWith(...args: any[]): void;
  toHaveBeenNthCalledWith(nth: number, ...args: any[]): void;
  toHaveReturned(): void;
  toHaveReturnedTimes(times: number): void;
  toHaveReturnedWith(value: any): void;
  toHaveLastReturnedWith(value: any): void;
  toHaveNthReturnedWith(nth: number, value: any): void;
  toMatchSnapshot(propertyMatchers?: any, hint?: string): void;
  toMatchInlineSnapshot(propertyMatchers?: any, inlineSnapshot?: string): void;
  toThrowErrorMatchingSnapshot(hint?: string): void;
  toThrowErrorMatchingInlineSnapshot(inlineSnapshot?: string): void;
  toBeInTheDocument(): void;
  toBeVisible(): void;
  toBeDisabled(): void;
  toBeEnabled(): void;
  toBeEmpty(): void;
  toBeEmptyDOMElement(): void;
  toBeInvalid(): void;
  toBeRequired(): void;
  toBeValid(): void;
  toBeChecked(): void;
  toHaveAttribute(attr: string, value?: any): void;
  toHaveClass(...classNames: string[]): void;
  toHaveFocus(): void;
  toHaveFormValues(expectedValues: Record<string, any>): void;
  toHaveStyle(css: string | Record<string, any>): void;
  toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): void;
  toHaveValue(value: any): void;
}

interface Expect {
  <T>(actual: T): JestAssertion<T>;
  assertions(numberOfAssertions: number): void;
  extend(matchers: Record<string, Function>): void;
  hasAssertions(): void;
  anything(): any;
  any(constructor: Function): any;
  arrayContaining(arr: Array<any>): any;
  objectContaining(obj: {}): any;
  stringContaining(str: string): any;
  stringMatching(str: string | RegExp): any;
}

declare const describe: Describe;
declare const it: It;
declare const test: It;
declare const expect: Expect;
declare const beforeAll: (fn: () => void | Promise<void>, timeout?: number) => void;
declare const beforeEach: (fn: () => void | Promise<void>, timeout?: number) => void;
declare const afterAll: (fn: () => void | Promise<void>, timeout?: number) => void;
declare const afterEach: (fn: () => void | Promise<void>, timeout?: number) => void; 