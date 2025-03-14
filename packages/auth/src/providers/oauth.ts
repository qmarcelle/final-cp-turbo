import GoogleProvider from 'next-auth/providers/google';
import MicrosoftProvider from 'next-auth/providers/azure-ad';
import { type User, UserRole, Permission } from '../core/types';

/**
 * Type for OAuth profile objects
 */
export interface OAuthProfile {
  id?: string;
  sub?: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  preferred_username?: string;
  [key: string]: any; // For any additional fields
}

/**
 * Configuration for OAuth providers
 */
export interface OAuthProviderConfig {
  provider: 'google' | 'microsoft' | 'azure-ad';
  clientId: string;
  clientSecret: string;
  tenantId?: string; // Required for Microsoft/Azure
  profile?: (profile: OAuthProfile) => User;
  scope?: string[];
  authorizationUrl?: string;
  tokenUrl?: string;
}

/**
 * Default profile mapper for Google
 */
const defaultGoogleProfileMapper = (profile: OAuthProfile): User => {
  if (!profile.sub || !profile.email) {
    throw new Error('Missing required OAuth profile information from Google');
  }

  return {
    id: profile.sub,
    email: profile.email,
    name: profile.name || profile.email.split('@')[0],
    role: UserRole.BROKER, // Default role, should be determined based on your business logic
    permissions: [
      Permission.VIEW_PROFILE,
      Permission.VIEW_DOCUMENTS,
      Permission.VIEW_CLIENTS,
      Permission.VIEW_ACCOUNTS,
    ],
  };
};

/**
 * Default profile mapper for Microsoft/Azure AD
 */
const defaultMicrosoftProfileMapper = (profile: OAuthProfile): User => {
  const id = profile.sub || profile.id;
  const email = profile.email || profile.preferred_username;

  if (!id || !email) {
    throw new Error('Missing required OAuth profile information from Microsoft');
  }

  return {
    id,
    email,
    name: profile.name || email.split('@')[0],
    role: UserRole.BROKER, // Default role, should be determined based on your business logic
    permissions: [
      Permission.VIEW_PROFILE,
      Permission.VIEW_DOCUMENTS,
      Permission.VIEW_CLIENTS,
      Permission.VIEW_ACCOUNTS,
    ],
  };
};

/**
 * Creates an OAuth provider based on the given configuration
 */
export function createOAuthProvider(config: OAuthProviderConfig) {
  switch (config.provider) {
    case 'google':
      return GoogleProvider({
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        authorization: {
          params: {
            scope: config.scope?.join(' ') || 'openid email profile',
            prompt: 'consent',
          }
        },
        profile: (profile) => {
          if (config.profile) {
            return config.profile(profile);
          }
          return defaultGoogleProfileMapper(profile);
        },
      });
    case 'microsoft':
    case 'azure-ad':
      if (!config.tenantId) {
        throw new Error('Microsoft/Azure AD provider requires a tenantId');
      }
      
      // Create proper config for Microsoft provider
      const microsoftConfig: any = {
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        // Microsoft Entra ID expects tenantId as part of the authorization configuration
        authorization: {
          params: { 
            scope: config.scope?.join(' ') || 'openid email profile User.Read',
            tenant: config.tenantId
          }
        }
      };
      
      // Add custom authorization URL if specified
      if (config.authorizationUrl) {
        microsoftConfig.authorization.url = config.authorizationUrl;
      }
      
      // Add custom token URL if specified
      if (config.tokenUrl) {
        microsoftConfig.token = { url: config.tokenUrl };
      }
      
      // Add custom profile handling
      microsoftConfig.profile = (profile: any) => {
        if (config.profile) {
          return config.profile(profile);
        }
        return defaultMicrosoftProfileMapper(profile);
      };
      
      return MicrosoftProvider(microsoftConfig);
    default:
      throw new Error(`Unsupported provider: ${config.provider}`);
  }
} 