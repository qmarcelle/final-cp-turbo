'use client';

import React, { useState, useEffect } from 'react';
import { useNavigation, createNavigationTransition } from '../src';
import { getRouterLogger, RouterEventType } from '../src/logging';

/**
 * Example component demonstrating how to use view transitions with the router
 * and integrate with the logging system for performance monitoring
 */
export function ViewTransitionExample() {
  const { navigate } = useNavigation();
  const [currentPage, setCurrentPage] = useState('home');
  const logger = getRouterLogger();
  
  // Example pages for demonstration
  const pages = {
    home: {
      title: 'Home',
      content: 'Welcome to the home page. Click a link to navigate.',
    },
    about: {
      title: 'About',
      content: 'This is the about page with information about our company.',
    },
    contact: {
      title: 'Contact',
      content: 'Contact us at example@example.com or call us at 555-123-4567.',
    },
    products: {
      title: 'Products',
      content: 'Explore our range of products designed to meet your needs.',
    },
  };
  
  // Custom navigation with view transitions
  const navigateWithTransition = async (page: keyof typeof pages) => {
    try {
      // First, log the navigation intent
      logger.logEvent({
        type: RouterEventType.NAVIGATION,
        action: 'transition_navigation_start',
        data: {
          from: currentPage,
          to: page,
        },
        timestamp: Date.now(),
      });
      
      // Use the createNavigationTransition utility from the router package
      await createNavigationTransition(
        `/example/${page}`,
        async () => {
          // This callback will run during the transition
          // In a real app, this might update the router state
          // and let React update the DOM
          
          // For this example, we'll just update our local state
          setCurrentPage(page);
          
          // Simulate a data fetch delay (remove this in a real app)
          if (process.env.NODE_ENV === 'development') {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        },
        {
          name: `navigate-to-${page}`,
          logPerformance: true,
          logData: {
            from: currentPage,
            to: page,
            isDemo: true,
          },
          onFinish: () => {
            // This will run when the transition animations are complete
            console.log(`Transition to ${page} complete`);
          },
        }
      );
      
      // Update the browser URL without a full page refresh
      // In a real app, this would be handled by the router
      navigate(`/example/${page}`, { 
        replace: false,
        skipLogging: true, // We're already logging in the transition
      });
      
    } catch (error) {
      // Log any errors that occurred during the transition
      logger.logEvent({
        type: RouterEventType.ERROR,
        action: 'transition_navigation_error',
        data: {
          from: currentPage,
          to: page,
          error: error instanceof Error ? error.message : String(error),
        },
        timestamp: Date.now(),
        error: error instanceof Error ? error : new Error(String(error)),
      });
      
      // Fallback navigation without transitions
      setCurrentPage(page);
      navigate(`/example/${page}`, { replace: false });
    }
  };
  
  // Apply CSS for the view transitions
  useEffect(() => {
    // Add styles needed for view transitions
    const style = document.createElement('style');
    style.textContent = `
      /* Define view transition names for elements */
      .page-title {
        view-transition-name: page-title;
      }
      
      .page-content {
        view-transition-name: page-content;
      }
      
      /* Style the transition animation */
      ::view-transition-old(page-title),
      ::view-transition-new(page-title) {
        height: 100%;
        object-fit: cover;
      }
      
      ::view-transition-old(page-content),
      ::view-transition-new(page-content) {
        height: 100%;
      }
      
      /* Animation for the title */
      @keyframes slide-from-right {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
      }
      
      @keyframes slide-to-left {
        from { transform: translateX(0); }
        to { transform: translateX(-100%); }
      }
      
      /* Apply animations to view transitions */
      ::view-transition-old(page-title) {
        animation: 300ms slide-to-left ease-in-out;
      }
      
      ::view-transition-new(page-title) {
        animation: 300ms slide-from-right ease-in-out;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      // Clean up when the component unmounts
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <div className="view-transition-example">
      <h1 className="page-title">{pages[currentPage as keyof typeof pages].title}</h1>
      
      <div className="page-content">
        <p>{pages[currentPage as keyof typeof pages].content}</p>
      </div>
      
      <nav>
        <ul>
          {Object.keys(pages).map((page) => (
            <li key={page}>
              <button
                onClick={() => navigateWithTransition(page as keyof typeof pages)}
                disabled={currentPage === page}
              >
                {pages[page as keyof typeof pages].title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="transition-info">
        <p>
          <small>
            This example demonstrates page transitions using the View Transitions API
            with integrated performance logging through the router package.
          </small>
        </p>
        
        <details>
          <summary>Open browser console to see transition logs</summary>
          <p>
            Performance metrics for each transition are logged to the console
            and can be collected by your logging system for analysis.
          </p>
        </details>
      </div>
    </div>
  );
}

 