import type { useState, useEffect } from 'react';
import { getBasePath } from '../utils/urlHelpers';

/**
 * Hook to get the current base path
 * Works in both client and server components
 */
export function useBasePath(): string {
  // We'll use a runtime check to ensure React is available
  let basePath = '';
  
  // Client-side only code
  if (typeof window !== 'undefined') {
    // Dynamic import React with type information
    const React = require('react') as typeof import('react');
    const [path, setPath] = React.useState<string>(getBasePath());
    
    React.useEffect(() => {
      setPath(getBasePath());
    }, []);
    
    basePath = path;
  } else {
    // Server-side, just return the value directly
    basePath = getBasePath();
  }
  
  return basePath;
} 