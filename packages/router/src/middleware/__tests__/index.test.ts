/**
 * Tests for route middleware
 */
import { NextRequest, NextResponse } from 'next/server';
import { createRouteMiddleware, routeConfig } from '../';
import { getRouterLogger } from '../../logging';
import { createMockNextRequest, createMockNextResponse } from '@cp/testing';

// Mock dependencies
jest.mock('next/server');
jest.mock('../../logging', () => ({
  getRouterLogger: jest.fn(() => ({
    logMiddleware: jest.fn(),
    logAuth: jest.fn(),
    logEvent: jest.fn(),
  })),
  RouterEventType: {
    MIDDLEWARE: 'middleware',
    ERROR: 'error',
  },
  LogLevel: {
    ERROR: 'error',
    WARN: 'warn',
  },
}));

describe('Route Middleware', () => {
  // Setup mocks for each test
  let mockNextResponse: ReturnType<typeof createMockNextResponse>;
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup NextResponse mock
    mockNextResponse = createMockNextResponse();
  });
  
  afterEach(() => {
    // Restore NextResponse mock
    mockNextResponse.restore();
  });
  
  it('should allow access to public routes', async () => {
    const middleware = createRouteMiddleware({
      publicRoutes: ['/login', '/register'],
      protectByDefault: true,
    });
    
    // Create a mock request using the utility
    const request = createMockNextRequest({
      pathname: '/login'
    });
    
    const response = await middleware(request);
    
    expect(response).toBe('NEXT_RESPONSE');
    expect(mockNextResponse.mockNext).toHaveBeenCalled();
  });
  
  it('should redirect to login for protected routes without auth', async () => {
    const middleware = createRouteMiddleware({
      publicRoutes: ['/login'],
      protectByDefault: true,
      loginRoute: '/login',
    });
    
    const request = createMockNextRequest({
      pathname: '/dashboard'
    });
    
    const response = await middleware(request);
    
    expect(response).toMatch(/REDIRECT_TO_/);
    expect(mockNextResponse.mockRedirect).toHaveBeenCalledWith(
      expect.any(URL)
    );
  });
  
  it('should include returnUrl in login redirect', async () => {
    const middleware = createRouteMiddleware({
      publicRoutes: ['/login'],
      protectByDefault: true,
      loginRoute: '/login',
    });
    
    const request = createMockNextRequest({
      pathname: '/dashboard'
    });
    
    await middleware(request);
    
    const redirectUrl = mockNextResponse.mockRedirect.mock.calls[0][0];
    expect(redirectUrl.searchParams.get('returnUrl')).toBe('/dashboard');
  });
  
  it('should allow access to protected routes with auth token', async () => {
    const middleware = createRouteMiddleware({
      publicRoutes: ['/login'],
      protectByDefault: true,
    });
    
    const request = createMockNextRequest({
      pathname: '/dashboard',
      cookieValues: {
        'auth-token': 'token-value'
      }
    });
    
    const response = await middleware(request);
    
    expect(response).toBe('NEXT_RESPONSE');
    expect(mockNextResponse.mockNext).toHaveBeenCalled();
  });
  
  it('should log middleware execution', async () => {
    const middleware = createRouteMiddleware({
      publicRoutes: ['/login'],
      protectByDefault: true,
      enableLogging: true,
    });
    
    const request = createMockNextRequest({
      pathname: '/login'
    });
    
    await middleware(request);
    
    const logger = getRouterLogger();
    expect(logger.logMiddleware).toHaveBeenCalledWith(
      'public_route',
      '/login',
      'allowed'
    );
  });
  
  it('should log authorization check', async () => {
    const middleware = createRouteMiddleware({
      publicRoutes: ['/login'],
      protectByDefault: true,
      enableLogging: true,
    });
    
    const request = createMockNextRequest({
      pathname: '/dashboard',
      cookieValues: {
        'auth-token': 'token-value'
      }
    });
    
    await middleware(request);
    
    const logger = getRouterLogger();
    expect(logger.logAuth).toHaveBeenCalledWith(
      'middleware_token_check',
      true,
      expect.objectContaining({
        path: '/dashboard',
      })
    );
  });
  
  it('should use custom authorization function if provided', async () => {
    const authorize = jest.fn().mockResolvedValue(true);
    
    const middleware = createRouteMiddleware({
      protectByDefault: true,
      authorize,
    });
    
    const request = createMockNextRequest({
      pathname: '/dashboard',
      cookieValues: {
        'auth-token': 'token-value'
      }
    });
    
    await middleware(request);
    
    expect(authorize).toHaveBeenCalledWith(request);
    
    const logger = getRouterLogger();
    expect(logger.logAuth).toHaveBeenCalledWith(
      'middleware_authorization',
      true,
      expect.any(Object)
    );
  });
  
  it('should handle errors gracefully', async () => {
    const authorize = jest.fn().mockImplementation(() => {
      throw new Error('Authorization error');
    });
    
    const middleware = createRouteMiddleware({
      protectByDefault: true,
      authorize,
      loginRoute: '/login',
    });
    
    const request = createMockNextRequest({
      pathname: '/dashboard'
    });
    
    const response = await middleware(request);
    
    expect(response).toMatch(/REDIRECT_TO_/);
    
    const logger = getRouterLogger();
    expect(logger.logMiddleware).toHaveBeenCalledWith(
      'error',
      '/dashboard',
      'error'
    );
    expect(logger.logEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'error',
        action: 'middleware_error',
      }),
      'error'
    );
  });
  
  it('should only protect routes specified in protectedRoutes when protectByDefault is false', async () => {
    const middleware = createRouteMiddleware({
      protectByDefault: false,
      protectedRoutes: ['/admin', '/dashboard'],
      loginRoute: '/login',
    });
    
    // Should NOT protect a route not in the protectedRoutes list
    const publicRequest = createMockNextRequest({
      pathname: '/profile'
    });
    const publicResponse = await middleware(publicRequest);
    
    expect(publicResponse).toBe('NEXT_RESPONSE');
    
    // SHOULD protect a route in the protectedRoutes list
    const protectedRequest = createMockNextRequest({
      pathname: '/admin'
    });
    const protectedResponse = await middleware(protectedRequest);
    
    expect(protectedResponse).toMatch(/REDIRECT_TO_/);
  });
  
  describe('routeConfig', () => {
    it('should return matcher configuration', () => {
      const config = routeConfig();
      
      expect(config).toHaveProperty('matcher');
      expect(Array.isArray(config.matcher)).toBe(true);
      expect(config.matcher[0]).toMatch(/\(\(\?!_next/);
    });
  });
}); 