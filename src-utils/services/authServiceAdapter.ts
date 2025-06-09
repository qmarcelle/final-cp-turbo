import {
  AuthenticationError,
  AuthErrorCode,
} from '@/app/(public)/login/utils/errors';
import { esApi } from '@/utils/api/esApi';
import { logger } from '@/utils/logger';

interface AuthResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

interface AuthResponse {
  username: string;
  id: string;
  email?: string;
  name?: string;
  role?: string;
  permissions?: string[];
}

class AuthServiceAdapter {
  private readonly baseUrl = process.env.AUTH_SERVICE_URL;

  async authenticate(credentials: {
    username: string;
    password: string;
  }): Promise<AuthResult<AuthResponse>> {
    try {
      const response = await esApi.post(
        '/mfAuthentication/loginAuthentication',
        {
          username: credentials.username,
          password: credentials.password,
          policyId: process.env.ES_API_POLICY_ID,
          appId: process.env.ES_API_APP_ID,
        },
      );

      if (!response.data?.success) {
        throw new AuthenticationError(
          AuthErrorCode.INVALID_CREDENTIALS,
          response.data?.error,
        );
      }

      // Map ES response to AuthResponse
      const user: AuthResponse = {
        id: response.data.userId,
        username: credentials.username,
        email: response.data.email,
        name: response.data.name,
        role: response.data.role,
        permissions: response.data.permissions,
      };

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      logger.error('Authentication failed', { error });
      return {
        success: false,
        error:
          error instanceof AuthenticationError
            ? error.message
            : 'Authentication failed',
      };
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthResult<TokenResponse>> {
    try {
      const response = await esApi.post('/mfAuthentication/refreshToken', {
        refreshToken,
        policyId: process.env.ES_API_POLICY_ID,
        appId: process.env.ES_API_APP_ID,
      });

      if (!response.data?.success) {
        throw new AuthenticationError(
          AuthErrorCode.REFRESH_FAILED,
          response.data?.error,
        );
      }

      return {
        success: true,
        data: {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          expiresIn: response.data.expiresIn,
        },
      };
    } catch (error) {
      logger.error('Token refresh failed', { error });
      return {
        success: false,
        error:
          error instanceof AuthenticationError
            ? error.message
            : 'Token refresh failed',
      };
    }
  }

  async rotateRefreshToken(
    refreshToken: string,
  ): Promise<AuthResult<{ refreshToken: string }>> {
    try {
      const response = await esApi.post(
        '/mfAuthentication/rotateRefreshToken',
        {
          refreshToken,
          policyId: process.env.ES_API_POLICY_ID,
          appId: process.env.ES_API_APP_ID,
        },
      );

      if (!response.data?.success) {
        throw new AuthenticationError(
          AuthErrorCode.REFRESH_FAILED,
          response.data?.error,
        );
      }

      return {
        success: true,
        data: {
          refreshToken: response.data.refreshToken,
        },
      };
    } catch (error) {
      logger.error('Refresh token rotation failed', { error });
      return {
        success: false,
        error:
          error instanceof AuthenticationError
            ? error.message
            : 'Refresh token rotation failed',
      };
    }
  }

  async validateToken(token: string): Promise<AuthResult<boolean>> {
    try {
      const response = await esApi.post('/mfAuthentication/validateToken', {
        token,
        policyId: process.env.ES_API_POLICY_ID,
        appId: process.env.ES_API_APP_ID,
      });

      return {
        success: true,
        data: response.data?.valid ?? false,
      };
    } catch (error) {
      logger.error('Token validation failed', { error });
      return {
        success: false,
        error:
          error instanceof AuthenticationError
            ? error.message
            : 'Token validation failed',
      };
    }
  }
}

export const authServiceAdapter = new AuthServiceAdapter();
