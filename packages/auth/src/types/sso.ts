/**
 * SSO provider types
 */
export enum SsoProviderType {
  SAML = 'saml',
  OIDC = 'oidc',
  OTHER = 'other',
}

/**
 * Interface for SSO provider
 */
export interface SsoProvider {
  /**
   * Provider ID or identifier
   */
  id: string;

  /**
   * Provider name
   */
  name: string;

  /**
   * Provider type
   */
  type: SsoProviderType;

  /**
   * Provider logo URL
   */
  logoUrl?: string;

  /**
   * Provider description
   */
  description?: string;
}

/**
 * Interface for SSO initiation request
 */
export interface SsoInitiateRequest {
  /**
   * Provider ID or identifier
   */
  providerId: string;

  /**
   * Optional client ID for the application
   */
  clientId?: string;

  /**
   * Redirect URL after successful authentication
   */
  redirectUrl: string;
}

/**
 * Interface for SSO initiation response
 */
export interface SsoInitiateResponse {
  /**
   * URL to redirect the user to for SSO authentication
   */
  authUrl: string;

  /**
   * Flow ID to track the SSO request
   */
  flowId: string;

  /**
   * Provider type
   */
  providerType: SsoProviderType;
}

/**
 * Interface for SSO verification request
 */
export interface SsoVerifyRequest {
  /**
   * Flow ID from the initiation response
   */
  flowId: string;

  /**
   * Response code from the SSO provider
   */
  code?: string;

  /**
   * SAMLResponse from the SSO provider
   */
  samlResponse?: string;

  /**
   * Other parameters from the SSO provider callback
   */
  [key: string]: string | undefined;
}

/**
 * Interface for SSO verification response
 */
export interface SsoVerifyResponse {
  /**
   * Verification status
   */
  status: 'SUCCESS' | 'FAILED';

  /**
   * User ID (if successful)
   */
  userId?: string;

  /**
   * Authentication token (if successful)
   */
  token?: string;

  /**
   * Error message (if failed)
   */
  error?: string;
}

/**
 * Interface for SSO link status
 */
export interface SsoLinkStatus {
  /**
   * User ID
   */
  userId: string;

  /**
   * Provider ID
   */
  providerId: string;

  /**
   * Whether the user is linked to the provider
   */
  linked: boolean;

  /**
   * When the link was created (if linked)
   */
  linkedAt?: string;

  /**
   * User ID in the provider system (if linked)
   */
  providerUserId?: string;
}
