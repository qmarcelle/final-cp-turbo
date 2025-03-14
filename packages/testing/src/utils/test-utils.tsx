/**
 * Custom React Testing Library utilities
 * Provides enhanced render methods with common providers
 */
import React, { ReactNode } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';

// Define a type for the AllTheProviders props
interface AllTheProvidersProps {
  children: ReactNode;
}

/**
 * A wrapper component that provides all the necessary providers for testing
 * Add any providers that your components need here (e.g., theme, router, etc.)
 */
const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return (
    <>
      {/* Add your providers here */}
      {children}
    </>
  );
};

/**
 * Custom render function that wraps the component with all necessary providers
 * @param ui The component to render
 * @param options Additional render options
 * @returns The render result
 */
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override the render method
export { customRender as render };
