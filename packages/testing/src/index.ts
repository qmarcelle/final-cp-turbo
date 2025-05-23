/**
 * Testing utilities for Consumer Portals applications
 * @packageDocumentation
 */


// Export Next.js mocks
export * from './mocks/next';

// Export Jest configuration helpers
export * from './jest/jest.config.base';

// Export MSW utilities
export * as msw from './msw';

// Re-export common testing utilities
export { render, screen, fireEvent, waitFor } from '@testing-library/react';
