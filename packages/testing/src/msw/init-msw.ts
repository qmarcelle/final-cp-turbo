/**
 * MSW Initialization Script for Development
 * 
 * This script can be imported in your app to set up MSW for development environments.
 * Example usage:
 * 
 * ```typescript
 * // In your app's entry point (e.g., main.tsx or index.tsx)
 * if (process.env.NODE_ENV === 'development') {
 *   // Only load MSW in development
 *   import('../path/to/msw/init-msw').then(({ initMswForDevelopment }) => {
 *     initMswForDevelopment();
 *   });
 * }
 * ```
 */
import { handlers } from './handlers';

let mswInitialized = false;

/**
 * Initialize MSW for development environments
 * @param options Configuration options
 * @returns Promise that resolves when MSW is initialized
 */
export async function initMswForDevelopment(options?: {
  /**
   * Whether to enable logging of requests
   * @default true
   */
  enableLogging?: boolean;
  
  /**
   * Whether to show a banner in the console when MSW is initialized
   * @default true
   */
  showBanner?: boolean;
  
  /**
   * Custom handlers to add to the worker
   */
  customHandlers?: any[];
}): Promise<any | undefined> {
  // Only initialize once
  if (mswInitialized) {
    console.info('[MSW] Already initialized');
    return undefined;
  }
  
  // Only run in browser environments
  if (typeof window === 'undefined') {
    console.warn('[MSW] initMswForDevelopment should only be called in browser environments');
    return undefined;
  }

  const { enableLogging = true, showBanner = true } = options || {};

  try {
    // Import the browser worker dynamically
    const { worker } = await import('./browser');
    
    // Add any custom handlers
    if (options?.customHandlers?.length) {
      worker.use(...options.customHandlers);
    }
    
    // Start the worker with the provided options
    await worker.start({
      onUnhandledRequest: 'warn',
      quiet: !showBanner,
    });
    
    mswInitialized = true;
    
    // Log that MSW has been initialized
    if (enableLogging) {
      console.info('[MSW] Initialized for development');
      console.info(`[MSW] Mocking ${handlers.length} API endpoints`);
    }
    
    return worker;
  } catch (error) {
    console.error('[MSW] Failed to initialize:', error);
    return undefined;
  }
} 