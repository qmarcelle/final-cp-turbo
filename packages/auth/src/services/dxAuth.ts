import axios from 'axios';
import { getAuthToken } from '../utils/tokens';

/**
 * Base URL for API calls
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

/**
 * Interface for the DX auth token request
 */
export interface DxAuthTokenRequest {
  /**
   * User ID for authentication
   */
  userId: string;

  /**
   * Optional session token
   */
  sessionToken?: string;
}

/**
 * Interface for the DX auth token response
 */
export interface DxAuthTokenResponse {
  /**
   * Bearer token for DX API access
   */
  token: string;

  /**
   * Token expiration time in seconds
   */
  expiresIn: number;

  /**
   * Token type (usually "Bearer")
   */
  tokenType: string;
}

/**
 * Get a DX auth token for API access
 * @param data DX auth token request data
 * @returns Promise with token response
 */
export async function getDxAuthToken(
  data: DxAuthTokenRequest,
): Promise<DxAuthTokenResponse> {
  try {
    const token = await getAuthToken();

    const response = await axios.post(`${API_BASE_URL}/auth/dxToken`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      token: response.data.access_token || response.data.token,
      expiresIn: response.data.expires_in || 3600,
      tokenType: response.data.token_type || 'Bearer',
    };
  } catch (error) {
    console.error('Error getting DX auth token:', error);
    throw new Error('Failed to get DX auth token');
  }
}

/**
 * Validate an existing DX auth token
 * @param token Token to validate
 * @returns Promise with validation result (true if valid)
 */
export async function validateDxAuthToken(token: string): Promise<boolean> {
  try {
    const authToken = await getAuthToken();

    const response = await axios.post(
      `${API_BASE_URL}/auth/validateToken`,
      { token },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    return response.data.valid === true;
  } catch (error) {
    console.error('Error validating DX auth token:', error);
    return false;
  }
}

/**
 * Refresh an existing DX auth token
 * @param refreshToken Refresh token
 * @returns Promise with new token response
 */
export async function refreshDxAuthToken(
  refreshToken: string,
): Promise<DxAuthTokenResponse> {
  try {
    const authToken = await getAuthToken();

    const response = await axios.post(
      `${API_BASE_URL}/auth/refreshToken`,
      { refresh_token: refreshToken },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    return {
      token: response.data.access_token || response.data.token,
      expiresIn: response.data.expires_in || 3600,
      tokenType: response.data.token_type || 'Bearer',
    };
  } catch (error) {
    console.error('Error refreshing DX auth token:', error);
    throw new Error('Failed to refresh DX auth token');
  }
}
