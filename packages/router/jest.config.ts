/**
 * Jest configuration for the router package
 */
import { createJestConfig } from '../../packages/testing/src/jest/jest.config.base';
import path from 'path';

const rootDir = path.resolve(__dirname);
const config = createJestConfig(rootDir);

export default {
  ...config,
  displayName: 'router',
  
  // Package-specific settings
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 70,
      functions: 75,
      lines: 75,
    },
  },
  
  // Add specific module mocks if needed
  moduleNameMapper: {
    ...config.moduleNameMapper,
    // Add package-specific mocks here
  },

  // Add any package-specific test environment setup
  setupFilesAfterEnv: [
    ...((config.setupFilesAfterEnv as string[]) || []),
    '<rootDir>/src/__tests__/setup.ts',
  ],
}; 