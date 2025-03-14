/**
 * Enhanced navigation hook with View Transitions API support
 * Provides smooth page transitions for better user experience
 */
import { useCallback, useEffect, useState } from 'react';
import { useNavigation } from './useNavigation';
import type { RoutePath, RouteParams } from '../constants/routes';

/**
 * Type-safe interface for View Transitions API
 * Without modifying the global Document interface to avoid type conflicts
 */
interface ViewTransitionAPI {
  /**
   * Check if View Transitions API is supported
   */
  isSupported(): boolean;
  
  /**
   * Start a view transition with a callback
   */
  startTransition(callback: () => void): Promise<void>;
}

export interface TransitionOptions {
  /**
   * Enable view transition animation
   * @default true
   */
  animate?: boolean;
  
  /**
   * CSS animation duration in milliseconds
   * @default 300
   */
  duration?: number;
  
  /**
   * CSS animation easing function
   * @default 'ease'
   */
  easing?: string;
  
  /**
   * Class to apply during transition
   */
  className?: string;
  
  /**
   * Callback when transition starts
   */
  onStart?: () => void;
  
  /**
   * Callback when transition ends
   */
  onFinish?: () => void;
  
  /**
   * Whether to scroll to top after navigation
   * @default true
   */
  scroll?: boolean;
  
  /**
   * Whether to prefetch the target route
   * @default true
   */
  prefetch?: boolean;
}

/**
 * Safely check if View Transitions API is supported in the current browser
 */
export function isViewTransitionsSupported(): boolean {
  return typeof document !== 'undefined' && 'startViewTransition' in document;
}

/**
 * Create a safe wrapper around the View Transitions API
 */
function createViewTransitionAPI(): ViewTransitionAPI {
  return {
    isSupported: isViewTransitionsSupported,
    
    startTransition: async (callback: () => void): Promise<void> => {
      if (!isViewTransitionsSupported()) {
        callback();
        return Promise.resolve();
      }
      
      try {
        // Use any to avoid type conflicts with the Document interface
        const doc = document as any;
        const transition = doc.startViewTransition(callback);
        await transition.finished;
      } catch (error) {
        // Fallback if transition fails
        console.error('View transition error:', error);
        callback();
      }
    }
  };
}

/**
 * Hook for enhanced navigation with View Transitions API support
 */
export function useTransitionNavigation() {
  const navigation = useNavigation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionSupported] = useState(isViewTransitionsSupported);
  
  // Create View Transitions API wrapper
  const viewTransitionAPI = createViewTransitionAPI();
  
  // Configure CSS variables for transitions when the component mounts
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const style = document.documentElement.style;
    
    // Set default transition properties if not already defined
    if (!style.getPropertyValue('--view-transition-duration')) {
      style.setProperty('--view-transition-duration', '300ms');
    }
    
    if (!style.getPropertyValue('--view-transition-easing')) {
      style.setProperty('--view-transition-easing', 'ease');
    }
  }, []);
  
  /**
   * Navigate with view transitions if supported
   */
  const navigate = useCallback(<T extends RoutePath>(
    route: T,
    params?: T extends keyof RouteParams ? RouteParams[T] : never,
    options?: TransitionOptions
  ) => {
    const {
      animate = true,
      duration = 300,
      easing = 'ease',
      className,
      onStart,
      onFinish,
      scroll = true,
      prefetch = true,
    } = options || {};
    
    // Should we animate the transition?
    const shouldAnimate = animate && transitionSupported;
    
    // Set CSS variables for the transition
    if (shouldAnimate && typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--view-transition-duration', `${duration}ms`);
      document.documentElement.style.setProperty('--view-transition-easing', easing);
    }
    
    // Add transition class if provided
    if (className && typeof document !== 'undefined') {
      document.documentElement.classList.add(className);
    }
    
    setIsTransitioning(true);
    onStart?.();
    
    // Navigate with or without transition
    const performNavigation = () => {
      navigation.navigate(route, params, { scroll, prefetch });
    };
    
    if (shouldAnimate) {
      viewTransitionAPI.startTransition(performNavigation)
        .then(() => {
          setIsTransitioning(false);
          onFinish?.();
          
          // Remove transition class if provided
          if (className && typeof document !== 'undefined') {
            document.documentElement.classList.remove(className);
          }
        })
        .catch(() => {
          setIsTransitioning(false);
          
          // Remove transition class if provided
          if (className && typeof document !== 'undefined') {
            document.documentElement.classList.remove(className);
          }
        });
    } else {
      // Fallback for browsers without View Transitions API
      performNavigation();
      setIsTransitioning(false);
      onFinish?.();
    }
  }, [navigation, transitionSupported, viewTransitionAPI]);
  
  /**
   * Prefetch route for faster navigation
   */
  const prefetchRoute = useCallback((route: string) => {
    navigation.prefetchRoute(route);
  }, [navigation]);
  
  return {
    ...navigation,
    navigate,
    prefetchRoute,
    isTransitioning,
    isTransitionsSupported: transitionSupported,
  };
}

export default useTransitionNavigation; 