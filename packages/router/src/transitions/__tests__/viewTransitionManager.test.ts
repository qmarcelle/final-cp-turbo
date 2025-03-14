/**
 * Tests for the viewTransitionManager
 */
import {
  startViewTransition,
  isViewTransitionSupported,
  retryViewTransition,
  createNavigationTransition,
} from '../viewTransitionManager';
import { getRouterLogger } from '../../logging';

// Mock the router logger
jest.mock('../../logging', () => ({
  getRouterLogger: jest.fn(() => ({
    logEvent: jest.fn(),
  })),
  RouterEventType: {
    NAVIGATION: 'navigation',
    PERFORMANCE: 'performance',
    ERROR: 'error',
  },
  LogLevel: {
    ERROR: 'error',
    DEBUG: 'debug',
  },
}));

describe('viewTransitionManager', () => {
  // Mock for document.startViewTransition
  const mockStartViewTransition = jest.fn(async (callback) => {
    await callback();
    return {
      ready: Promise.resolve(),
      finished: Promise.resolve(),
      updateCallbackDone: Promise.resolve(),
      skipTransition: jest.fn(),
    };
  });
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Define startViewTransition on the document object
    Object.defineProperty(document, 'startViewTransition', {
      value: mockStartViewTransition,
      configurable: true,
    });
  });
  
  describe('startViewTransition', () => {
    it('should call the provided callback', async () => {
      const callback = jest.fn();
      
      await startViewTransition(callback);
      
      expect(callback).toHaveBeenCalled();
      expect(mockStartViewTransition).toHaveBeenCalled();
    });
    
    it('should use the native view transitions API when available', async () => {
      const callback = jest.fn();
      
      await startViewTransition(callback);
      
      expect(mockStartViewTransition).toHaveBeenCalledWith(expect.any(Function));
    });
    
    it('should log transition start', async () => {
      const callback = jest.fn();
      const logger = getRouterLogger();
      
      await startViewTransition(callback, { name: 'test-transition' });
      
      expect(logger.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'performance',
          action: 'view_transition_start',
          data: expect.objectContaining({
            name: 'test-transition',
            supported: true,
          }),
        }),
        undefined
      );
    });
    
    it('should fallback to instant update when API is not available and fallbackToInstant is true', async () => {
      // Remove the startViewTransition API
      Object.defineProperty(document, 'startViewTransition', {
        value: undefined,
        configurable: true,
      });
      
      const callback = jest.fn();
      const logger = getRouterLogger();
      
      await startViewTransition(callback, { fallbackToInstant: true });
      
      expect(callback).toHaveBeenCalled();
      expect(logger.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'performance',
          action: 'view_transition_fallback',
        }),
        expect.anything()
      );
    });
    
    it('should skip the transition when API is not available and skipIfUnsupported is true', async () => {
      // Remove the startViewTransition API
      Object.defineProperty(document, 'startViewTransition', {
        value: undefined,
        configurable: true,
      });
      
      const callback = jest.fn();
      const logger = getRouterLogger();
      
      await startViewTransition(callback, { 
        skipIfUnsupported: true,
        fallbackToInstant: false
      });
      
      expect(callback).not.toHaveBeenCalled();
      expect(logger.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'performance',
          action: 'view_transition_skipped',
        }),
        expect.anything()
      );
    });
    
    it('should call onStart, onReady and onFinish callbacks', async () => {
      const onStart = jest.fn();
      const onReady = jest.fn();
      const onFinish = jest.fn();
      
      await startViewTransition(() => {}, {
        onStart,
        onReady,
        onFinish,
      });
      
      expect(onStart).toHaveBeenCalled();
      expect(onReady).toHaveBeenCalled();
      expect(onFinish).toHaveBeenCalled();
    });
    
    it('should handle errors during the transition', async () => {
      const callback = jest.fn(() => {
        throw new Error('Transition error');
      });
      
      const onError = jest.fn();
      const logger = getRouterLogger();
      
      // Expect the function to throw
      await expect(startViewTransition(callback, { onError }))
        .rejects.toThrow('Transition error');
      
      expect(onError).toHaveBeenCalledWith(expect.any(Error));
      expect(logger.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
          action: 'view_transition_dom_update_error',
        }),
        'error'
      );
    });
  });
  
  describe('isViewTransitionSupported', () => {
    it('should return true when the API is available', () => {
      expect(isViewTransitionSupported()).toBe(true);
    });
    
    it('should return false when the API is not available', () => {
      // Remove startViewTransition from document
      Object.defineProperty(document, 'startViewTransition', {
        value: undefined,
        configurable: true,
      });
      
      expect(isViewTransitionSupported()).toBe(false);
    });
  });
  
  describe('retryViewTransition', () => {
    it('should call startViewTransition', async () => {
      const callback = jest.fn();
      
      await retryViewTransition(callback);
      
      expect(mockStartViewTransition).toHaveBeenCalled();
    });
    
    it('should retry when the callback fails', async () => {
      let attempts = 0;
      
      const callback = jest.fn(() => {
        attempts++;
        if (attempts === 1) {
          throw new Error('First attempt failed');
        }
      });
      
      const logger = getRouterLogger();
      
      // Configure retryViewTransition with minimal delay
      await retryViewTransition(callback, {
        maxRetries: 3,
        retryDelay: 1,
      });
      
      expect(attempts).toBe(2); // First attempt fails, second succeeds
      expect(logger.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'performance',
          action: 'view_transition_retry',
        }),
        expect.anything()
      );
    });
    
    it('should throw after maxRetries', async () => {
      const callback = jest.fn(() => {
        throw new Error('Always fails');
      });
      
      const logger = getRouterLogger();
      
      await expect(retryViewTransition(callback, {
        maxRetries: 2,
        retryDelay: 1,
      })).rejects.toThrow('Always fails');
      
      expect(callback).toHaveBeenCalledTimes(3); // Initial + 2 retries
      expect(logger.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
          action: 'view_transition_max_retries',
        }),
        'error'
      );
    });
  });
  
  describe('createNavigationTransition', () => {
    it('should call startViewTransition with the provided callback', async () => {
      const updateDOM = jest.fn();
      
      await createNavigationTransition('/dashboard', updateDOM);
      
      expect(updateDOM).toHaveBeenCalled();
      expect(mockStartViewTransition).toHaveBeenCalled();
    });
    
    it('should log navigation transition', async () => {
      const updateDOM = jest.fn();
      const logger = getRouterLogger();
      
      await createNavigationTransition('/dashboard', updateDOM);
      
      expect(logger.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'navigation',
          action: 'view_transition_navigation',
          data: expect.objectContaining({
            url: '/dashboard',
          }),
        }),
        expect.anything()
      );
    });
    
    it('should pass url data to startViewTransition', async () => {
      const updateDOM = jest.fn();
      
      await createNavigationTransition('/dashboard', updateDOM, {
        name: 'custom-nav',
      });
      
      // Check that we called startViewTransition with options that include the URL
      expect(mockStartViewTransition).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          name: 'custom-nav',
          logData: expect.objectContaining({
            url: '/dashboard',
          }),
        })
      );
    });
  });
}); 