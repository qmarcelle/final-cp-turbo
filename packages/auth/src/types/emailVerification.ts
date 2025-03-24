/**
 * Email verification status enum
 */
export enum EmailVerificationStatus {
  SUCCESS = 'SUCCESS',
  CODE_EXPIRED = 'CODE_EXPIRED',
  CODE_INVALID = 'CODE_INVALID',
  ERROR = 'ERROR',
}

/**
 * Email uniqueness status enum
 */
export enum EmailUniquenessStatus {
  SUCCESS = 'SUCCESS',
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  NOT_MATCHING = 'NOT_MATCHING',
  ERROR = 'ERROR',
}

/**
 * Email verification request interface
 */
export interface EmailVerificationRequest {
  emailCode: string;
  interactionId: string;
  interactionToken: string;
}

/**
 * Email verification response interface
 */
export interface EmailVerificationResponse {
  status: EmailVerificationStatus;
  userId?: string;
  errors?: string[];
}

/**
 * Email uniqueness request interface
 */
export interface EmailUniquenessRequest {
  emailAddress: string;
  confirmEmailAddress: string;
}

/**
 * Update email response interface
 */
export interface UpdateEmailResponse {
  interactionId?: string;
  interactionToken?: string;
  emailId?: string;
  errors?: string[];
}
