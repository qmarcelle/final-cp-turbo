/**
 * Jest configuration for the auth package
 */
const path = require('path');

/** @type {import('jest').Config} */
const config = {
  displayName: 'auth',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    // Handle static assets
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    // Handle module aliases
    '^@cp/auth/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json',
    }],
  },
  // Resolve packages from the monorepo
  resolver: '<rootDir>/../../jest-resolver.js',
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  // Allow TypeScript errors without failing tests
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  // Set CPU usage for optimal performance
  maxWorkers: '50%',
};

module.exports = config; 