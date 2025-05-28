import { BaseClient, RequestOptions } from './BaseClient';
import { z } from 'zod';

export class RestClient extends BaseClient {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  private interpolatePath(pathTemplate: string, params?: Record<string, string | number>): string {
    if (!params) {
      return pathTemplate;
    }
    let interpolatedPath = pathTemplate;
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const value = params[key];
        interpolatedPath = interpolatedPath.replace(`:${key}`, String(value))
                                       .replace(`{${key}}`, String(value)); // Common conventions
      }
    }
    if (interpolatedPath.includes(':') || interpolatedPath.includes('{')){
        console.warn(`Path ${interpolatedPath} may still contain unreplaced parameters.`);
    }
    return interpolatedPath;
  }

  public async get<TResponse>(
    pathTemplate: string,
    pathParams?: Record<string, string | number>,
    options: Omit<RequestOptions, 'method' | 'body'> = {},
    responseSchema?: z.ZodType<TResponse, any, any>
  ): Promise<TResponse> {
    const endpoint = this.interpolatePath(pathTemplate, pathParams);
    return this.request<TResponse>(endpoint, { ...options, method: 'GET' }, responseSchema);
  }

  public async post<TRequest, TResponse>(
    pathTemplate: string,
    data: TRequest,
    pathParams?: Record<string, string | number>,
    options: Omit<RequestOptions, 'method' | 'body'> = {},
    responseSchema?: z.ZodType<TResponse, any, any>,
    requestSchema?: z.ZodType<TRequest, any, any>
  ): Promise<TResponse> {
    if (requestSchema) {
      const validationResult = requestSchema.safeParse(data);
      if (!validationResult.success) {
        const validationError = new Error(`Request validation failed for POST ${pathTemplate}: ${validationResult.error.message}`);
        console.error('Zod request validation errors:', validationResult.error.errors);
        // Optionally track this with appInsights if available and configured
        throw validationError;
      }
    }
    const endpoint = this.interpolatePath(pathTemplate, pathParams);
    return this.request<TResponse>(endpoint, { ...options, method: 'POST', body: data }, responseSchema);
  }

  public async put<TRequest, TResponse>(
    pathTemplate: string,
    data: TRequest,
    pathParams?: Record<string, string | number>,
    options: Omit<RequestOptions, 'method' | 'body'> = {},
    responseSchema?: z.ZodType<TResponse, any, any>,
    requestSchema?: z.ZodType<TRequest, any, any>
  ): Promise<TResponse> {
     if (requestSchema) {
      const validationResult = requestSchema.safeParse(data);
      if (!validationResult.success) {
        const validationError = new Error(`Request validation failed for PUT ${pathTemplate}: ${validationResult.error.message}`);
        console.error('Zod request validation errors:', validationResult.error.errors);
        throw validationError;
      }
    }
    const endpoint = this.interpolatePath(pathTemplate, pathParams);
    return this.request<TResponse>(endpoint, { ...options, method: 'PUT', body: data }, responseSchema);
  }

  public async delete<TResponse>(
    pathTemplate: string,
    pathParams?: Record<string, string | number>,
    options: Omit<RequestOptions, 'method' | 'body'> = {},
    responseSchema?: z.ZodType<TResponse, any, any>
  ): Promise<TResponse> {
    const endpoint = this.interpolatePath(pathTemplate, pathParams);
    return this.request<TResponse>(endpoint, { ...options, method: 'DELETE' }, responseSchema);
  }

  public async patch<TRequest, TResponse>(
    pathTemplate: string,
    data: TRequest,
    pathParams?: Record<string, string | number>,
    options: Omit<RequestOptions, 'method' | 'body'> = {},
    responseSchema?: z.ZodType<TResponse, any, any>,
    requestSchema?: z.ZodType<TRequest, any, any>
  ): Promise<TResponse> {
    if (requestSchema) {
      const validationResult = requestSchema.safeParse(data);
      if (!validationResult.success) {
        const validationError = new Error(`Request validation failed for PATCH ${pathTemplate}: ${validationResult.error.message}`);
        console.error('Zod request validation errors:', validationResult.error.errors);
        throw validationError;
      }
    }
    const endpoint = this.interpolatePath(pathTemplate, pathParams);
    return this.request<TResponse>(endpoint, { ...options, method: 'PATCH', body: data }, responseSchema);
  }
}
