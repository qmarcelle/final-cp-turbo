/**
 * Login status enum
 */
export enum LoginStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  ACCOUNT_DISABLED = 'ACCOUNT_DISABLED',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  REQUIRES_MFA = 'REQUIRES_MFA',
  MFA_REQUIRED = 'MFA_REQUIRED',
  DEVICE_SELECTION_REQUIRED = 'DEVICE_SELECTION_REQUIRED',
  EMAIL_VERIFICATION_REQUIRED = 'EMAIL_VERIFICATION_REQUIRED',
  PASSWORD_RESET_REQUIRED = 'PASSWORD_RESET_REQUIRED',
  EMAIL_UPDATE_REQUIRED = 'EMAIL_UPDATE_REQUIRED',
  ACCOUNT_DEACTIVATED = 'ACCOUNT_DEACTIVATED',
  DUPLICATE_ACCOUNT = 'DUPLICATE_ACCOUNT',
}

/**
 * Login request interface
 */
export interface LoginRequest {
  username: string;
  password: string;
  mfaCode?: string;
  deviceId?: string;
}

/**
 * Login response interface
 */
export interface LoginResponse {
  status: LoginStatus;
  token?: string;
  message?: string;
  mfaRequired?: boolean;
  mfaToken?: string;
  deviceSelectionRequired?: boolean;
  devices?: Array<{
    id: string;
    name: string;
    type: string;
  }>;
}

/**
 * Generic action response interface
 */
export interface ActionResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface LoginParams {
  username: string;
  password: string;
  mfaCode?: string;
  rememberMe?: boolean;
}
