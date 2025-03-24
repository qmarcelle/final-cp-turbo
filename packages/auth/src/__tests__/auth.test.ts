import {
  authConfig,
  JWTParams,
  SERVER_ACTION_NO_SESSION_ERROR,
  SessionParams,
} from '../auth';
import { PortalUser, SessionUser, UserRole } from '../types/user';
import { decodeVisibilityRules } from '../visibilityEngine';

// Mock the computeAuthSessionUser function
jest.mock('../services/auth', () => ({
  computeAuthSessionUser: jest.fn().mockResolvedValue({
    id: 'test-user-id',
    currUsr: {
      umpi: 'test-umpi',
      fhirId: 'test-fhir-id',
      role: 'MEM',
    },
    rules: 'A',
  }),
}));

// Mock the decodeVisibilityRules function
jest.mock('../visibilityEngine', () => ({
  decodeVisibilityRules: jest.fn().mockReturnValue({ active: true }),
}));

describe('Auth Configuration', () => {
  it('should export SERVER_ACTION_NO_SESSION_ERROR', () => {
    expect(SERVER_ACTION_NO_SESSION_ERROR).toBe('Invalid session');
  });

  describe('authConfig', () => {
    it('should have the expected structure', () => {
      expect(authConfig).toHaveProperty('callbacks');
      expect(authConfig).toHaveProperty('session');
      expect(authConfig).toHaveProperty('jwt');
      expect(authConfig).toHaveProperty('cookies');
    });

    it('should have the expected session configuration', () => {
      expect(authConfig.session).toEqual({
        strategy: 'jwt',
        maxAge: expect.any(Number),
      });
    });

    it('should have the expected JWT configuration', () => {
      expect(authConfig.jwt).toEqual({
        maxAge: expect.any(Number),
      });
    });

    it('should have the expected cookies configuration', () => {
      expect(authConfig.cookies).toHaveProperty('sessionToken');
      expect(authConfig.cookies.sessionToken).toHaveProperty('name');
      expect(authConfig.cookies.sessionToken).toHaveProperty('options');
    });
  });

  describe('session callback', () => {
    it('should add decoded visibility rules to the user object', async () => {
      const mockUser: SessionUser = {
        id: 'test-user-id',
        currUsr: {
          umpi: 'test-umpi',
          fhirId: 'test-fhir-id',
          role: UserRole.MEMBER,
        },
        rules: 'A',
      };

      const token = {
        user: mockUser,
      };

      const session = {
        user: {
          ...mockUser,
        } as PortalUser,
      };

      const result = await authConfig.callbacks.session({
        token,
        session,
      } as unknown as SessionParams);

      expect(decodeVisibilityRules).toHaveBeenCalledWith('A');
      expect(result.user).toHaveProperty('vRules');
      expect(result.user.vRules).toEqual({ active: true });
    });
  });

  describe('jwt callback', () => {
    it('should return the token with user data during sign in', async () => {
      const token = {};
      const user: SessionUser = {
        id: 'test-user-id',
        currUsr: {
          umpi: 'test-umpi',
          fhirId: 'test-fhir-id',
          role: UserRole.MEMBER,
        },
      };
      const session = {};

      const result = await authConfig.callbacks.jwt({
        token,
        user,
        session,
      } as unknown as JWTParams);

      expect(result).toEqual({
        user,
      });
    });

    it('should update user data during session update', async () => {
      const token = {
        sub: 'test-user-id',
      };

      const session = {
        userId: 'user-id',
        planId: 'plan-id',
      };

      const result = await authConfig.callbacks.jwt({
        token,
        session,
        trigger: 'update',
      } as unknown as JWTParams);

      expect(result).toEqual({
        sub: 'test-user-id',
        user: {
          id: 'test-user-id',
          currUsr: {
            umpi: 'test-umpi',
            fhirId: 'test-fhir-id',
            role: 'MEM',
          },
          rules: 'A',
        },
      });
    });
  });
});
