/**
 * Reset password status enum
 */
export enum ResetPasswordStatus {
  SUCCESS = 'SUCCESS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  EXPIRED = 'EXPIRED',
  ERROR = 'ERROR',
}

/**
 * Reset password request interface
 */
export interface ResetPasswordRequest {
  /**
   * New password to set
   */
  newPassword: string;

  /**
   * Interaction ID from password reset request
   */
  interactionId: string;

  /**
   * Interaction token from password reset request
   */
  interactionToken: string;
}

/**
 * Reset password response interface
 */
export interface ResetPasswordResponse {
  /**
   * Status of the reset password operation
   */
  status: ResetPasswordStatus;

  /**
   * Interaction ID for continuing the flow (if applicable)
   */
  interactionId?: string;

  /**
   * Interaction token for continuing the flow (if applicable)
   */
  interactionToken?: string;

  /**
   * Error messages if request failed
   */
  errors?: string[];
}

/**
 * Password requirements interface
 */
export interface PasswordRequirements {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSpecialChar: boolean;
  prohibitUsername: boolean;
  prohibitCommonWords: boolean;
}
