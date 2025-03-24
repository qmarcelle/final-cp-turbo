import { useCallback, useMemo } from 'react';
import {
  endImpersonation,
  startImpersonation,
} from '../services/impersonation';
import { ImpersonationContext, PortalUser, UserRole } from '../types/user';
import { AuthAction, logAuthEvent } from '../utils/logger';
import { useSession } from './useSession';

export interface UseImpersonationReturn {
  isImpersonating: boolean;
  impersonationContext: ImpersonationContext | undefined;
  canImpersonate: boolean;
  startImpersonation: (targetUserId: string, reason: string) => Promise<void>;
  endImpersonation: () => Promise<void>;
}

export function useImpersonation(): UseImpersonationReturn {
  const { session, status } = useSession();

  const isImpersonating = useMemo(() => {
    return !!(session?.user as PortalUser)?.impersonation;
  }, [session]);

  const impersonationContext = useMemo(() => {
    return (session?.user as PortalUser)?.impersonation;
  }, [session]);

  const canImpersonate = useMemo(() => {
    if (!session?.user || status !== 'authenticated') {
      return false;
    }

    return [UserRole.INTERNAL, UserRole.ADMIN].includes(session.user.role);
  }, [session, status]);

  const handleStartImpersonation = useCallback(
    async (targetUserId: string, reason: string) => {
      try {
        logAuthEvent({
          action: AuthAction.IMPERSONATION_START,
          status: 'attempt',
          metadata: { targetUserId, reason },
        });
        await startImpersonation({ targetUserId, reason });
      } catch (error) {
        logAuthEvent({
          action: AuthAction.IMPERSONATION_START,
          status: 'failure',
          error: error as Error,
          metadata: { targetUserId },
        });
        throw error;
      }
    },
    [],
  );

  const handleEndImpersonation = useCallback(async () => {
    try {
      logAuthEvent({
        action: AuthAction.IMPERSONATION_END,
        status: 'attempt',
      });
      await endImpersonation();
    } catch (error) {
      logAuthEvent({
        action: AuthAction.IMPERSONATION_END,
        status: 'failure',
        error: error as Error,
      });
      throw error;
    }
  }, []);

  return {
    isImpersonating,
    impersonationContext,
    canImpersonate,
    startImpersonation: handleStartImpersonation,
    endImpersonation: handleEndImpersonation,
  };
}
