/**
 * Tests for the useNavigation hook
 * @jest-environment jsdom
 */
import '../../../types/jest-test';
import { renderHook, act } from '@testing-library/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useNavigation } from '../useNavigation';
import { getRouterLogger } from '../../logging';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';

// Define types for the navigation hook for testing
interface NavigationOptions {
  replace?: boolean;
  skipLogging?: boolean;
  params?: Record<string, string>;
}

// Create mock logger functions directly
const mockLogNavigation = jest.fn();
const mockLogNavigationError = jest.fn();
const mockLogEvent = jest.fn();

// Mock dependencies
jest.mock('next/navigation');
jest.mock('../../logging', () => ({
  getRouterLogger: jest.fn(() => ({
    logNavigation: mockLogNavigation,
    logNavigationError: mockLogNavigationError,
    logEvent: mockLogEvent
  }))
}));

describe('useNavigation', () => {
  // Mock router
  const mockPush = jest.fn();
  const mockReplace = jest.fn();
  const mockBack = jest.fn();
  const mockForward = jest.fn();
  const mockRefresh = jest.fn();
  const mockPrefetch = jest.fn();
  
  // Mock pathname and search params
  const mockPathname = '/test-path';
  const mockSearchParams = new URLSearchParams('?param=value');
  
  beforeEach(() => {
    // Setup mock returns
    (useRouter as any).mockReturnValue({
      push: mockPush,
      replace: mockReplace,
      back: mockBack,
      forward: mockForward,
      refresh: mockRefresh,
      prefetch: mockPrefetch
    });
    
    (usePathname as any).mockReturnValue(mockPathname);
    (useSearchParams as any).mockReturnValue(mockSearchParams);
    
    // Clear mocks
    jest.clearAllMocks();
  });
  
  it('should provide navigate function', () => {
    const { result } = renderHook(() => useNavigation());
    const navigation = result.current as any;
    
    // Use plain JavaScript checks instead of Jest matchers
    expect(navigation).toBeTruthy();
    expect(navigation.navigate).toBeTruthy();
    expect(typeof navigation.navigate).toBe('function');
  });
  
  it('should provide additional navigation utilities', () => {
    const { result } = renderHook(() => useNavigation());
    const navigation = result.current as any;
    
    expect(navigation).toBeTruthy();
    expect(navigation.navigate).toBeTruthy();
    expect(navigation.back).toBeTruthy();
    expect(navigation.forward).toBeTruthy();
    expect(navigation.refresh).toBeTruthy();
  });
  
  it('should navigate to the provided path', () => {
    const { result } = renderHook(() => useNavigation());
    const navigation = result.current as any;
    
    act(() => {
      navigation.navigate('/dashboard');
    });
    
    expect(mockPush.mock.calls.length).toBe(1);
    expect(mockPush.mock.calls[0][0]).toBe('/dashboard');
  });
  
  it('should replace current route when replace option is true', () => {
    const { result } = renderHook(() => useNavigation());
    const navigation = result.current as any;
    
    act(() => {
      navigation.navigate('/dashboard', { replace: true });
    });
    
    expect(mockReplace.mock.calls.length).toBe(1);
    expect(mockPush.mock.calls.length).toBe(0);
  });
  
  it('should log navigation when not skipped', () => {
    // No need to call getRouterLogger() here since we're accessing the mocks directly
    const { result } = renderHook(() => useNavigation());
    const navigation = result.current as any;
    
    act(() => {
      navigation.navigate('/dashboard');
    });
    
    expect(mockLogNavigation.mock.calls.length).toBe(1);
    expect(mockLogNavigation.mock.calls[0][0]).toBe(mockPathname);
    expect(mockLogNavigation.mock.calls[0][1]).toBe('/dashboard');
    expect(mockLogNavigation.mock.calls[0][2]).toBe(undefined);
  });
  
  it('should not log navigation when skipLogging is true', () => {
    // No need to call getRouterLogger() here
    const { result } = renderHook(() => useNavigation());
    const navigation = result.current as any;
    
    act(() => {
      navigation.navigate('/dashboard', { skipLogging: true });
    });
    
    expect(mockLogNavigation.mock.calls.length).toBe(0);
  });
  
  it('should navigate with parameters', () => {
    const { result } = renderHook(() => useNavigation());
    const navigation = result.current as any;
    
    act(() => {
      navigation.navigate('/dashboard', { 
        params: { tab: 'overview', filter: 'recent' } 
      });
    });
    
    expect(mockPush.mock.calls.length).toBe(1);
    expect(mockPush.mock.calls[0][0]).toBe('/dashboard?tab=overview&filter=recent');
  });
  
  it('should append parameters to existing URL if it contains a query string', () => {
    const { result } = renderHook(() => useNavigation());
    const navigation = result.current as any;
    
    act(() => {
      navigation.navigate('/dashboard?existing=true', { 
        params: { tab: 'overview' } 
      });
    });
    
    expect(mockPush.mock.calls.length).toBe(1);
    expect(mockPush.mock.calls[0][0]).toBe('/dashboard?existing=true&tab=overview');
  });
  
  it('should navigate back', () => {
    const { result } = renderHook(() => useNavigation());
    const navigation = result.current as any;
    
    act(() => {
      navigation.back();
    });
    
    expect(mockBack.mock.calls.length).toBe(1);
  });
  
  it('should navigate forward', () => {
    const { result } = renderHook(() => useNavigation());
    const navigation = result.current as any;
    
    act(() => {
      navigation.forward();
    });
    
    expect(mockForward.mock.calls.length).toBe(1);
  });
  
  it('should refresh current page', () => {
    const { result } = renderHook(() => useNavigation());
    const navigation = result.current as any;
    
    act(() => {
      navigation.refresh();
    });
    
    expect(mockRefresh.mock.calls.length).toBe(1);
  });
  
  it('should handle errors during navigation', () => {
    const mockError = new Error('Navigation failed');
    
    // Make push throw an error for this test
    mockPush.mockImplementationOnce(() => {
      throw mockError;
    });
    
    const { result } = renderHook(() => useNavigation());
    const navigation = result.current as any;
    
    expect(() => {
      act(() => {
        navigation.navigate('/dashboard');
      });
    }).toThrow('Navigation failed');
    
    expect(mockLogNavigationError.mock.calls.length).toBe(1);
    expect(mockLogNavigationError.mock.calls[0][0]).toBe(mockPathname);
    expect(mockLogNavigationError.mock.calls[0][1]).toBe('/dashboard');
    expect(mockLogNavigationError.mock.calls[0][2]).toBe(mockError);
    expect(mockLogNavigationError.mock.calls[0][3]).toBe(undefined);
  });
}); 