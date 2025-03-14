import CredentialsProvider from 'next-auth/providers/credentials';
import { type User, UserRole, Permission } from '../core/types';

/**
 * Types for credentials
 */
export interface Credentials {
  email: string;
  password: string;
  [key: string]: string;
}

/**
 * Configuration for the credentials provider
 */
export interface CredentialsConfig {
  // Optional API endpoint to validate credentials against
  authorizationUrl?: string;
  // Custom authorization function
  authorize?: (credentials: Credentials) => Promise<User | null>;
  // Custom fields for the credentials form
  fields?: Record<string, {
    label: string;
    type: string;
    placeholder?: string;
    required?: boolean;
  }>;
}

/**
 * Creates a credentials provider for username/password authentication
 */
export function createCredentialsProvider(config?: CredentialsConfig) {
  return CredentialsProvider({
    name: 'Credentials',
    credentials: config?.fields || {
      email: { label: 'Email', type: 'email', placeholder: 'email@example.com', required: true },
      password: { label: 'Password', type: 'password', required: true },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null;
      }

      try {
        // If a custom authorize function is provided, use that
        if (config?.authorize) {
          return config.authorize(credentials as Credentials);
        }

        // If an authorization URL is provided, use that
        if (config?.authorizationUrl) {
          const response = await fetch(config.authorizationUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });

          if (!response.ok) {
            const error = await response.text();
            console.error('Authentication failed:', error);
            return null;
          }

          return await response.json();
        }

        // For development/demo purposes only - remove in production
        // This is a simple mock implementation that should be replaced with actual authentication logic
        if (process.env.NODE_ENV !== 'production' && 
            credentials.email === 'demo@example.com' && 
            credentials.password === 'password') {
          return {
            id: '1',
            email: 'demo@example.com',
            name: 'Demo User',
            role: UserRole.BROKER,
            permissions: [
              Permission.VIEW_CLIENTS,
              Permission.VIEW_ACCOUNTS,
              Permission.VIEW_PROFILE,
              Permission.VIEW_DOCUMENTS,
            ],
            accountInfo: {
              accountId: 'B12345',
              groupId: 'G6789',
              planType: 'Broker',
              effectiveDate: '2023-01-01',
            },
          };
        }
        
        // Additional demo user for employer role
        if (process.env.NODE_ENV !== 'production' && 
            credentials.email === 'employer@example.com' && 
            credentials.password === 'password') {
          return {
            id: '2',
            email: 'employer@example.com',
            name: 'Employer User',
            role: UserRole.EMPLOYER,
            permissions: [
              Permission.VIEW_EMPLOYEES,
              Permission.VIEW_BENEFITS,
              Permission.VIEW_PROFILE,
              Permission.VIEW_DOCUMENTS,
            ],
            accountInfo: {
              accountId: 'E12345',
              groupId: 'G6789',
              planType: 'Employer',
              effectiveDate: '2023-01-01',
            },
          };
        }

        // If we get here and none of the authentication methods worked, return null
        console.warn('No authentication method configured for credentials provider');
        return null;
      } catch (error) {
        console.error('Authentication error:', error);
        return null;
      }
    },
  });
} 