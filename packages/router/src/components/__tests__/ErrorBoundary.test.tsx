/**
 * Tests for ErrorBoundary component
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary, withErrorBoundary } from '../ErrorBoundary';
import { getRouterLogger } from '../../logging';

// Mock the router logger
jest.mock('../../logging', () => ({
  getRouterLogger: jest.fn(() => ({
    logEvent: jest.fn(),
  })),
  RouterEventType: {
    ERROR: 'error',
    UI: 'ui',
  },
  LogLevel: {
    ERROR: 'error',
  },
}));

// Component that will throw an error when the `shouldThrow` prop is true
const ThrowingComponent = ({ shouldThrow = false, message = 'Test error' }: { shouldThrow?: boolean; message?: string }) => {
  if (shouldThrow) {
    throw new Error(message);
  }
  return <div>Normal rendering</div>;
};

// Save the original console.error
const originalConsoleError = console.error;

describe('ErrorBoundary', () => {
  beforeAll(() => {
    // Suppress console.error during tests
    console.error = jest.fn();
  });
  
  afterAll(() => {
    // Restore console.error
    console.error = originalConsoleError;
  });
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should render children normally when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div data-testid="test-content">Content</div>
      </ErrorBoundary>
    );
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });
  
  it('should render fallback UI when an error occurs', () => {
    // Using jest.spyOn on console to verify error boundary works
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    
    // Check that the default fallback UI is rendered
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
    
    // Should log the error
    const logger = getRouterLogger();
    expect(logger.logEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'error',
        action: 'render_error',
      }),
      'error'
    );
    
    spy.mockRestore();
  });
  
  it('should render custom fallback when provided', () => {
    const customFallback = <div data-testid="custom-fallback">Custom Error UI</div>;
    
    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
  });
  
  it('should call custom fallback function with error and reset', () => {
    const customFallback = jest.fn((error, reset) => (
      <div data-testid="functional-fallback">
        <p>{error.message}</p>
        <button onClick={reset}>Reset</button>
      </div>
    ));
    
    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowingComponent shouldThrow={true} message="Custom error message" />
      </ErrorBoundary>
    );
    
    // Fallback function should be called with error
    expect(customFallback).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Custom error message' }),
      expect.any(Function)
    );
    
    // Rendered content from fallback function
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });
  
  it('should call onError prop when an error occurs', () => {
    const handleError = jest.fn();
    
    render(
      <ErrorBoundary onError={handleError}>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(handleError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) })
    );
  });
  
  it('should reset and re-render children when reset is called', () => {
    // We'll use component state to control whether to throw
    const TestComponent = () => {
      const [shouldThrow, setShouldThrow] = React.useState(true);
      
      return (
        <ErrorBoundary>
          {shouldThrow ? (
            <ThrowingComponent shouldThrow={true} />
          ) : (
            <div data-testid="recovered-content">
              <p>Recovered content</p>
              <button onClick={() => setShouldThrow(true)}>Throw again</button>
            </div>
          )}
        </ErrorBoundary>
      );
    };
    
    render(<TestComponent />);
    
    // Initially shows error UI
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    
    // Click the reset button
    fireEvent.click(screen.getByText('Try again'));
    
    // Should show recovered content
    expect(screen.getByTestId('recovered-content')).toBeInTheDocument();
    
    // Should log the reset
    const logger = getRouterLogger();
    expect(logger.logEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'ui',
        action: 'error_boundary_reset',
      }),
      expect.anything()
    );
  });
  
  it('should include errorContext in logs if provided', () => {
    const errorContext = { page: 'test-page', section: 'header' };
    
    render(
      <ErrorBoundary errorContext={errorContext}>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    
    const logger = getRouterLogger();
    expect(logger.logEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          context: errorContext,
        }),
      }),
      expect.anything()
    );
  });
  
  describe('withErrorBoundary HOC', () => {
    it('should wrap component with error boundary', () => {
      const WrappedComponent = withErrorBoundary(ThrowingComponent);
      
      render(<WrappedComponent shouldThrow={true} />);
      
      // Should show error boundary UI
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
    
    it('should forward props to wrapped component', () => {
      const TestComponent = ({ label }: { label: string }) => <div>{label}</div>;
      const WrappedComponent = withErrorBoundary(TestComponent);
      
      render(<WrappedComponent label="Test Label" />);
      
      // Should render the component with the provided props
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });
    
    it('should apply error boundary options', () => {
      const errorContext = { component: 'test-component' };
      const onError = jest.fn();
      
      const WrappedComponent = withErrorBoundary(ThrowingComponent, {
        errorContext,
        onError,
      });
      
      render(<WrappedComponent shouldThrow={true} />);
      
      // onError should be called
      expect(onError).toHaveBeenCalled();
      
      // Error context should be included in logs
      const logger = getRouterLogger();
      expect(logger.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            context: errorContext,
          }),
        }),
        expect.anything()
      );
    });
  });
}); 