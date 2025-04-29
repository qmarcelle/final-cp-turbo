/**
 * MERGED COMPONENT
 * Consolidates analytics functionality from:
 * - ClientInitComponent
 * - SiteHeaderNavSection
 * - ProfileHeaderCard
 * - Various components with analytics tracking
 */

'use client';

import React from 'react';
import TagManager from 'react-gtm-module';

/**
 * Types for analytics events
 */
export interface AnalyticsEvent {
  event: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

interface PageViewProps {
  title?: string;
  path?: string;
  businessUnit?: string;
  [key: string]: any;
}

/**
 * Hook for unified analytics tracking across the application
 */
export function useAnalytics() {
  /**
   * Initialize Google Tag Manager
   */
  const initialize = React.useCallback((gtmId: string, dataLayer: object = {}) => {
    console.log('Initializing Google Analytics');
    TagManager.initialize({
      gtmId,
      dataLayer: {
        business_unit: 'member',
        page_name: typeof window !== 'undefined' ? window.document.title : '',
        ...dataLayer,
      },
    });
  }, []);

  /**
   * Track a custom event
   */
  const trackEvent = React.useCallback((event: AnalyticsEvent) => {
    TagManager.dataLayer({
      dataLayer: {
        ...event,
        timestamp: new Date().toISOString(),
      },
    });
  }, []);

  /**
   * Track a page view
   */
  const trackPageView = React.useCallback((props: PageViewProps = {}) => {
    const { title = document.title, path = window.location.pathname, ...rest } = props;
    
    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        page_title: title,
        page_path: path,
        page_location: window.location.href,
        ...rest,
        timestamp: new Date().toISOString(),
      },
    });
  }, []);

  /**
   * Track a navigation click
   */
  const trackNavClick = React.useCallback((label: string, additionalData: object = {}) => {
    trackEvent({
      event: 'navigation_click',
      category: 'Navigation',
      action: 'Click',
      label,
      ...additionalData,
    });
  }, [trackEvent]);

  /**
   * Track a button click
   */
  const trackButtonClick = React.useCallback((label: string, additionalData: object = {}) => {
    trackEvent({
      event: 'button_click',
      category: 'Interaction',
      action: 'Click',
      label,
      ...additionalData,
    });
  }, [trackEvent]);

  /**
   * Track a form submission
   */
  const trackFormSubmit = React.useCallback((formName: string, additionalData: object = {}) => {
    trackEvent({
      event: 'form_submit',
      category: 'Form',
      action: 'Submit',
      label: formName,
      ...additionalData,
    });
  }, [trackEvent]);

  /**
   * Track user authentication
   */
  const trackAuthentication = React.useCallback((success: boolean, method: string, additionalData: object = {}) => {
    trackEvent({
      event: success ? 'authentication_success' : 'authentication_failure',
      category: 'Authentication',
      action: success ? 'Success' : 'Failure',
      label: method,
      ...additionalData,
    });
  }, [trackEvent]);

  /**
   * Enhanced click tracking with automatic data extraction
   */
  const withTracking = React.useCallback((
    callback: (e: React.MouseEvent) => void | Promise<void>,
    options: { label: string; category?: string; action?: string; additionalData?: object } = { label: 'Unknown' }
  ) => {
    return (e: React.MouseEvent) => {
      const { label, category = 'Interaction', action = 'Click', additionalData = {} } = options;
      
      trackEvent({
        event: 'tracked_click',
        category,
        action,
        label,
        ...additionalData,
      });
      
      return callback(e);
    };
  }, [trackEvent]);

  return {
    initialize,
    trackEvent,
    trackPageView,
    trackNavClick,
    trackButtonClick,
    trackFormSubmit,
    trackAuthentication,
    withTracking,
  };
}

// Context for making analytics available throughout the app without props drilling
interface AnalyticsContextType {
  trackEvent: (event: AnalyticsEvent) => void;
  trackPageView: (props?: PageViewProps) => void;
  trackNavClick: (label: string, additionalData?: object) => void;
  trackButtonClick: (label: string, additionalData?: object) => void;
  trackFormSubmit: (formName: string, additionalData?: object) => void;
  trackAuthentication: (success: boolean, method: string, additionalData?: object) => void;
  withTracking: (
    callback: (e: React.MouseEvent) => void | Promise<void>,
    options?: { label: string; category?: string; action?: string; additionalData?: object }
  ) => (e: React.MouseEvent) => void | Promise<void>;
}

const AnalyticsContext = React.createContext<AnalyticsContextType | null>(null);

interface AnalyticsProviderProps {
  gtmId: string;
  children: React.ReactNode;
  initialDataLayer?: object;
}

/**
 * Provider component that makes analytics available throughout the app
 */
export function AnalyticsProvider({ gtmId, children, initialDataLayer = {} }: AnalyticsProviderProps) {
  const {
    initialize,
    trackEvent,
    trackPageView,
    trackNavClick,
    trackButtonClick,
    trackFormSubmit,
    trackAuthentication,
    withTracking,
  } = useAnalytics();

  React.useEffect(() => {
    initialize(gtmId, initialDataLayer);
  }, [initialize, gtmId, initialDataLayer]);

  const value = React.useMemo(() => ({
    trackEvent,
    trackPageView,
    trackNavClick,
    trackButtonClick,
    trackFormSubmit,
    trackAuthentication,
    withTracking,
  }), [
    trackEvent,
    trackPageView,
    trackNavClick,
    trackButtonClick,
    trackFormSubmit,
    trackAuthentication,
    withTracking,
  ]);

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

/**
 * Hook for using analytics context
 */
export function useAnalyticsContext() {
  const context = React.useContext(AnalyticsContext);
  
  if (!context) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
  }
  
  return context;
}

/**
 * HOC to add analytics tracking to any component
 */
export function withAnalytics<P extends object>(
  Component: React.ComponentType<P>,
  trackingOptions?: { 
    pageView?: boolean; 
    pageViewProps?: PageViewProps;
  }
) {
  const WithAnalytics = (props: P) => {
    const analytics = useAnalyticsContext();
    
    React.useEffect(() => {
      if (trackingOptions?.pageView) {
        analytics.trackPageView(trackingOptions.pageViewProps);
      }
    }, []);

    return <Component {...props} analytics={analytics} />;
  };

  WithAnalytics.displayName = `WithAnalytics(${Component.displayName || Component.name || 'Component'})`;
  
  return WithAnalytics;
}