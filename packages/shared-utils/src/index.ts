/**
 * Common utility functions
 */

/**
 * Helper function to safely access nested object properties
 * @param obj The object to access
 * @param path The path to the property as a string (e.g., 'user.profile.name')
 * @param defaultValue A default value to return if the property is not found
 */
export const get = <T>(obj: Record<string, any>, path: string, defaultValue?: T): T | undefined => {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === undefined || result === null || typeof result !== 'object') {
      return defaultValue;
    }
    
    result = result[key];
  }
  
  return (result === undefined) ? defaultValue : (result as T);
};

/**
 * Utility to delay execution for a specified number of milliseconds
 * @param ms Milliseconds to delay
 */
export const sleep = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Format a number as currency
 * @param value Number to format
 * @param locale Locale to use (defaults to 'en-US')
 * @param currency Currency code (defaults to 'USD')
 */
export const formatCurrency = (
  value: number, 
  locale = 'en-US', 
  currency = 'USD'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};

/**
 * Generate a random UUID
 */
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Debounce a function call
 * @param fn Function to debounce
 * @param ms Milliseconds to wait
 */
export const debounce = <T extends (...args: any[]) => any>(
  fn: T, 
  ms = 300
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

/**
 * Check if a value is empty (null, undefined, empty string, empty array, or empty object)
 * @param value Value to check
 */
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  
  return false;
};
