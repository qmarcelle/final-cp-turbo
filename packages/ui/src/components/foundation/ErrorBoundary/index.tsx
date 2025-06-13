import React, { Component, ErrorInfo, ReactNode } from 'react';

/**
 * Props for the ErrorBoundary component
 * @interface Props
 * @property {ReactNode} children - The components to be wrapped by the error boundary
 * @property {ReactNode} [fallback] - Optional fallback UI to show when an error occurs
 * @property {(error: Error, errorInfo: ErrorInfo) => void} [onError] - Optional callback for error handling
 */
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * State interface for the ErrorBoundary component
 * @interface State
 * @property {boolean} hasError - Whether an error has occurred
 * @property {Error | null} error - The error object if an error occurred
 */
interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary component for handling React 19 errors
 * 
 * This component catches JavaScript errors anywhere in their child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 * 
 * @example
 * ```tsx
 * <ErrorBoundary
 *   fallback={<div>Something went wrong</div>}
 *   onError={(error, errorInfo) => {
 *     // Log the error to an error reporting service
 *     logErrorToService(error, errorInfo);
 *   }}
 * >
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 * 
 * @class ErrorBoundary
 * @extends {Component<Props, State>}
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  /**
   * Used to render a fallback UI after an error has been thrown
   * @static
   * @param {Error} error - The error that was caught
   * @returns {State} The new state to be used for rendering
   */
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  /**
   * Called after an error has been thrown by a descendant component
   * @param {Error} error - The error that was caught
   * @param {ErrorInfo} errorInfo - Additional information about the error
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  /**
   * Renders either the children or fallback UI based on whether an error occurred
   * @returns {ReactNode} The rendered content
   */
  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-4 border border-red-200 rounded-md bg-red-50">
          <h2 className="text-lg font-semibold text-red-800">Something went wrong</h2>
          <p className="mt-2 text-sm text-red-600">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
} 