'use server';

import axios from 'axios';
import { signIn as nextAuthSignIn } from 'next-auth/react';
import { getAuthToken } from '../utils/tokens';

// Define types inline to avoid import issues
/**
 * Email verification response interface
 */
interface VerifyEmailResponse {
  verified: boolean;
  userId?: string;
  errors?: string[];
}

/**
 * Email verification OTP request
 */
interface VerifyEmailOtpRequest {
  otp: string;
  interactionId?: string;
  interactionToken?: string;
}

/**
 * Email verification OTP response
 */
interface VerifyEmailOtpResponse {
  status: 'SUCCESS' | 'FAILURE';
  errorMessage?: string;
  errorCode?: string;
}

/**
 * Email uniqueness resend code request
 */
interface EmailUniquenessResendCodeRequest {
  interactionId: string;
  interactionToken: string;
}

/**
 * Email uniqueness resend code response
 */
interface EmailUniquenessResendCodeResponse {
  status: 'SUCCESS' | 'FAILURE';
  errorMessage?: string;
  errorCode?: string;
}

/**
 * API base URL
 */
export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

/**
 * Verify email endpoint
 */
const VERIFY_EMAIL_ENDPOINT = `${API_URL}/auth/verifyEmail`;

/**
 * Email verification API endpoint (reserved for future use)
 */
// const EMAIL_VERIFICATION_ENDPOINT = `${API_URL}/mfAuthentication/emailVerification`;

/**
 * Resend email verification code API endpoint
 */
const RESEND_EMAIL_CODE_ENDPOINT = `${API_URL}/mfAuthentication/resendEmail`;

/**
 * Base URL for API calls
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

/**
 * Verify email with verification token
 * @param token Email verification token
 * @param emailId Email ID to verify
 * @returns Verification response
 */
export async function verifyEmail(
  token: string,
  emailId: string,
): Promise<VerifyEmailResponse> {
  try {
    // Prepare request payload
    const payload = {
      token,
      emailId,
    };

    // Call verify email API
    const response = await axios.post(VERIFY_EMAIL_ENDPOINT, payload);

    // Process response
    const responseData = response.data?.data;

    if (!responseData) {
      throw new Error('Invalid response format');
    }

    // If verification is successful, sign in
    if (responseData.verified && responseData.userId) {
      await nextAuthSignIn('credentials', {
        userId: responseData.userId,
        redirect: false,
      });
    }

    return {
      verified: responseData.verified,
      userId: responseData.userId,
      errors: response.data?.details?.message
        ? [response.data.details.message]
        : [],
    };
  } catch (error) {
    console.error('Email verification error:', error);

    // Handle API errors
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data;

      return {
        verified: false,
        errors: errorData.details?.message
          ? [errorData.details.message]
          : ['Verification failed'],
      };
    }

    // Generic error
    return {
      verified: false,
      errors: ['An unexpected error occurred. Please try again.'],
    };
  }
}

/**
 * Resend email verification code
 * @param interactionId Interaction ID from previous step
 * @param interactionToken Interaction token from previous step
 * @returns Success status and any errors
 */
export async function resendEmailCode(
  interactionId: string,
  interactionToken: string,
): Promise<{ success: boolean; errors?: string[] }> {
  try {
    // Prepare request payload
    const payload = {
      interactionId,
      interactionToken,
    };

    // Call resend email code API
    const response = await axios.post(RESEND_EMAIL_CODE_ENDPOINT, payload);

    // Process response
    const responseData = response.data?.data;

    if (!responseData) {
      throw new Error('Invalid response format');
    }

    return {
      success: responseData.message === 'SUCCESS',
      errors: response.data?.details?.message
        ? [response.data.details.message]
        : [],
    };
  } catch (error) {
    console.error('Resend email code error:', error);

    // Handle API errors
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data;

      return {
        success: false,
        errors: errorData.details?.message
          ? [errorData.details.message]
          : ['Failed to resend email code'],
      };
    }

    // Generic error
    return {
      success: false,
      errors: [
        'An unexpected error occurred while resending the code. Please try again.',
      ],
    };
  }
}

/**
 * Call the verify email OTP API
 * @param data Verify email OTP request data
 * @returns Promise with verification result
 */
export async function verifyEmailOtp(
  data: VerifyEmailOtpRequest,
): Promise<VerifyEmailOtpResponse> {
  try {
    const token = await getAuthToken();

    const response = await axios.post(
      `${API_BASE_URL}/auth/verifyEmailOtp`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error verifying email OTP:', error);
    return {
      status: 'FAILURE',
      errorMessage: 'Failed to verify email OTP',
      errorCode: 'VERIFICATION_FAILED',
    };
  }
}

/**
 * Call the resend email verification code API
 * @param data Resend code request data
 * @returns Promise with resend result
 */
export async function resendEmailVerificationCode(
  data: EmailUniquenessResendCodeRequest,
): Promise<EmailUniquenessResendCodeResponse> {
  try {
    const token = await getAuthToken();

    const response = await axios.post(
      `${API_BASE_URL}/auth/resendEmailVerificationCode`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error resending email verification code:', error);
    return {
      status: 'FAILURE',
      errorMessage: 'Failed to resend verification code',
      errorCode: 'RESEND_FAILED',
    };
  }
}
