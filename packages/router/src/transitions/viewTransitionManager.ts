/**
 * View Transition Manager for the router
 * 
 * This module provides utilities for working with the View Transitions API,
 * which allows for smooth transitions between pages.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
 */

import { getRouterLogger, LogLevel, RouterEventType } from '../logging';

// Type definitions for the View Transitions API
declare global {
  interface Document {
    startViewTransition?: (callback: () => Promise<void> | void) => ViewTransition;
  }

  interface ViewTransition {
    finished: Promise<void>;
    ready: Promise<void>;
    skipTransition: () => void;
    updateCallbackDone: Promise<void>;
  }
}

/**
 * Options for view transitions
 */
export interface ViewTransitionOptions {
  /**
   * The name of the transition, used for analytics and debugging
   */
  name?: string;
  
  /**
   * Whether to skip the transition if the View Transitions API is not supported
   * @default true
   */
  skipIfUnsupported?: boolean;
  
  /**
   * Whether to force the transition even if the API is not supported
   * (in this case, the callback will still run but without transition effects)
   * @default true
   */
  fallbackToInstant?: boolean;
  
  /**
   * Whether to log performance metrics for the transition
   * @default true
   */
  logPerformance?: boolean;
  
  /**
   * Custom data to include in logs
   */
  logData?: Record<string, any>;
  
  /**
   * Callback to run before the transition starts
   */
  onStart?: () => void;
  
  /**
   * Callback to run when the transition is ready (DOM updates are complete)
   */
  onReady?: () => void;
  
  /**
   * Callback to run when the transition is finished (animations are complete)
   */
  onFinish?: () => void;
  
  /**
   * Callback to run if the transition fails
   */
  onError?: (error: Error) => void;
}

/**
 * Start a view transition with the given callback
 * 
 * @example
 * // Simple usage
 * startViewTransition(() => {
 *   // Update the DOM here
 *   document.body.innerHTML = '<h1>New content</h1>';
 * });
 * 
 * @example
 * // With options
 * startViewTransition(
 *   async () => {
 *     // Fetch data and update the DOM
 *     const data = await fetchData();
 *     updateUI(data);
 *   },
 *   {
 *     name: 'page-transition',
 *     onFinish: () => console.log('Transition complete')
 *   }
 * );
 */
export async function startViewTransition(
  callback: () => Promise<void> | void,
  options: ViewTransitionOptions = {}
): Promise<void> {
  const {
    name = 'unnamed-transition',
    skipIfUnsupported = true,
    fallbackToInstant = true,
    logPerformance = true,
    logData = {},
    onStart,
    onReady,
    onFinish,
    onError
  } = options;
  
  // Get logger if performance logging is enabled
  const logger = logPerformance ? getRouterLogger() : null;
  const startTime = performance.now();
  
  // Check if the View Transitions API is supported
  const isSupported = typeof document !== 'undefined' && 'startViewTransition' in document;
  
  // Skip if not supported and skipIfUnsupported is true
  if (!isSupported && skipIfUnsupported) {
    if (logger) {
      logger.logEvent({
        type: RouterEventType.PERFORMANCE,
        action: 'view_transition_skipped',
        data: {
          name,
          reason: 'api_not_supported',
          ...logData,
        },
        timestamp: Date.now(),
      });
    }
    return;
  }
  
  try {
    // Call onStart callback
    onStart?.();
    
    // Log transition start
    if (logger) {
      logger.logEvent({
        type: RouterEventType.PERFORMANCE,
        action: 'view_transition_start',
        data: {
          name,
          supported: isSupported,
          ...logData,
        },
        timestamp: Date.now(),
      });
    }
    
    // If the API is supported, use it
    if (isSupported) {
      const transition = document.startViewTransition!(async () => {
        const updateStartTime = performance.now();
        
        try {
          // Run the callback to update the DOM
          await callback();
          
          // Log DOM update completion
          const updateEndTime = performance.now();
          if (logger) {
            logger.logEvent({
              type: RouterEventType.PERFORMANCE,
              action: 'view_transition_dom_updated',
              data: {
                name,
                ...logData,
              },
              timestamp: Date.now(),
              duration: updateEndTime - updateStartTime,
            });
          }
        } catch (error) {
          // Log error during DOM update
          if (logger) {
            logger.logEvent({
              type: RouterEventType.ERROR,
              action: 'view_transition_dom_update_error',
              data: {
                name,
                error: error instanceof Error ? {
                  message: error.message,
                  stack: error.stack,
                } : String(error),
                ...logData,
              },
              timestamp: Date.now(),
              error: error instanceof Error ? error : new Error(String(error)),
            }, LogLevel.ERROR);
          }
          
          // Rethrow the error
          throw error;
        }
      });
      
      // Handle the ready promise (DOM updates are complete)
      transition.ready.then(() => {
        const readyTime = performance.now();
        
        onReady?.();
        
        if (logger) {
          logger.logEvent({
            type: RouterEventType.PERFORMANCE,
            action: 'view_transition_ready',
            data: {
              name,
              ...logData,
            },
            timestamp: Date.now(),
            duration: readyTime - startTime,
          });
        }
      }).catch((error) => {
        // Log error when transition is ready
        if (logger) {
          logger.logEvent({
            type: RouterEventType.ERROR,
            action: 'view_transition_ready_error',
            data: {
              name,
              error: error instanceof Error ? {
                message: error.message,
                stack: error.stack,
              } : String(error),
              ...logData,
            },
            timestamp: Date.now(),
            error: error instanceof Error ? error : new Error(String(error)),
          }, LogLevel.ERROR);
        }
        
        onError?.(error instanceof Error ? error : new Error(String(error)));
      });
      
      // Handle the finished promise (animations are complete)
      await transition.finished.then(() => {
        const finishTime = performance.now();
        
        onFinish?.();
        
        if (logger) {
          logger.logEvent({
            type: RouterEventType.PERFORMANCE,
            action: 'view_transition_finish',
            data: {
              name,
              ...logData,
            },
            timestamp: Date.now(),
            duration: finishTime - startTime,
          });
        }
      }).catch((error) => {
        // Log error when transition is finished
        if (logger) {
          logger.logEvent({
            type: RouterEventType.ERROR,
            action: 'view_transition_finish_error',
            data: {
              name,
              error: error instanceof Error ? {
                message: error.message,
                stack: error.stack,
              } : String(error),
              ...logData,
            },
            timestamp: Date.now(),
            error: error instanceof Error ? error : new Error(String(error)),
          }, LogLevel.ERROR);
        }
        
        onError?.(error instanceof Error ? error : new Error(String(error)));
      });
    } else if (fallbackToInstant) {
      // If the API is not supported but fallbackToInstant is true,
      // just run the callback without transitions
      await callback();
      
      // Call callbacks
      onReady?.();
      onFinish?.();
      
      // Log fallback completion
      const fallbackEndTime = performance.now();
      if (logger) {
        logger.logEvent({
          type: RouterEventType.PERFORMANCE,
          action: 'view_transition_fallback',
          data: {
            name,
            reason: 'api_not_supported',
            ...logData,
          },
          timestamp: Date.now(),
          duration: fallbackEndTime - startTime,
        });
      }
    }
  } catch (error) {
    // Log any other errors
    if (logger) {
      logger.logEvent({
        type: RouterEventType.ERROR,
        action: 'view_transition_error',
        data: {
          name,
          error: error instanceof Error ? {
            message: error.message,
            stack: error.stack,
          } : String(error),
          ...logData,
        },
        timestamp: Date.now(),
        error: error instanceof Error ? error : new Error(String(error)),
      }, LogLevel.ERROR);
    }
    
    // Call onError callback
    onError?.(error instanceof Error ? error : new Error(String(error)));
    
    // Rethrow the error
    throw error;
  }
}

