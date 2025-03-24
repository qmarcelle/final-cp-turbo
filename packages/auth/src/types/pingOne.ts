/**
 * Authentication method types
 */
export enum AuthMethodType {
  SMS = 'sms',
  EMAIL = 'email',
  TOTP = 'totp',
  PUSH = 'push',
}

/**
 * Device status enum
 */
export enum DeviceStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED',
}

/**
 * Interface for a PingOne MFA device
 */
export interface PingOneMfaDevice {
  /**
   * Device ID
   */
  id: string;

  /**
   * Device name
   */
  name: string;

  /**
   * Device type
   */
  type: AuthMethodType;

  /**
   * Device status
   */
  status: DeviceStatus;

  /**
   * Target (phone number or email, possibly masked)
   */
  target?: string;

  /**
   * When the device was created
   */
  createdAt: string;

  /**
   * When the device was last updated
   */
  updatedAt: string;
}

/**
 * Interface for PingOne authentication request
 */
export interface PingOneAuthRequest {
  /**
   * Username for authentication
   */
  username: string;

  /**
   * Password for authentication
   */
  password: string;
}

/**
 * Interface for PingOne authentication response
 */
export interface PingOneAuthResponse {
  /**
   * Authentication status
   */
  status: 'SUCCESS' | 'MFA_REQUIRED' | 'FAILED';

  /**
   * Authentication token (if successful)
   */
  token?: string;

  /**
   * Flow ID for MFA continuation (if MFA required)
   */
  flowId?: string;

  /**
   * Available MFA methods (if MFA required)
   */
  mfaMethods?: AuthMethodType[];

  /**
   * Error message (if failed)
   */
  error?: string;
}

/**
 * Interface for PingOne MFA verification request
 */
export interface PingOneMfaVerifyRequest {
  /**
   * Flow ID from the initial auth response
   */
  flowId: string;

  /**
   * Device ID to use for verification
   */
  deviceId: string;

  /**
   * OTP code for verification
   */
  otp: string;
}

/**
 * Interface for PingOne MFA device registration request
 */
export interface PingOneDeviceRegistrationRequest {
  /**
   * User ID to register device for
   */
  userId: string;

  /**
   * Device type
   */
  type: AuthMethodType;

  /**
   * Target (phone number or email)
   */
  target: string;
}

/**
 * Interface for PingOne MFA device registration response
 */
export interface PingOneDeviceRegistrationResponse {
  /**
   * Registration status
   */
  status: 'SUCCESS' | 'FAILED';

  /**
   * Registered device (if successful)
   */
  device?: PingOneMfaDevice;

  /**
   * Error message (if failed)
   */
  error?: string;
}

/**
 * Interface for MFA device management response
 */
export interface PingOneMfaDevicesResponse {
  /**
   * Operation status
   */
  status: 'SUCCESS' | 'FAILED';

  /**
   * List of devices (if successful)
   */
  devices?: PingOneMfaDevice[];

  /**
   * Error message (if failed)
   */
  error?: string;
}
