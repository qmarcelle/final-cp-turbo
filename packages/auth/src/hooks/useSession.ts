import { useCallback, useEffect, useState } from 'react';
import { authServiceImpl } from '../services/auth';
import { Session } from '../types/user';

export type SessionStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface UseSessionReturn {
  session: Session | null;
  status: SessionStatus;
  signOut: () => Promise<void>;
  extendSession: () => Promise<boolean>;
}

export function useSession(): UseSessionReturn {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<SessionStatus>('loading');

  useEffect(() => {
    const loadSession = async () => {
      try {
        const currentSession = await authServiceImpl.getSession();
        setSession(currentSession);
        setStatus(currentSession ? 'authenticated' : 'unauthenticated');
      } catch (error) {
        console.error('Failed to load session:', error);
        setStatus('unauthenticated');
      }
    };

    loadSession();
  }, []);

  const signOut = useCallback(async () => {
    await authServiceImpl.signOut();
    setSession(null);
    setStatus('unauthenticated');
  }, []);

  const extendSession = useCallback(async () => {
    if (!session) return false;
    try {
      const response = await fetch('/api/auth/extend', {
        method: 'POST',
      });
      if (response.ok) {
        const newSession = await response.json();
        setSession(newSession);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to extend session:', error);
      return false;
    }
  }, [session]);

  return {
    session,
    status,
    signOut,
    extendSession,
  };
}
