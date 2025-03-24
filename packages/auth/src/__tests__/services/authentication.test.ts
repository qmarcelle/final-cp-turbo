import { authService } from '../../auth';
import { Session, UserRole } from '../../types/user';

describe('Authentication Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Login Flow', () => {
    it('should handle successful login', async () => {
      const mockCredentials = {
        username: 'testuser@example.com',
        password: 'password123',
      };

      const mockResponse = {
        user: {
          id: 'user-123',
          role: UserRole.MEMBER,
          permissions: ['read'],
          visibilityRules: '{}',
        },
        expires: new Date(Date.now() + 3600000).toISOString(),
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await authService.signIn(mockCredentials);
      expect(result).toBeDefined();
      expect(result.user.role).toBe(UserRole.MEMBER);
    });

    it('should handle invalid credentials', async () => {
      const mockCredentials = {
        username: 'invalid@example.com',
        password: 'wrongpassword',
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ error: 'Invalid credentials' }),
      });

      await expect(authService.signIn(mockCredentials)).rejects.toThrow();
    });

    it('should handle account locked status', async () => {
      const mockCredentials = {
        username: 'locked@example.com',
        password: 'password123',
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 423,
        json: () =>
          Promise.resolve({ error: 'Account locked', remainingTime: 300 }),
      });

      await expect(authService.signIn(mockCredentials)).rejects.toThrow(
        /account locked/i,
      );
    });
  });

  describe('MFA Flow', () => {
    it('should handle successful MFA verification', async () => {
      const mockMFACode = '123456';
      const mockSession: Session = {
        user: {
          id: 'user-123',
          role: UserRole.MEMBER,
          permissions: ['read'],
          visibilityRules: '{}',
        },
        expires: new Date(Date.now() + 3600000).toISOString(),
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockSession),
      });

      const result = await authService.verifyMFA(mockMFACode);
      expect(result).toBeDefined();
      expect(result.user.id).toBe('user-123');
    });

    it('should handle invalid MFA code', async () => {
      const mockMFACode = '000000';

      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ error: 'Invalid MFA code' }),
      });

      await expect(authService.verifyMFA(mockMFACode)).rejects.toThrow(
        /invalid.*code/i,
      );
    });

    it('should handle MFA code expiration', async () => {
      const mockMFACode = '123456';

      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ error: 'MFA code expired' }),
      });

      await expect(authService.verifyMFA(mockMFACode)).rejects.toThrow(
        /expired/i,
      );
    });
  });

  describe('Password Reset Flow', () => {
    it('should handle password reset request', async () => {
      const mockEmail = 'user@example.com';

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ message: 'Reset email sent' }),
      });

      await expect(
        authService.requestPasswordReset(mockEmail),
      ).resolves.not.toThrow();
    });

    it('should handle password reset verification', async () => {
      const mockToken = 'reset-token-123';
      const mockNewPassword = 'newPassword123';

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ message: 'Password reset successful' }),
      });

      await expect(
        authService.resetPassword(mockToken, mockNewPassword),
      ).resolves.not.toThrow();
    });

    it('should handle invalid reset token', async () => {
      const mockToken = 'invalid-token';
      const mockNewPassword = 'newPassword123';

      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: () =>
          Promise.resolve({ error: 'Invalid or expired reset token' }),
      });

      await expect(
        authService.resetPassword(mockToken, mockNewPassword),
      ).rejects.toThrow(/invalid.*token/i);
    });
  });

  describe('Sign Out Flow', () => {
    it('should handle successful sign out', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });

      await expect(authService.signOut()).resolves.not.toThrow();
    });

    it('should clear session on sign out', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });

      await authService.signOut();
      const session = await authService.getSession();
      expect(session).toBeNull();
    });
  });
});
