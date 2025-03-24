/**
 * MFA mode state
 */
export enum MfaModeState {
  selection = 'SELECTION',
  authenticatorApp = 'AUTHENTICATOR_APP',
  sms = 'SMS',
  email = 'EMAIL',
  device = 'DEVICE',
}

/**
 * MFA device type
 */
export enum MfaDeviceType {
  AUTHENTICATOR_APP = 'AUTHENTICATOR_APP',
  SMS = 'SMS',
  EMAIL = 'EMAIL',
}

/**
 * MFA device interface
 */
export interface MfaDevice {
  id: string;
  type: MfaDeviceType;
  name: string;
  maskedTarget?: string;
  isPrimary: boolean;
  isActive: boolean;
  createdDate?: string;
  lastUsedDate?: string;
}

/**
 * MFA verification response
 */
export interface MfaVerificationResponse {
  isVerified: boolean;
  deviceId?: string;
  errors?: string[];
  interactionId?: string;
  interactionToken?: string;
  sessionToken?: string;
}

/**
 * MFA device management response
 */
export interface MfaDeviceResponse {
  devices: MfaDevice[];
  errors?: string[];
}
