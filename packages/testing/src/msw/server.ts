import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Create an MSW server instance with the default handlers
export const server = setupServer(...handlers);

/**
 * Add additional handlers to the MSW server
 * @param additionalHandlers Array of additional handlers to add
 */
export function addHandlers(additionalHandlers: any[]) {
  server.use(...additionalHandlers);
}

/**
 * Reset the MSW server handlers to the default handlers
 */
export function resetHandlers() {
  server.resetHandlers();
  server.use(...handlers);
} 