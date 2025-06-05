// Export MSW setup utilities for Consumer Portals
export { worker, startMocking, enableMocking } from './browser'
export { server, setupMswForTests, setupMswForTestsWithGlobals } from './server'
export { handlers } from './handlers'

// Re-export MSW types and utilities that consumers might need
export { http, HttpResponse } from 'msw' 