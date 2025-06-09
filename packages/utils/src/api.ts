/**
 * API Utility Functions
 */

/**
 * Common API response type
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * HTTP methods enum
 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

/**
 * Request configuration interface
 */
export interface RequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

/**
 * Helper function to create API response wrapper
 */
export const createApiResponse = <T>(
  data?: T, 
  error?: string
): ApiResponse<T> => {
  return {
    success: !error,
    data,
    error,
  };
};

/**
 * Helper function to handle API errors consistently
 */
export const handleApiError = (error: any, context: string) => {
  console.error(`${context} API Error`, error);
  
  if (error instanceof Error) {
    return {
      success: false,
      error: error.message,
    };
  }
  
  return {
    success: false,
    error: 'An unexpected error occurred',
  };
};

/**
 * Basic fetch wrapper with timeout and error handling
 */
export const fetchWithTimeout = async (
  url: string,
  config: RequestConfig = {},
  timeoutMs: number = 10000
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: config.method || HttpMethod.GET,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      body: config.body ? JSON.stringify(config.body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeoutMs}ms`);
    }
    throw error;
  }
};

/**
 * Generic API client function
 */
export const apiClient = async <T>(
  url: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetchWithTimeout(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return createApiResponse<T>(data);
  } catch (error) {
    return handleApiError(error, 'API Client');
  }
};

 