/**
 * Base Jest configuration for Consumer Portals packages
 * This configuration can be extended by individual packages
 */
import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Creates a Jest configuration for a package
 * @param rootDir - The root directory of the package
 * @returns A Jest configuration object
 */
export function createJestConfig(rootDir: string): Config {
  const paths = getTsConfigPaths('./tsconfig.json');
  
  return {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    rootDir,
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    
    // Test file patterns
    testMatch: [
      '**/__tests__/**/*.test.(ts|tsx)',
    ],
    
    // Coverage configuration
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/**/*.d.ts',
      '!src/**/*.stories.{ts,tsx}',
      '!src/**/__mocks__/**',
      '!src/**/__tests__/**',
    ],
    coverageThreshold: {
      global: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
    
    // Module resolution
    moduleNameMapper: {
      ...pathsToModuleNameMapper(paths, { prefix: '<rootDir>/' }),
      '\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
      '\\.(css|sass|scss)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
    },
    
    // Transform configuration
    transform: {
      '^.+\\.(ts|tsx)$': ['ts-jest', {
        tsconfig: './tsconfig.json',
      }],
    },
    
    // Setup files
    setupFilesAfterEnv: [
      '@testing-library/jest-dom',
    ],
    
    // Test environment configuration
    testEnvironmentOptions: {
      customExportConditions: [''],
    },
    
    // Timeouts
    testTimeout: 10000,
  };
}

// Function to get TypeScript paths from tsconfig
const getTsConfigPaths = (tsconfigPath: string) => {
  try {
    const tsConfig = JSON.parse(
      readFileSync(resolve(process.cwd(), tsconfigPath), 'utf-8')
    );
    return tsConfig.compilerOptions?.paths || {};
  } catch (e) {
    console.error(`Error reading tsconfig at ${tsconfigPath}:`, e);
    return {};
  }
};

export default createJestConfig;

