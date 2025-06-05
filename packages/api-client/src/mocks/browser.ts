import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// This configures MSW for browser environments
export const worker = setupWorker(...handlers)

/**
 * Start MSW in browser environment for development
 * Call this in your app's entry point when in development mode
 */
export const startMocking = async () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    return worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js'
      }
    })
  }
}

/**
 * Enable MSW for development - more explicit control
 */
export const enableMocking = async (options?: {
  onUnhandledRequest?: 'bypass' | 'error' | 'warn'
}) => {
  if (typeof window !== 'undefined') {
    return worker.start({
      onUnhandledRequest: options?.onUnhandledRequest || 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js'
      }
    })
  }
} 