/**
 * Check if the View Transitions API is supported in the current browser
 */
export function isViewTransitionSupported(): boolean {
  return typeof document !== 'undefined' && 'startViewTransition' in document;
}

/**
 * Utility to retry a view transition if it fails
 * 
 * @example
 * retryViewTransition(
 *   () => updateDOM(),
 *   {
 *     maxRetries: 3,
 *     retryDelay: 100
 *   }
 * );
 */
export async function retryViewTransition(
  callback: () => Promise<void> | void,
  options: ViewTransitionOptions & {
    maxRetries?: number;
    retryDelay?: number;
  } = {}
): Promise<void> {
  const {
    maxRetries = 3,
    retryDelay = 100,
    ...transitionOptions
  } = options;
  
  const logger = getRouterLogger();
  let retryCount = 0;
  
  const attempt = async (): Promise<void> => {
    try {
      await startViewTransition(callback, {
        ...transitionOptions,
        name: transitionOptions.name || `retry-transition-${retryCount}`,
        onError: (error) => {
          transitionOptions.onError?.(error);
        },
      });
    } catch (error) {
      retryCount++;
      
      if (retryCount <= maxRetries) {
        // Log retry attempt
        logger?.logEvent({
          type: RouterEventType.PERFORMANCE,
          action: 'view_transition_retry',
          data: {
            name: transitionOptions.name,
            retryCount,
            maxRetries,
            error: error instanceof Error ? {
              message: error.message,
              stack: error.stack,
            } : String(error),
          },
          timestamp: Date.now(),
        });
        
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        
        // Retry the transition
        return attempt();
      }
      
      // Log max retries exceeded
      logger?.logEvent({
        type: RouterEventType.ERROR,
        action: 'view_transition_max_retries',
        data: {
          name: transitionOptions.name,
          retryCount,
          maxRetries,
          error: error instanceof Error ? {
            message: error.message,
            stack: error.stack,
          } : String(error),
        },
        timestamp: Date.now(),
        error: error instanceof Error ? error : new Error(String(error)),
      }, LogLevel.ERROR);
      
      // Rethrow the error after max retries
      throw error;
    }
  };
  
  return attempt();
}

/**
 * Create a navigation transition that works with the router
 */
export function createNavigationTransition(
  url: string,
  updateDOM: () => Promise<void> | void,
  options: ViewTransitionOptions = {}
): Promise<void> {
  const logger = getRouterLogger();
  
  // Log navigation transition start
  logger?.logEvent({
    type: RouterEventType.NAVIGATION,
    action: 'view_transition_navigation',
    data: {
      url,
      name: options.name || 'navigation',
      ...options.logData,
    },
    timestamp: Date.now(),
  });
  
  return startViewTransition(updateDOM, {
    name: 'navigation',
    ...options,
    logData: {
      url,
      ...options.logData,
    },
  });
} 