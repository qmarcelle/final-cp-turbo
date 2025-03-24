'use server';

import axios from 'axios';
import { signIn as nextAuthSignIn } from 'next-auth/react';

/**
 * API base URL
 */
export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

/**
 * MFA verification endpoint
 */
const MFA_ENDPOINT = `${API_URL}/mfAuthentication/verifyMfaCode`;

/**
 * Resend MFA code endpoint
 */
const RESEND_MFA_ENDPOINT = `${API_URL}/mfAuthentication/resendMfaCode`;

/**
 * MFA request interface
 */
interface MfaRequest {
  passcode: string;
  deviceId: string;
  interactionId: string;
  interactionToken: string;
}

/**
 * MFA response interface
 */
interface MfaResponse {
  isVerified: boolean;
  userId?: string;
  errors?: string[];
}

/**
 * Resend MFA response interface
 */
interface ResendMfaResponse {
  success: boolean;
  deviceId?: string;
  errors?: string[];
}

/**
 * Verify MFA code
 * @param code - The MFA code to verify
 * @param deviceId - The device ID
 * @param interactionId - The interaction ID
 * @param interactionToken - The interaction token
 * @returns MFA verification response
 */
export async function verifyMfa(
  code: string,
  deviceId: string,
  interactionId: string,
  interactionToken: string,
): Promise<MfaResponse> {
  try {
    // Prepare request payload
    const payload: MfaRequest = {
      passcode: code,
      deviceId,
      interactionId,
      interactionToken,
    };

    // Call MFA verification API
    const response = await axios.post(MFA_ENDPOINT, payload);

    // Process response
    const responseData = response.data;

    if (responseData.success) {
      // If MFA verification is successful, sign in to next-auth
      await nextAuthSignIn('credentials', {
        userId: responseData.userId,
        redirect: false,
      });

      return {
        isVerified: true,
        userId: responseData.userId,
      };
    }

    // Handle verification failure
    return {
      isVerified: false,
      errors: response.data.details?.message
        ? [response.data.details.message]
        : ['MFA verification failed'],
    };
  } catch (error) {
    console.error('MFA verification error:', error);

    // Handle API errors
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data;

      return {
        isVerified: false,
        errors: errorData.details?.message
          ? [errorData.details.message]
          : ['MFA verification failed'],
      };
    }

    // Generic error
    return {
      isVerified: false,
      errors: ['An unexpected error occurred. Please try again.'],
    };
  }
}

/**
 * Resend MFA code
 * @param deviceId - The device ID
 * @param interactionId - The interaction ID
 * @param interactionToken - The interaction token
 * @returns Resend MFA response
 */
export async function resendMfaCode(
  deviceId: string,
  interactionId: string,
  interactionToken: string,
): Promise<ResendMfaResponse> {
  try {
    // Prepare request payload
    const payload = {
      deviceId,
      interactionId,
      interactionToken,
    };

    // Call resend MFA code API
    const response = await axios.post(RESEND_MFA_ENDPOINT, payload);

    // Process response
    return {
      success: response.data.success,
      deviceId: response.data.deviceId,
    };
  } catch (error) {
    console.error('Resend MFA code error:', error);

    // Handle errors
    return {
      success: false,
      errors: ['Failed to resend verification code. Please try again.'],
    };
  }
}
