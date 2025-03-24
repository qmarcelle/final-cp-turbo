'use server';

import axios from 'axios';
import {
  ResetPasswordRequest,
  ResetPasswordResponse,
  ResetPasswordStatus,
} from '../types/resetPassword';

/**
 * API base URL
 */
export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

/**
 * Request password reset API endpoint
 */
const REQUEST_RESET_ENDPOINT = `${API_URL}/mfAuthentication/requestPasswordReset`;

/**
 * Reset password API endpoint
 */
const RESET_PASSWORD_ENDPOINT = `${API_URL}/mfAuthentication/resetPassword`;

/**
 * Request a password reset
 * @param username The username to reset password for
 * @param dateOfBirth Date of birth for verification (format: YYYY-MM-DD)
 * @returns Password reset response
 */
export async function requestPasswordReset(
  username: string,
  dateOfBirth: string,
): Promise<ResetPasswordResponse> {
  try {
    // Prepare request payload
    const payload = {
      username,
      dateOfBirth,
    };

    // Call request password reset API
    const response = await axios.post(REQUEST_RESET_ENDPOINT, payload);

    // Process response
    const responseData = response.data?.data;

    if (!responseData) {
      throw new Error('Invalid response format');
    }

    // Return formatted response
    return {
      status:
        responseData.message === 'SUCCESS'
          ? ResetPasswordStatus.SUCCESS
          : ResetPasswordStatus.ERROR,
      interactionId: responseData.interactionId,
      interactionToken: responseData.interactionToken,
      errors: response.data?.details?.message
        ? [response.data.details.message]
        : [],
    };
  } catch (error) {
    console.error('Password reset request error:', error);

    // Handle API errors
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data;

      return {
        status: ResetPasswordStatus.ERROR,
        errors: errorData.details?.message
          ? [errorData.details.message]
          : ['Failed to request password reset'],
      };
    }

    // Generic error
    return {
      status: ResetPasswordStatus.ERROR,
      errors: ['An unexpected error occurred. Please try again.'],
    };
  }
}

/**
 * Reset password with new credentials
 * @param request Reset password request with new password
 * @returns Reset password response
 */
export async function resetPassword(
  request: ResetPasswordRequest,
): Promise<ResetPasswordResponse> {
  try {
    // Prepare request payload
    const payload = {
      newPassword: request.newPassword,
      interactionId: request.interactionId,
      interactionToken: request.interactionToken,
    };

    // Call reset password API
    const response = await axios.post(RESET_PASSWORD_ENDPOINT, payload);

    // Process response
    const responseData = response.data?.data;

    if (!responseData) {
      throw new Error('Invalid response format');
    }

    // Return formatted response
    return {
      status:
        responseData.message === 'SUCCESS'
          ? ResetPasswordStatus.SUCCESS
          : ResetPasswordStatus.ERROR,
      errors: response.data?.details?.message
        ? [response.data.details.message]
        : [],
    };
  } catch (error) {
    console.error('Password reset error:', error);

    // Handle API errors
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data;

      return {
        status: ResetPasswordStatus.ERROR,
        errors: errorData.details?.message
          ? [errorData.details.message]
          : ['Failed to reset password'],
      };
    }

    // Generic error
    return {
      status: ResetPasswordStatus.ERROR,
      errors: ['An unexpected error occurred. Please try again.'],
    };
  }
}
