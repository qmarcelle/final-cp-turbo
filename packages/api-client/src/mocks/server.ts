import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// This configures MSW for Node.js environments (Jest tests)
export const server = setupServer(...handlers)

/**
 * Setup MSW for Jest testing environment
 * Add this to your Jest setup file
 */
export const setupMswForTests = () => {
  // Note: beforeAll, afterEach, and afterAll should be available in your test environment
  
  if (typeof beforeAll !== 'undefined') {
    beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  }

  if (typeof afterEach !== 'undefined') {
    afterEach(() => server.resetHandlers())
  }

  if (typeof afterAll !== 'undefined') {
    afterAll(() => server.close())
  }
}

/**
 * Alternative setup that accepts Jest globals as parameters
 * Use this if Jest globals are not available in your environment
 */
export const setupMswForTestsWithGlobals = (
  beforeAllFn: typeof beforeAll,
  afterEachFn: typeof afterEach,
  afterAllFn: typeof afterAll
) => {
  beforeAllFn(() => server.listen({ onUnhandledRequest: 'error' }))
  afterEachFn(() => server.resetHandlers())
  afterAllFn(() => server.close())
} 