import { renderHook, act } from '@testing-library/react-hooks';
import { useNavigate } from '../hooks/useNavigate';
import { navigationStore } from '../stores/navigationStore';
import { expect, describe, it, beforeEach, jest } from '@jest/globals';

jest.mock('../stores/navigationStore', () => ({
  navigationStore: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    goForward: jest.fn(),
    replaceRoute: jest.fn(),
  },
}));

describe('useNavigate Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns navigation functions', () => {
    const { result } = renderHook(() => useNavigate());
    
    expect(typeof result.current.navigate).toBe('function');
    expect(typeof result.current.goBack).toBe('function');
    expect(typeof result.current.goForward).toBe('function');
    expect(typeof result.current.replace).toBe('function');
  });

  it('calls navigationStore.navigate when navigate is called', () => {
    const { result } = renderHook(() => useNavigate());
    
    act(() => {
      result.current.navigate('/dashboard');
    });
    
    expect(navigationStore.navigate).toHaveBeenCalledWith('/dashboard');
  });

  it('calls navigationStore.goBack when goBack is called', () => {
    const { result } = renderHook(() => useNavigate());
    
    act(() => {
      result.current.goBack();
    });
    
    expect(navigationStore.goBack).toHaveBeenCalled();
  });

  it('calls navigationStore.goForward when goForward is called', () => {
    const { result } = renderHook(() => useNavigate());
    
    act(() => {
      result.current.goForward();
    });
    
    expect(navigationStore.goForward).toHaveBeenCalled();
  });

  it('calls navigationStore.replaceRoute when replace is called', () => {
    const { result } = renderHook(() => useNavigate());
    
    act(() => {
      result.current.replace('/settings');
    });
    
    expect(navigationStore.replaceRoute).toHaveBeenCalledWith('/settings');
  });
}); 