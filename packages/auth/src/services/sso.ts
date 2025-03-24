import axios from 'axios';
import { getAuthToken } from '../utils/tokens';

/**
 * Base URL for API calls
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

/**
 * SSO endpoints
 */
const SSO_INITIATE_ENDPOINT = `${API_BASE_URL}/auth/sso/initiate`;
const SSO_VERIFY_ENDPOINT = `${API_BASE_URL}/auth/sso/verify`;
const SSO_STATUS_ENDPOINT = `${API_BASE_URL}/auth/sso/status`;

/**
 * SSO provider types
 */
export enum SsoProviderType {
  SAML = 'saml',
  OIDC = 'oidc',
  OTHER = 'other',
}

/**
 * Interface for SSO initiation request
 */
export interface SsoInitiateRequest {
  /**
   * Provider ID or identifier
   */
  providerId: string;

  /**
   * Optional client ID for the application
   */
  clientId?: string;

  /**
   * Redirect URL after successful authentication
   */
  redirectUrl: string;
}

/**
 * Interface for SSO initiation response
 */
export interface SsoInitiateResponse {
  /**
   * URL to redirect the user to for SSO authentication
   */
  authUrl: string;

  /**
   * Flow ID to track the SSO request
   */
  flowId: string;

  /**
   * Provider type
   */
  providerType: SsoProviderType;
}

/**
 * Interface for SSO verification request
 */
export interface SsoVerifyRequest {
  /**
   * Flow ID from the initiation response
   */
  flowId: string;

  /**
   * Response code from the SSO provider
   */
  code?: string;

  /**
   * SAMLResponse from the SSO provider
   */
  samlResponse?: string;

  /**
   * Other parameters from the SSO provider callback
   */
  [key: string]: string | undefined;
}

/**
 * Interface for SSO verification response
 */
export interface SsoVerifyResponse {
  /**
   * Verification status
   */
  status: 'SUCCESS' | 'FAILED';

  /**
   * User ID (if successful)
   */
  userId?: string;

  /**
   * Authentication token (if successful)
   */
  token?: string;

  /**
   * Error message (if failed)
   */
  error?: string;
}

/**
 * Initiate SSO authentication
 * @param data SSO initiation request
 * @returns Promise with SSO initiation response
 */
export async function initiateSso(
  data: SsoInitiateRequest,
): Promise<SsoInitiateResponse> {
  try {
    const response = await axios.post(SSO_INITIATE_ENDPOINT, data);

    return response.data;
  } catch (error) {
    console.error('Error initiating SSO:', error);
    throw new Error('Failed to initiate SSO');
  }
}

/**
 * Verify SSO authentication
 * @param data SSO verification request
 * @returns Promise with SSO verification response
 */
export async function verifySso(
  data: SsoVerifyRequest,
): Promise<SsoVerifyResponse> {
  try {
    const response = await axios.post(SSO_VERIFY_ENDPOINT, data);

    return response.data;
  } catch (error) {
    console.error('Error verifying SSO:', error);

    return {
      status: 'FAILED',
      error: 'SSO verification failed',
    };
  }
}

/**
 * Check if a user is linked to an SSO provider
 * @param userId User ID to check
 * @param providerId Provider ID to check
 * @returns Promise with link status (true if linked)
 */
export async function checkSsoLinkStatus(
  userId: string,
  providerId: string,
): Promise<boolean> {
  try {
    const token = await getAuthToken();

    const response = await axios.get(
      `${SSO_STATUS_ENDPOINT}/${userId}/${providerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.linked === true;
  } catch (error) {
    console.error('Error checking SSO link status:', error);
    return false;
  }
}

/**
 * Link a user to an SSO provider
 * @param userId User ID to link
 * @param providerId Provider ID to link to
 * @param providerUserId User ID in the provider system
 * @returns Promise with link result (true if successful)
 */
export async function linkUserToSsoProvider(
  userId: string,
  providerId: string,
  providerUserId: string,
): Promise<boolean> {
  try {
    const token = await getAuthToken();

    const response = await axios.post(
      `${SSO_STATUS_ENDPOINT}/link`,
      {
        userId,
        providerId,
        providerUserId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.success === true;
  } catch (error) {
    console.error('Error linking user to SSO provider:', error);
    return false;
  }
}
