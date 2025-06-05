# Testing Configuration Guide

This document provides guidance on how to properly set up testing configurations in our monorepo, with a focus on TypeScript compatibility.

## Structure

Each package in the monorepo should have:

1. A `tsconfig.json` for main source files
2. A `tsconfig.test.json` for test-specific TypeScript configuration
3. A `jest.config.js` for Jest configuration

## TypeScript Configurations

### Main tsconfig.json

The main `tsconfig.json` should:
- Extend from the appropriate base config (`react-library.json` or `base.json`)
- Exclude test files to avoid type conflicts

```json
{
  "extends": "../../packages/tsconfig/react-library.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "skipLibCheck": true,
    "types": ["node"]
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx", "**/__tests__/**/*"]
}
```

### Test tsconfig.json

Create a separate `tsconfig.test.json` for tests:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "module": "CommonJS",
    "types": ["node", "jest", "@testing-library/jest-dom", "@jest/globals"],
    "noEmit": true,
    "allowJs": true,
    "skipLibCheck": true
  },
  "include": [
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
    "src/**/__tests__/**/*.ts",
    "src/**/__tests__/**/*.tsx",
    "jest.setup.ts"
  ]
}
```

## Jest Configuration

Use the following format for Jest config files:

```javascript
// jest.config.js
/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@cp/(.*)$': '<rootDir>/../$1/src'
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
        isolatedModules: true,
        diagnostics: {
          warnOnly: true  // Show type errors but don't fail the tests
        }
      }
    ]
  },
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(test).[jt]s?(x)'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/types/**/*'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transformIgnorePatterns: ['/node_modules/(?!@cp/)'],
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
};

module.exports = config;
```

## Writing Tests

When writing tests in TypeScript, follow these best practices:

1. Always use `@jest/globals` to import Jest functions:

```typescript
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
```

2. When mocking functions, define the mocks outside the test:

```typescript
// Create mock functions directly for better type safety
const mockLogNavigation = jest.fn();
const mockLogNavigationError = jest.fn();

// Then use them in your mock
jest.mock('../path/to/module', () => ({
  someFunction: jest.fn(() => ({
    logNavigation: mockLogNavigation,
    logNavigationError: mockLogNavigationError
  }))
}));
```

3. Access mock call information directly from the mock:

```typescript
// When verifying calls
expect(mockFunction.mock.calls.length).toBe(1);
expect(mockFunction.mock.calls[0][0]).toBe('expectedArg');
```

## Troubleshooting Jest Type Issues

If you encounter TypeScript errors in your tests related to Jest types, try these solutions:

### 1. Explicit Type Casting

Use explicit type casting for mocked modules:

```typescript
// Instead of:
(useRouter as jest.Mock).mockReturnValue({...})

// Use:
(useRouter as any).mockReturnValue({...})
```

### 2. Direct Mock Access

Create mock functions outside your tests and reference them directly:

```typescript
const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
    replace: mockReplace
  }))
}));

// In tests:
expect(mockPush.mock.calls.length).toBe(1);
```

### 3. Add Type Declarations

Create a special type declaration file for Jest tests in your package:

```typescript
// src/types/jest-test.d.ts
import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Mock<T = any> {
      (...args: any[]): T;
      mock: {
        calls: any[][];
        instances: any[];
        invocationCallOrder: number[];
        results: any[];
      };
    }
  }
}
```

Then import this at the top of your test files:

```typescript
import '../types/jest-test';
```

### 4. Configure ts-jest Options

If you're still seeing type errors, you can configure ts-jest to be less strict:

```javascript
transform: {
  '^.+\\.(ts|tsx)$': [
    'ts-jest',
    {
      isolatedModules: true,
      diagnostics: {
        warnOnly: true  // Show type errors but don't fail the tests
      }
    }
  ]
}
```

### 5. Required Dependencies

Make sure these packages are installed:

```json
"devDependencies": {
  "@jest/globals": "^29.7.0",
  "@testing-library/jest-dom": "^6.4.2",
  "@types/jest": "^29.5.12",
  "@types/testing-library__jest-dom": "^6.0.0"
}
```

## Unit Testing vs. Integration Testing

Each package should have both unit and integration tests:

- **Unit tests**: Test individual functions/components in isolation
- **Integration tests**: Test interaction between components

Use the same configuration for both, but organize them in separate folders for clarity. 