/**
 * MSW (Mock Service Worker) configuration and utilities
 */
import { server, addHandlers, resetHandlers } from './server';
import { handlers } from './handlers';

// Export server and handlers for direct use
export { server, handlers, addHandlers, resetHandlers };

/**
 * Initialize MSW for browser environments
 * This should be called in browser contexts (like Cypress tests)
 */
export async function initializeMsw() {
  if (typeof window === 'undefined') {
    console.warn('initializeMsw should only be called in browser environments');
    return;
  }

  // Dynamic import of MSW browser module
  const { worker } = await import('./browser');
  await worker.start({
    onUnhandledRequest: 'warn',
  });

  return worker;
}

/**
 * Initialize MSW for Node.js environments
 * This should be called in Node.js contexts (like Jest tests)
 */
export function initializeMswNode() {
  if (typeof window !== 'undefined') {
    console.warn('initializeMswNode should only be called in Node.js environments');
    return server;
  }

  server.listen({ onUnhandledRequest: 'warn' });
  return server;
} 