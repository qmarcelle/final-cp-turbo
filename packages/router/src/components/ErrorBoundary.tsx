'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { getRouterLogger, LogLevel, RouterEventType } from '../logging';

/**
 * Props for the ErrorBoundary component
 */
export interface ErrorBoundaryProps {
  /**
   * Children to render
   */
  children: ReactNode;
  
  /**
   * Custom fallback component to render when an error occurs
   * If not provided, a default error UI will be shown
   */
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  
  /**
   * Whether to log errors to the router logger
   * @default true
   */
  logErrors?: boolean;
  
  /**
   * Additional context to include in error logs
   */
  errorContext?: Record<string, any>;
  
  /**
   * Log level to use for errors
   * @default LogLevel.ERROR
   */
  logLevel?: LogLevel;
  
  /**
   * Callback fired when an error occurs
   */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  
  /**
   * Whether the error boundary should capture errors from all
   * descendants or just immediate children
   * @default false
   */
  disablePropagation?: boolean;
}

/**
 * State for the ErrorBoundary component
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * React Error Boundary component that catches errors in its children tree
 * and displays a fallback UI when an error occurs
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const { 
      onError, 
      logErrors = true, 
      errorContext = {}, 
      logLevel = LogLevel.ERROR 
    } = this.props;
    
    // Call onError callback if provided
    if (onError) {
      onError(error, errorInfo);
    }
    
    // Log the error using the router logger
    if (logErrors) {
      const logger = getRouterLogger();
      if (logger) {
        logger.logEvent({
          type: RouterEventType.ERROR,
          action: 'render_error',
          data: {
            error: {
              name: error.name,
              message: error.message,
              stack: error.stack,
            },
            componentStack: errorInfo.componentStack,
            context: errorContext,
            url: typeof window !== 'undefined' ? window.location.href : undefined,
          },
          timestamp: Date.now(),
          error,
        }, logLevel);
      }
    }
    
    // Log to console in development
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error caught by ErrorBoundary:', error);
      console.error('Component stack:', errorInfo.componentStack);
    }
  }
  
  /**
   * Reset the error state to re-render the children
   */
  reset = (): void => {
    const logger = getRouterLogger();
    
    // Log the reset attempt
    if (this.props.logErrors && logger) {
      logger.logEvent({
        type: RouterEventType.UI,
        action: 'error_boundary_reset',
        data: {
          previousError: this.state.error ? {
            name: this.state.error.name,
            message: this.state.error.message,
          } : null,
          context: this.props.errorContext,
        },
        timestamp: Date.now(),
      });
    }
    
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    const { children, fallback } = this.props;
    
    if (this.state.hasError && this.state.error) {
      // Handle custom fallback if provided
      if (fallback) {
        if (typeof fallback === 'function') {
          return fallback(this.state.error, this.reset);
        }
        return fallback;
      }
      
      // Default error UI
      return (
        <div className="error-boundary-fallback">
          <h2>Something went wrong</h2>
          <details>
            <summary>Error details</summary>
            <p>{this.state.error.message}</p>
            
            {process.env.NODE_ENV !== 'production' && (
              <pre>{this.state.error.stack}</pre>
            )}
          </details>
          <button onClick={this.reset}>
            Try again
          </button>
        </div>
      );
    }

    // Return children normally if no error
    return children;
  }
}

/**
 * Higher Order Component that wraps a component with an ErrorBoundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>, 
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const displayName = Component.displayName || Component.name || 'Component';
  
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${displayName})`;
  
  return WrappedComponent;
}

export default ErrorBoundary; 