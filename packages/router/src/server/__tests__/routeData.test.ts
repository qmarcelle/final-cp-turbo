/**
 * Tests for server-side data fetching utilities
 */
import { getRouteData, prefetchRouteData, invalidateRouteData } from '../routeData';
import { getRouterLogger } from '../../logging';
import { unstable_cache } from 'next/cache';

// Mock dependencies
jest.mock('next/cache', () => ({
  unstable_cache: jest.fn((fn) => fn),
}));

jest.mock('../../logging', () => ({
  getRouterLogger: jest.fn(() => ({
    logEvent: jest.fn(),
    logDataFetch: jest.fn(() => ({
      complete: jest.fn(),
    })),
  })),
  RouterEventType: {
    DATA_FETCH: 'data_fetch',
    ERROR: 'error',
  },
  LogLevel: {
    DEBUG: 'debug',
    ERROR: 'error',
    WARN: 'warn',
  },
}));

// Mock fetch
global.fetch = jest.fn();

describe('Server-side data fetching', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock successful fetch by default
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: 'test-data' }),
    });
  });
  
  describe('getRouteData', () => {
    it('should fetch data from the provided URL', async () => {
      const result = await getRouteData('/api/test');
      
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      
      expect(result).toEqual({ data: 'test-data' });
    });
    
    it('should replace route parameters with provided values', async () => {
      await getRouteData('/api/users/:userId/posts/:postId', {
        userId: '123',
        postId: '456',
      });
      
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/users/123/posts/456',
        expect.anything()
      );
    });
    
    it('should use cache by default', async () => {
      // First call
      await getRouteData('/api/test');
      
      // Second call to same URL
      await getRouteData('/api/test');
      
      // Fetch should only be called once due to caching
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
    
    it('should skip cache when explicitly disabled', async () => {
      // First call
      await getRouteData('/api/test', {}, { cache: false });
      
      // Second call to same URL with cache disabled
      await getRouteData('/api/test', {}, { cache: false });
      
      // Fetch should be called twice (no caching)
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
    
    it('should include custom headers in the request', async () => {
      await getRouteData('/api/test', {}, {
        headers: {
          'Authorization': 'Bearer token123',
          'X-Custom-Header': 'custom-value',
        },
      });
      
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer token123',
            'X-Custom-Header': 'custom-value',
          }),
        })
      );
    });
    
    it('should handle fetch errors properly', async () => {
      const mockError = new Error('Network error');
      (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);
      
      await expect(getRouteData('/api/test')).rejects.toThrow('Network error');
      
      const logger = getRouterLogger();
      expect(logger.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'data_fetch',
          action: 'fetch_network_error',
        }),
        'error'
      );
    });
    
    it('should handle HTTP error responses', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });
      
      await expect(getRouteData('/api/test')).rejects.toThrow('Error fetching route data: 404');
      
      const logger = getRouterLogger();
      expect(logger.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'data_fetch',
          action: 'fetch_error',
          data: expect.objectContaining({
            status: 404,
            statusText: 'Not Found',
          }),
        }),
        'error'
      );
    });
    
    it('should log data fetching properly when logging is enabled', async () => {
      await getRouteData('/api/test', {}, { enableLogging: true });
      
      const logger = getRouterLogger();
      expect(logger.logDataFetch).toHaveBeenCalled();
    });
  });
  
  describe('prefetchRouteData', () => {
    it('should call getRouteData with cache enabled', async () => {
      // Spy on getRouteData
      const getRouteDataSpy = jest.spyOn({ getRouteData }, 'getRouteData');
      
      await prefetchRouteData('/api/test', { param: 'value' });
      
      expect(getRouteDataSpy).toHaveBeenCalledWith(
        '/api/test',
        { param: 'value' },
        expect.objectContaining({ cache: true })
      );
    });
    
    it('should not throw if getRouteData fails', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'));
      
      // This should not throw even though the fetch fails
      await expect(prefetchRouteData('/api/test')).resolves.not.toThrow();
      
      const logger = getRouterLogger();
      expect(logger.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
          action: 'prefetch_error',
        }),
        'warn'
      );
    });
  });
  
  describe('invalidateRouteData', () => {
    it('should log invalidation events', async () => {
      await invalidateRouteData('/api/test');
      
      const logger = getRouterLogger();
      expect(logger.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'data_fetch',
          action: 'invalidate',
        })
      );
      
      expect(logger.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'data_fetch',
          action: 'invalidate_complete',
        })
      );
    });
    
    it('should replace route parameters in invalidation urls', async () => {
      await invalidateRouteData('/api/users/:userId', { userId: '123' });
      
      const logger = getRouterLogger();
      expect(logger.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'data_fetch',
          action: 'invalidate',
          data: expect.objectContaining({
            url: '/api/users/123',
          }),
        })
      );
    });
  });
}); 