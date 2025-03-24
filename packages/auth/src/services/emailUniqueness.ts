import axios from 'axios';
import { getAuthToken } from '../utils/tokens';

/**
 * Base URL for API calls
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

/**
 * Interface for the check email uniqueness request
 */
export interface CheckEmailUniquenessRequest {
  /**
   * Email address to check
   */
  email: string;
}

/**
 * Interface for the check email uniqueness response
 */
export interface CheckEmailUniquenessResponse {
  /**
   * Status of the check operation
   */
  status: 'UNIQUE' | 'DUPLICATE' | 'ERROR';

  /**
   * Message related to the status
   */
  message?: string;

  /**
   * If a verification was started, the ID of the interaction
   */
  interactionId?: string;

  /**
   * If a verification was started, the token for the interaction
   */
  interactionToken?: string;
}

/**
 * Check if an email is unique (not already registered)
 * @param data Check email uniqueness request
 * @returns Promise with check result
 */
export async function checkEmailUniqueness(
  data: CheckEmailUniquenessRequest,
): Promise<CheckEmailUniquenessResponse> {
  try {
    const token = await getAuthToken();

    const response = await axios.post(
      `${API_BASE_URL}/auth/checkEmailUniqueness`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error checking email uniqueness:', error);
    throw new Error('Failed to check email uniqueness');
  }
}

/**
 * Start email verification process for a new email
 * @param email Email address to verify
 * @returns Promise with verification initiation result
 */
export async function initiateEmailVerification(
  email: string,
): Promise<{ interactionId: string; interactionToken: string }> {
  try {
    const token = await getAuthToken();

    const response = await axios.post(
      `${API_BASE_URL}/auth/initiateEmailVerification`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return {
      interactionId: response.data.interactionId,
      interactionToken: response.data.interactionToken,
    };
  } catch (error) {
    console.error('Error initiating email verification:', error);
    throw new Error('Failed to initiate email verification');
  }
}
