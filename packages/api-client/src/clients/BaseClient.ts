import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { z } from 'zod';

// Initialize Application Insights (replace with your actual instrumentation key)
const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: process.env.APPINSIGHTS_INSTRUMENTATIONKEY || 'YOUR_INSTRUMENTATION_KEY_GOES_HERE',
    /* ...other configurations... */
  }
});
appInsights.loadAppInsights();
appInsights.trackPageView(); // Track initial page view

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number; // in milliseconds
  retries?: number;
  retryDelay?: number; // in milliseconds
  queryParams?: Record<string, string | number | boolean>;
}

export abstract class BaseClient {
  protected baseUrl: string;
  private defaultTimeout: number = 10000; // 10 seconds
  private defaultRetries: number = 3;
  private defaultRetryDelay: number = 1000; // 1 second

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async request<TResponse>(
    endpoint: string,
    options: RequestOptions = {},
    responseSchema?: z.ZodType<TResponse, any, any>
  ): Promise<TResponse> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = this.defaultTimeout,
      retries = this.defaultRetries,
      retryDelay = this.defaultRetryDelay,
      queryParams,
    } = options;

    let url = `${this.baseUrl}${endpoint}`;
    if (queryParams) {
      const params = new URLSearchParams();
      for (const key in queryParams) {
        if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
          params.append(key, String(queryParams[key]));
        }
      }
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
    }

    let attempt = 0;
    while (attempt <= retries) {
      const controller = new AbortController();
      const signal = controller.signal;
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        appInsights.trackTrace({ message: `API Request: ${method} ${url}`, severityLevel: 1 /* Information */ });
        const startTime = Date.now();

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          body: body ? JSON.stringify(body) : undefined,
          signal,
        });

        clearTimeout(timeoutId);
        const duration = Date.now() - startTime;
        appInsights.trackDependencyData({
          id: Math.random().toString(36).substring(2), // Generate a unique ID
          name: `${method} ${url}`,
          target: this.baseUrl,
          data: url,
          duration: duration,
          success: response.ok,
          responseCode: response.status,
          type: "HTTP"
        });


        if (!response.ok) {
          const errorData = await response.text(); // Try to get more error details
          const error = new Error(`HTTP error ${response.status} for ${method} ${url}: ${errorData}`);
          appInsights.trackException({ exception: error, severityLevel: 3 /* Error */ });
          throw error;
        }

        const responseData = await response.json();

        if (responseSchema) {
          const validationResult = responseSchema.safeParse(responseData);
          if (!validationResult.success) {
            const validationError = new Error(`Response validation failed for ${method} ${url}: ${validationResult.error.message}`);
            console.error('Zod validation errors:', validationResult.error.errors);
            appInsights.trackException({ exception: validationError, properties: { errors: validationResult.error.errors }, severityLevel: 3 /* Error */ });
            throw validationError;
          }
          return validationResult.data;
        }

        return responseData as TResponse;

      } catch (error: any) {
        clearTimeout(timeoutId);
        appInsights.trackException({ exception: error, severityLevel: 3 /* Error */ });

        if (attempt === retries || error.name === 'AbortError' && signal.aborted && timeoutId) { // Last attempt or actual timeout
          console.error(`Final attempt failed for ${method} ${url} after ${attempt} retries or timeout. Error: ${error.message}`);
          throw error;
        }
        console.warn(`Attempt ${attempt + 1} failed for ${method} ${url}. Retrying in ${retryDelay / 1000}s... Error: ${error.message}`);
        attempt++;
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
    // Should not be reached if retries are properly handled
    const unhandledError = new Error('Unhandled error after retries in BaseClient');
    appInsights.trackException({ exception: unhandledError, severityLevel: 4 /* Critical */ });
    throw unhandledError;
  }
}
