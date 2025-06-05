/**
 * API Client Setup for Testing
 * 
 * A simple API client factory for use in testing examples.
 * This provides a basic wrapper around fetch with configuration options.
 */

interface ApiClientConfig {
  /**
   * Base URL for all API requests
   */
  baseUrl: string;
  
  /**
   * Default headers to include with all requests
   */
  defaultHeaders?: Record<string, string>;
  
  /**
   * Whether to automatically append a trailing slash to paths
   * @default false
   */
  trailingSlash?: boolean;
  
  /**
   * Authentication token to include in Authorization header
   */
  authToken?: string;
}

interface ApiClient {
  get: (path: string, options?: RequestInit) => Promise<Response>;
  post: (path: string, options?: RequestInit) => Promise<Response>;
  put: (path: string, options?: RequestInit) => Promise<Response>;
  patch: (path: string, options?: RequestInit) => Promise<Response>;
  delete: (path: string, options?: RequestInit) => Promise<Response>;
}

/**
 * Creates a simple API client for testing purposes
 */
export function setupApiClient(config: ApiClientConfig): ApiClient {
  const { baseUrl, defaultHeaders = {}, trailingSlash = false, authToken } = config;
  
  /**
   * Builds the full URL for a request
   */
  const buildUrl = (path: string): string => {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    // Ensure base URL ends with a slash if we have a path
    let url = baseUrl;
    if (cleanPath && !url.endsWith('/')) {
      url = `${url}/`;
    }
    
    // Add trailing slash if configured and not present
    if (trailingSlash && cleanPath && !cleanPath.endsWith('/')) {
      return `${url}${cleanPath}/`;
    }
    
    return `${url}${cleanPath}`;
  };
  
  /**
   * Creates request headers with defaults and auth token if provided
   */
  const createHeaders = (customHeaders: HeadersInit = {}): HeadersInit => {
    const headers: Record<string, string> = {
      ...defaultHeaders,
      ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
    };
    
    // Add custom headers
    if (customHeaders) {
      if (customHeaders instanceof Headers) {
        customHeaders.forEach((value, key) => {
          headers[key] = value;
        });
      } else if (Array.isArray(customHeaders)) {
        customHeaders.forEach(([key, value]) => {
          headers[key] = value;
        });
      } else {
        Object.assign(headers, customHeaders);
      }
    }
    
    return headers;
  };
  
  /**
   * Makes a request with the given method
   */
  const request = (method: string, path: string, options: RequestInit = {}): Promise<Response> => {
    const url = buildUrl(path);
    const headers = createHeaders(options.headers);
    
    return fetch(url, {
      ...options,
      method,
      headers,
    });
  };
  
  // Return the API client interface
  return {
    get: (path, options) => request('GET', path, options),
    post: (path, options) => request('POST', path, options),
    put: (path, options) => request('PUT', path, options),
    patch: (path, options) => request('PATCH', path, options),
    delete: (path, options) => request('DELETE', path, options),
  };
} 