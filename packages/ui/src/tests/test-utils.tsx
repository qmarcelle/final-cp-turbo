/**
 * Custom test utilities for UI components
 */
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import '@testing-library/jest-dom';

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override render method
export { render }; 