import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  APIClientConfig,
  APIClientInterface,
  APIResponse,
  ErrorResponse,
  RequestConfig,
  RequestOptions,
  TokenProvider,
} from './types';

/**
 * Core API client for making HTTP requests
 * Handles authentication, error handling, and request/response transformations
 */
export class APIClient implements APIClientInterface {
  private axiosInstance: AxiosInstance;
  private tokenProvider?: TokenProvider;
  private isRefreshing = false;
  private refreshQueue: Array<(token: string) => void> = [];

  constructor(config: APIClientConfig, tokenProvider?: TokenProvider) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 30000,
      withCredentials: config.withCredentials || false,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...config.defaultHeaders,
      },
    });

    this.tokenProvider = tokenProvider;

    // Setup interceptors
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor for adding auth tokens and handling common request transformations
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        if (this.tokenProvider) {
          const token = await this.tokenProvider.getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for handling token refresh and common error patterns
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Handle token refresh on 401 errors
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          this.tokenProvider &&
          originalRequest
        ) {
          if (this.isRefreshing) {
            // If already refreshing, queue this request
            return new Promise<AxiosResponse>((resolve) => {
              this.refreshQueue.push((token) => {
                if (originalRequest.headers) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                resolve(this.axiosInstance(originalRequest));
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const token = await this.tokenProvider.refreshToken();
            if (token) {
              // Process queued requests with new token
              this.refreshQueue.forEach((callback) => callback(token));
              this.refreshQueue = [];

              // Update current request with new token
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return this.axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            // Handle refresh failure - typically redirect to login
            console.error('Token refresh failed:', refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        // Create standardized error response
        const errorResponse: ErrorResponse = {
          message: error.message || 'An unexpected error occurred',
          code: error.response?.status?.toString() || 'UNKNOWN',
          details: error.response?.data,
          timestamp: new Date().toISOString(),
        };

        return Promise.reject(errorResponse);
      }
    );
  }

  private createOptions(options?: RequestOptions): AxiosRequestConfig {
    return {
      headers: options?.headers,
      params: options?.params,
      timeout: options?.timeout,
      signal: options?.signal,
      withCredentials: options?.withCredentials,
    };
  }

  /**
   * Make a GET request
   */
  public async get<T>(url: string, options?: RequestOptions): Promise<APIResponse<T>> {
    const config = this.createOptions(options);
    const response = await this.axiosInstance.get<T>(url, config);
    
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as Record<string, string>,
    };
  }

  /**
   * Make a POST request
   */
  public async post<T, D = any>(
    url: string,
    data?: D,
    options?: RequestOptions
  ): Promise<APIResponse<T>> {
    const config = this.createOptions(options);
    const response = await this.axiosInstance.post<T>(url, data, config);
    
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as Record<string, string>,
    };
  }

  /**
   * Make a PUT request
   */
  public async put<T, D = any>(
    url: string,
    data?: D,
    options?: RequestOptions
  ): Promise<APIResponse<T>> {
    const config = this.createOptions(options);
    const response = await this.axiosInstance.put<T>(url, data, config);
    
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as Record<string, string>,
    };
  }

  /**
   * Make a PATCH request
   */
  public async patch<T, D = any>(
    url: string,
    data?: D,
    options?: RequestOptions
  ): Promise<APIResponse<T>> {
    const config = this.createOptions(options);
    const response = await this.axiosInstance.patch<T>(url, data, config);
    
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as Record<string, string>,
    };
  }

  /**
   * Make a DELETE request
   */
  public async delete<T>(url: string, options?: RequestOptions): Promise<APIResponse<T>> {
    const config = this.createOptions(options);
    const response = await this.axiosInstance.delete<T>(url, config);
    
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as Record<string, string>,
    };
  }

  /**
   * Make a generic request with a custom configuration
   */
  public async request<T, D = any>(config: RequestConfig<D>): Promise<APIResponse<T>> {
    const { method, url, data, options } = config;
    const axiosConfig: AxiosRequestConfig = {
      method,
      url,
      data,
      ...this.createOptions(options),
    };

    const response = await this.axiosInstance.request<T>(axiosConfig);
    
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as Record<string, string>,
    };
  }
}
