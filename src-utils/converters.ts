/**
 * Base64 and Blob Conversion Utilities
 */

/**
 * Converts base64 string to Blob object
 * @param b64Data Base64 encoded string
 * @param contentType MIME type for the blob
 * @param sliceSize Size of slices for processing large data
 * @returns Blob object
 */
export const base64ToBlob = (
  b64Data: string,
  contentType = '',
  sliceSize = 512,
): Blob => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  console.log('Blob size', blob.size);
  return blob;
};

/**
 * Converts Blob to base64 string
 * @param blob Blob object to convert
 * @returns Promise resolving to base64 string
 */
export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        // Remove data URL prefix (e.g., "data:image/png;base64,")
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('Failed to convert blob to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/**
 * Converts File to base64 string
 * @param file File object to convert
 * @returns Promise resolving to base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return blobToBase64(file);
};

/**
 * Object Utilities
 */

/**
 * Checks if a value is an object (excludes null and arrays)
 * @param data Value to check
 * @returns True if data is an object
 */
export function isObject(data: any): data is Record<string, any> {
  return data !== null && typeof data === 'object' && !Array.isArray(data);
}

/**
 * Checks if a value is a plain object (not an instance of a class)
 * @param data Value to check
 * @returns True if data is a plain object
 */
export function isPlainObject(data: any): data is Record<string, any> {
  if (!isObject(data)) return false;
  
  // Check if it's a plain object (not an instance)
  const proto = Object.getPrototypeOf(data);
  return proto === null || proto === Object.prototype;
}

/**
 * Deep clones an object using JSON methods (with limitations)
 * @param obj Object to clone
 * @returns Deep cloned object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Safely gets a nested property from an object using dot notation
 * @param obj Object to get property from
 * @param path Dot-separated path (e.g., 'user.profile.name')
 * @param defaultValue Default value if property doesn't exist
 * @returns Property value or default
 */
export function getNestedProperty(
  obj: any,
  path: string,
  defaultValue: any = undefined,
): any {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === null || result === undefined || !(key in result)) {
      return defaultValue;
    }
    result = result[key];
  }
  
  return result;
}

/**
 * Safely sets a nested property in an object using dot notation
 * @param obj Object to set property in
 * @param path Dot-separated path
 * @param value Value to set
 */
export function setNestedProperty(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  const lastKey = keys.pop();
  
  if (!lastKey) return;
  
  let current = obj;
  for (const key of keys) {
    if (!(key in current) || !isObject(current[key])) {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[lastKey] = value;
}

/**
 * Removes undefined values from an object
 * @param obj Object to clean
 * @returns New object without undefined values
 */
export function removeUndefined<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: Partial<T> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      result[key as keyof T] = value;
    }
  }
  
  return result;
}

/**
 * Array Conversion Utilities
 */

/**
 * Converts a value to an array
 * @param value Value to convert
 * @returns Array containing the value or the value itself if already an array
 */
export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

/**
 * Converts array to object using a key function
 * @param array Array to convert
 * @param keyFn Function to generate keys
 * @returns Object with keys from keyFn and array items as values
 */
export function arrayToObject<T, K extends string | number>(
  array: T[],
  keyFn: (item: T) => K,
): Record<K, T> {
  const result = {} as Record<K, T>;
  
  for (const item of array) {
    const key = keyFn(item);
    result[key] = item;
  }
  
  return result;
}

/**
 * Groups array items by a key function
 * @param array Array to group
 * @param keyFn Function to generate group keys
 * @returns Object with keys from keyFn and arrays of grouped items
 */
export function groupBy<T, K extends string | number>(
  array: T[],
  keyFn: (item: T) => K,
): Record<K, T[]> {
  const result = {} as Record<K, T[]>;
  
  for (const item of array) {
    const key = keyFn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  
  return result;
}

/**
 * String Conversion Utilities
 */

/**
 * Converts a string to camelCase
 * @param str String to convert
 * @returns camelCase string
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^[A-Z]/, (char) => char.toLowerCase());
}

/**
 * Converts a string to snake_case
 * @param str String to convert
 * @returns snake_case string
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`)
    .replace(/^_/, '')
    .replace(/[-\s]+/g, '_');
}

/**
 * Converts a string to kebab-case
 * @param str String to convert
 * @returns kebab-case string
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)
    .replace(/^-/, '')
    .replace(/[_\s]+/g, '-');
}

/**
 * Number Conversion Utilities
 */

/**
 * Safely converts a value to a number
 * @param value Value to convert
 * @param defaultValue Default value if conversion fails
 * @returns Number or default value
 */
export function toNumber(value: any, defaultValue: number = 0): number {
  if (typeof value === 'number' && !isNaN(value)) {
    return value;
  }
  
  if (typeof value === 'string') {
    const parsed = Number(value);
    if (!isNaN(parsed)) {
      return parsed;
    }
  }
  
  return defaultValue;
}

/**
 * Converts bytes to human readable format
 * @param bytes Number of bytes
 * @param decimals Number of decimal places
 * @returns Formatted string (e.g., "1.5 MB")
 */
export function bytesToHuman(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * URL and Query String Utilities
 */

/**
 * Converts object to query string
 * @param obj Object to convert
 * @returns Query string (without leading ?)
 */
export function objectToQueryString(obj: Record<string, any>): string {
  const params = new URLSearchParams();
  
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, String(item)));
      } else {
        params.append(key, String(value));
      }
    }
  }
  
  return params.toString();
}

/**
 * Converts query string to object
 * @param queryString Query string (with or without leading ?)
 * @returns Object with query parameters
 */
export function queryStringToObject(queryString: string): Record<string, string | string[]> {
  const params = new URLSearchParams(queryString.replace(/^\?/, ''));
  const result: Record<string, string | string[]> = {};
  
  for (const [key, value] of params) {
    if (key in result) {
      const existing = result[key];
      if (Array.isArray(existing)) {
        existing.push(value);
      } else {
        result[key] = [existing, value];
      }
    } else {
      result[key] = value;
    }
  }
  
  return result;
} 