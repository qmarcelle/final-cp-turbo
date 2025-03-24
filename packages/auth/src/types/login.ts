/**
 * Login status enum
 */
export enum LoginStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  PASSWORD_RESET = 'PASSWORD_RESET',
  VALIDATE_EMAIL = 'VALIDATE_EMAIL',
  DUPLICATE_ACCOUNT = 'DUPLICATE_ACCOUNT',
  MFA_REQUIRED = 'MFA_REQUIRED',
  VERIFY_UNIQUE_EMAIL = 'VERIFY_UNIQUE_EMAIL',
  ERROR = 'ERROR',
}

/**
 * Login request interface
 */
export interface LoginRequest {
  username: string;
  password: string;
  interactionId?: string;
  interactionToken?: string;
}

/**
 * Login response interface
 */
export interface LoginResponse {
  status: LoginStatus;
  userId?: string;
  token?: string;
  errors?: string[];
  interactionId?: string;
  interactionToken?: string;
  emailId?: string;
  riskLevelHigh?: boolean;
  riskLevelUndetermined?: boolean;
}

/**
 * PingOne session interface
 */
export interface PingOneSession {
  interactionId: string;
  interactionToken: string;
  sessionToken?: string;
}

/**
 * Action response interface for login actions
 */
export interface ActionResponse<T, U> {
  status: T;
  data?: U;
  errors?: string[];
  errorcode?: string[];
}
