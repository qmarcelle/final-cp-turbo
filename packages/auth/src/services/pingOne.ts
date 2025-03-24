import axios from 'axios';
import { getAuthToken } from '../utils/tokens';

/**
 * Base URL for API calls
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

/**
 * PingOne authentication endpoints
 */
const PING_ONE_AUTH_ENDPOINT = `${API_BASE_URL}/auth/pingone`;
const PING_ONE_MFA_ENDPOINT = `${API_BASE_URL}/auth/pingone/mfa`;
const PING_ONE_DEVICES_ENDPOINT = `${API_BASE_URL}/auth/pingone/devices`;

/**
 * User authentication method types
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
 * Authenticate with PingOne
 * @param data Authentication request data
 * @returns Promise with authentication response
 */
export async function authenticateWithPingOne(
  data: PingOneAuthRequest,
): Promise<PingOneAuthResponse> {
  try {
    const response = await axios.post(PING_ONE_AUTH_ENDPOINT, data);

    return response.data;
  } catch (error) {
    console.error('Error authenticating with PingOne:', error);

    return {
      status: 'FAILED',
      error: 'Authentication failed',
    };
  }
}

/**
 * Verify MFA with PingOne
 * @param data MFA verification request data
 * @returns Promise with authentication response
 */
export async function verifyMfaWithPingOne(
  data: PingOneMfaVerifyRequest,
): Promise<PingOneAuthResponse> {
  try {
    const response = await axios.post(PING_ONE_MFA_ENDPOINT, data);

    return response.data;
  } catch (error) {
    console.error('Error verifying MFA with PingOne:', error);

    return {
      status: 'FAILED',
      error: 'MFA verification failed',
    };
  }
}

/**
 * Get user's PingOne MFA devices
 * @param userId User ID to get devices for
 * @returns Promise with list of devices
 */
export async function getPingOneMfaDevices(
  userId: string,
): Promise<PingOneMfaDevice[]> {
  try {
    const token = await getAuthToken();

    const response = await axios.get(`${PING_ONE_DEVICES_ENDPOINT}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.devices || [];
  } catch (error) {
    console.error('Error getting PingOne MFA devices:', error);
    return [];
  }
}

/**
 * Register a new PingOne MFA device
 * @param userId User ID to register device for
 * @param type Device type
 * @param target Target (phone number or email)
 * @returns Promise with the new device
 */
export async function registerPingOneMfaDevice(
  userId: string,
  type: AuthMethodType,
  target: string,
): Promise<PingOneMfaDevice | null> {
  try {
    const token = await getAuthToken();

    const response = await axios.post(
      PING_ONE_DEVICES_ENDPOINT,
      {
        userId,
        type,
        target,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.device || null;
  } catch (error) {
    console.error('Error registering PingOne MFA device:', error);
    return null;
  }
}
