import '@auth/core/jwt';
import { DefaultUser } from '@auth/core/types';
import { Session as AuthSession, User as AuthUser } from 'next-auth';
import { PortalUser, UserRole } from './user';

declare module '@auth/core/types' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
      permissions: string[];
      visibilityRules: string;
      rules?: Record<string, boolean>;
    };
    userId?: string;
    planId?: string;
    expires: string;
  }

  interface User extends DefaultUser {
    id: string;
    role: UserRole;
    permissions: string[];
    visibilityRules: string;
    rules?: Record<string, boolean>;
  }
}

declare module '@auth/core/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: UserRole;
    permissions: string[];
    visibilityRules: string;
    rules?: Record<string, boolean>;
    userId?: string;
    planId?: string;
  }
}

declare module 'next-auth' {
  interface Session extends AuthSession {
    user: PortalUser;
    expires: string;
  }

  interface User extends AuthUser, PortalUser {}
}
