/**
 * Testing utilities for Consumer Portals applications
 * @packageDocumentation
 */

// Export MSW utilities from api-client
export { setupMswForTests, setupMswForTestsWithGlobals } from '@portals/api-client/mocks';

// Export Jest configurations and setup
export { createJestConfig as jestConfig } from './jest/jest.config.base';
export { default as jestConfigBase } from './jest/jest.config.base';

// Export testing utilities
export * from './utils/test-utils';

// Re-export common testing utilities
export { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Export Next.js mocks
export * from './mocks/next';
