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
 * @param tsConfigForPaths - Optional path to tsconfig for moduleNameMapper paths
 * @returns A Jest configuration object
 */
export function createJestConfig(rootDir: string, tsConfigForPaths?: string): Config {
  const paths = getTsConfigPaths(tsConfigForPaths || './tsconfig.json');
  
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
        // This tsconfig is for ts-jest to transform files.
        // It should be specified by the consuming jest.config.ts (e.g., packages/ui/jest.config.ts)
        // or default to a convention if not overridden by the spread ...createJestConfig().
        // For now, let's assume the consuming config handles its transform tsconfig.
        // The important part is that `createJestConfig` itself doesn't hardcode a relative path for this.
        // If the consuming jest.config.ts provides its own transform, it will override this empty {} or a default.
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
    // Resolve path relative to the CWD of the jest process for the specific package
    const absoluteTsConfigPath = resolve(process.cwd(), tsconfigPath);
    const fileContent = readFileSync(absoluteTsConfigPath, 'utf-8');
    const tsConfig = JSON.parse(fileContent.trim());
    return tsConfig.compilerOptions?.paths || {};
  } catch (e) {
    console.error(`Error reading tsconfig at ${resolve(process.cwd(), tsconfigPath)} (resolved from ${tsconfigPath}):`, e);
    return {};
  }
};

export default createJestConfig;

