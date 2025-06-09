import axios, { AxiosInstance } from 'axios';
import { logger } from '../../packages/logger/logger';
import { getAuthToken } from './getToken';
import { getServerSideUserId } from '../server_session';
import { navigateTo } from '../navigation';

/**
 * API Client Configuration
 */
interface ApiClientConfig {
  baseURL: string;
  requiresAuth?: boolean;
  requiresPortalUser?: boolean;
  consumer?: string;
  additionalHeaders?: Record<string, string>;
}

/**
 * Creates an axios instance with shared interceptor logic
 */
const createApiClient = (config: ApiClientConfig): AxiosInstance => {
  const client = axios.create({
    baseURL: config.baseURL,
    proxy: 
      process.env.NEXT_PUBLIC_PROXY?.toLowerCase() === 'false'
        ? false
        : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...config.additionalHeaders,
    },
  });

  // Request interceptor for authentication and headers
  client.interceptors.request.use(
    async (requestConfig) => {
      try {
        logger.info(`Request URL: ${config.baseURL}${requestConfig.url}`);

        // Add authentication token if required
        if (config.requiresAuth !== false) {
          const token = await getAuthToken();
          if (token) {
            requestConfig.headers['Authorization'] = `Bearer ${token}`;
          }
        }

        // Add consumer header if specified
        if (config.consumer) {
          requestConfig.headers['consumer'] = config.consumer;
        }

        // Add portal user if required
        if (config.requiresPortalUser) {
          requestConfig.headers['portaluser'] = await getServerSideUserId();
        }

        // Add credentials to request body for ES API
        if (requestConfig.data && config.baseURL.includes('ES_API')) {
          requestConfig.data.credentials = process.env.ES_API_PING_CREDENTIALS
            ? btoa(process.env.ES_API_PING_CREDENTIALS)
            : undefined;
        }

      } catch (error) {
        logger.error('API Client Request Interceptor Error', error);
      }
      
      return requestConfig;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for token expiration handling
  client.interceptors.response.use(
    (response) => response,
    async (error: any) => {
      if (error.response?.status === 401) {
        logger.error('Token expired or invalid');
        navigateTo('/login');
        return Promise.reject(new Error('Authentication expired'));
      }
      return Promise.reject(error);
    }
  );

  return client;
};

/**
 * Enterprise Service API Client
 */
export const esApi = createApiClient({
  baseURL: process.env.ES_API_URL || '',
  requiresAuth: true,
});

/**
 * Portal Services API Client
 */
export const portalSvcsApi = createApiClient({
  baseURL: process.env.ES_PORTAL_SVCS_API_URL || '',
  requiresAuth: true,
  requiresPortalUser: true,
  consumer: 'member',
});

/**
 * Member Service API Client
 */
export const memberService = createApiClient({
  baseURL: `${process.env.PORTAL_SERVICES_URL}${process.env.MEMBERSERVICE_CONTEXT_ROOT}`,
  requiresAuth: true,
});

/**
 * ID Card Service API Client
 */
export const idCardService = createApiClient({
  baseURL: `${process.env.PORTAL_SERVICES_URL}${process.env.IDCARDSERVICE_CONTEXT_ROOT}`,
  requiresAuth: true,
  requiresPortalUser: true,
  consumer: 'member',
});

/**
 * Member Limit Service API Client
 */
export const memberLimitService = createApiClient({
  baseURL: `${process.env.PORTAL_SERVICES_URL}${process.env.MEMBERLIMITSERVICE_CONTEXT_ROOT}`,
  requiresAuth: true,
});

/**
 * PCP Service API Client
 */
export const pcpService = createApiClient({
  baseURL: `${process.env.PORTAL_SERVICES_URL}${process.env.PCPSERVICE_CONTEXT_ROOT}`,
  requiresAuth: true,
});

/**
 * Chat Service Interface (for backward compatibility)
 */
export interface ChatInfoResponse {
  isEligible: boolean;
  cloudChatEligible: boolean;
  chatGroup?: string;
  businessHours?: {
    text: string;
    isOpen: boolean;
  };
  workingHours?: string;
}

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
 * Common transaction ID header
 */
export const ES_TRANSACTION_ID = 'ES-transactionId';

/**
 * Helper function to handle API errors consistently
 */
export const handleApiError = (error: any, context: string) => {
  logger.error(`${context} API Error`, error);
  
  if (axios.isAxiosError(error)) {
    const errorCode = error.response?.data?.data?.errorCode;
    const errorMessage = error.response?.data?.message || error.message;
    
    return {
      success: false,
      error: errorMessage,
      errorCode,
    };
  }
  
  return {
    success: false,
    error: 'An unexpected error occurred',
  };
};

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
 * Export individual clients for backward compatibility
 */
export { esApi as default };

// Re-export for legacy imports
export { esApi as esApiClient };
export { portalSvcsApi as portalApiClient };
export { memberService as memberServiceClient };
export { idCardService as idCardServiceClient };
export { memberLimitService as memberLimitServiceClient };
export { pcpService as pcpServiceClient }; 