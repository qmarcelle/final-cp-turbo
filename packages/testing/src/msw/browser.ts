/**
 * MSW Browser Setup
 * 
 * This file sets up the MSW worker for browser environments (development and tests).
 * It's used by both the development server and Cypress component tests.
 */

import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Create the MSW worker instance with default handlers
export const worker = setupWorker(...handlers);

// Export a convenience function to add handlers dynamically
export function addHandlers(customHandlers: any[]) {
  worker.use(...customHandlers);
}

/**
 * Add additional handlers to the worker
 * @param additionalHandlers Array of additional handlers to add
 */
export function addHandlersToWorker(additionalHandlers: any[]) {
  worker.use(...additionalHandlers);
}

/**
 * Reset the worker handlers to the default handlers
 */
export function resetWorkerHandlers() {
  worker.resetHandlers();
  worker.use(...handlers);
} 