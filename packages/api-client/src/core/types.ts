/**
 * Core API client types and interfaces
 */

export interface APIResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export interface ErrorResponse {
  message: string;
  code?: string;
  details?: unknown;
  timestamp?: string;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  timeout?: number;
  signal?: AbortSignal;
  withCredentials?: boolean;
}

export interface APIClientConfig {
  baseURL: string;
  defaultHeaders?: Record<string, string>;
  timeout?: number;
  withCredentials?: boolean;
}

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestConfig<T = any> {
  method: HTTPMethod;
  url: string;
  data?: T;
  options?: RequestOptions;
}

export interface TokenProvider {
  getToken: () => Promise<string | null>;
  refreshToken: () => Promise<string | null>;
}

export interface APIClientInterface {
  get: <T>(url: string, options?: RequestOptions) => Promise<APIResponse<T>>;
  post: <T, D = any>(url: string, data?: D, options?: RequestOptions) => Promise<APIResponse<T>>;
  put: <T, D = any>(url: string, data?: D, options?: RequestOptions) => Promise<APIResponse<T>>;
  patch: <T, D = any>(url: string, data?: D, options?: RequestOptions) => Promise<APIResponse<T>>;
  delete: <T>(url: string, options?: RequestOptions) => Promise<APIResponse<T>>;
  request: <T, D = any>(config: RequestConfig<D>) => Promise<APIResponse<T>>;
}
