'use server';

import axios from 'axios';
import { signIn as nextAuthSignIn } from 'next-auth/react';
import { LoginRequest, LoginResponse, LoginStatus } from '../types/login';

// Add PingOne signals type declaration
declare global {
  interface Window {
    _pingOneSignals?: {
      getData: () => Promise<string>;
    };
  }
}

/**
 * API base URL
 */
export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

/**
 * Login API endpoint
 */
const LOGIN_ENDPOINT = `${API_URL}/mfAuthentication/loginAuthentication`;

/**
 * Login with username and password
 * @param request Login request with username and password
 * @returns Login response
 */
export async function login(request: LoginRequest): Promise<LoginResponse> {
  try {
    // Get user agent and device profile
    const userAgent =
      typeof navigator !== 'undefined'
        ? navigator.userAgent
        : 'Mozilla/5.0 (Unknown) AppleWebKit/537.36 Chrome/88.0.4324.150 Safari/537.36';

    // Get device profile from PingOne if available
    let deviceProfile = 'Default';
    if (typeof window !== 'undefined' && window._pingOneSignals) {
      try {
        deviceProfile = await window._pingOneSignals.getData();
      } catch (e) {
        console.error('Error getting PingOne device profile:', e);
      }
    }

    // Prepare request payload
    const payload = {
      username: request.username,
      password: request.password,
      userAgent,
      ipAddress: '1', // This will be replaced by the server
      deviceProfile,
      // Include interaction data if available
      ...(request.interactionId && request.interactionToken
        ? {
            interactionId: request.interactionId,
            interactionToken: request.interactionToken,
          }
        : {}),
    };

    // Call login API
    const response = await axios.post(LOGIN_ENDPOINT, payload);

    // Process response
    const responseData = response.data?.data;

    if (!responseData) {
      throw new Error('Invalid response format');
    }

    // Determine login status
    let status: LoginStatus;

    switch (responseData.message) {
      case 'SUCCESS':
        status = LoginStatus.ACTIVE;
        break;
      case 'DEVICE_SELECTION_REQUIRED':
        status = LoginStatus.MFA_REQUIRED;
        break;
      case 'INACTIVE':
        status = LoginStatus.INACTIVE;
        break;
      case 'PASSWORD_RESET':
        status = LoginStatus.PASSWORD_RESET;
        break;
      case 'VALIDATE_EMAIL':
        status = LoginStatus.VALIDATE_EMAIL;
        break;
      case 'VERIFY_UNIQUE_EMAIL':
        status = LoginStatus.VERIFY_UNIQUE_EMAIL;
        break;
      case 'DUPLICATE_ACCOUNT':
        status = LoginStatus.DUPLICATE_ACCOUNT;
        break;
      default:
        status = LoginStatus.ERROR;
    }

    // If login is successful, sign in to next-auth
    if (status === LoginStatus.ACTIVE && responseData.userId) {
      await nextAuthSignIn('credentials', {
        userId: responseData.userId,
        redirect: false,
      });
    }

    // Return formatted response
    return {
      status,
      userId: responseData.userId,
      token: responseData.token,
      errors: response.data?.details?.message
        ? [response.data.details.message]
        : [],
      interactionId: responseData.interactionId,
      interactionToken: responseData.interactionToken,
      emailId: responseData.emailId,
      riskLevelHigh: responseData.riskLevelHigh,
      riskLevelUndetermined: responseData.riskLevelUndetermined,
    };
  } catch (error) {
    console.error('Login error:', error);

    // Handle API errors
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data;

      return {
        status: LoginStatus.ERROR,
        errors: errorData.details?.message
          ? [errorData.details.message]
          : ['Authentication failed'],
      };
    }

    // Generic error
    return {
      status: LoginStatus.ERROR,
      errors: ['An unexpected error occurred. Please try again.'],
    };
  }
}
