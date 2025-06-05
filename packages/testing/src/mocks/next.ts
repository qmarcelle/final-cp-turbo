/**
 * Mock utilities for Next.js
 * Provides type-safe mocks for Next.js components and functions
 */
import { NextRequest, NextResponse } from 'next/server';

/**
 * Creates a mock NextRequest object for testing middleware
 */
export function createMockNextRequest(props: {
  pathname: string;
  url?: string;
  cookieValues?: Record<string, string>;
}): NextRequest {
  const { pathname, url = `https://example.com${pathname}`, cookieValues = {} } = props;
  
  // Create a mock request object that matches the NextRequest interface
  const mockRequest = {
    nextUrl: { pathname },
    url,
    cookies: {
      get: jest.fn((name: string) => {
        if (cookieValues[name]) {
          return { value: cookieValues[name] };
        }
        return undefined;
      })
    }
  };
  
  return mockRequest as unknown as NextRequest;
}

/**
 * Creates mock NextResponse functions for testing middleware
 */
export function createMockNextResponse() {
  // Create mock implementations of NextResponse methods
  const mockNext = jest.fn(() => 'NEXT_RESPONSE');
  const mockRedirect = jest.fn((url) => `REDIRECT_TO_${url}`);
  
  // Mock the NextResponse object
  const originalNextResponse = NextResponse;
  
  // Replace NextResponse methods with mocks
  (NextResponse as any).next = mockNext;
  (NextResponse as any).redirect = mockRedirect;
  
  // Return utilities for testing
  return {
    mockNext,
    mockRedirect,
    // Restore original NextResponse
    restore: () => {
      NextResponse.next = originalNextResponse.next;
      NextResponse.redirect = originalNextResponse.redirect;
    }
  };
}

/**
 * Creates mock router hooks for testing components that use Next.js navigation
 */
export function createMockRouter(props: {
  pathname?: string;
  query?: Record<string, string>;
  asPath?: string;
  push?: jest.Mock;
  replace?: jest.Mock;
  back?: jest.Mock;
} = {}) {
  return {
    pathname: props.pathname || '/test-path',
    query: props.query || {},
    asPath: props.asPath || '/test-path',
    push: props.push || jest.fn(),
    replace: props.replace || jest.fn(),
    back: props.back || jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn()
  };
}

/**
 * Mock for useSearchParams hook
 */
export function createMockSearchParams(params: Record<string, string> = {}) {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    searchParams.set(key, value);
  });
  
  return searchParams;
} 