/**
 * Email verification response interface
 */
export interface VerifyEmailResponse {
  verified: boolean;
  userId?: string;
  errors?: string[];
}

/**
 * Email verification OTP request
 */
export interface VerifyEmailOtpRequest {
  /**
   * The security code entered by the user
   */
  otp: string;

  /**
   * Interaction ID from the auth flow
   */
  interactionId?: string;

  /**
   * Interaction token from the auth flow
   */
  interactionToken?: string;
}

/**
 * Email verification OTP response
 */
export interface VerifyEmailOtpResponse {
  /**
   * Status of the verification
   */
  status: 'SUCCESS' | 'FAILURE';

  /**
   * Optional error message
   */
  errorMessage?: string;

  /**
   * Optional error code
   */
  errorCode?: string;
}

/**
 * Email uniqueness resend code request
 */
export interface EmailUniquenessResendCodeRequest {
  /**
   * Interaction ID from the auth flow
   */
  interactionId: string;

  /**
   * Interaction token from the auth flow
   */
  interactionToken: string;
}

/**
 * Email uniqueness resend code response
 */
export interface EmailUniquenessResendCodeResponse {
  /**
   * Status of the resend operation
   */
  status: 'SUCCESS' | 'FAILURE';

  /**
   * Optional error message
   */
  errorMessage?: string;

  /**
   * Optional error code
   */
  errorCode?: string;
}
