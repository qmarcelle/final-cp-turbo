/**
 * Transitions module for the router package
 * 
 * This module provides utilities for working with transitions between pages,
 * including support for the View Transitions API.
 */

export {
  startViewTransition,
  isViewTransitionSupported,
  retryViewTransition,
  createNavigationTransition,
  type ViewTransitionOptions,
} from './viewTransitionManager'; 