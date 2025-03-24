'use client';

import { useEffect, useState } from 'react';
import { useSession } from '../hooks/useSession';
import { authServiceImpl } from '../services/auth';

export interface SessionTimeoutMonitorProps {
  /**
   * Whether session timeout monitoring is enabled
   */
  enabled: boolean;

  /**
   * Session expiry time in minutes
   */
  sessionExpiry?: number;

  /**
   * Warning time before session expiry in minutes
   */
  warningTime?: number;

  /**
   * Callback when session is about to expire
   */
  onWarning?: () => void;

  /**
   * Callback when session has expired
   */
  onExpired?: () => void;
}

/**
 * Session timeout monitor component
 * This component monitors user activity and manages session timeout
 */
export function SessionTimeoutMonitor({
  enabled,
  sessionExpiry = 30, // 30 minutes
  warningTime = 5, // 5 minutes
  onWarning,
  onExpired,
}: SessionTimeoutMonitorProps) {
  const { session } = useSession();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const [warningId, setWarningId] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (!enabled || !session) {
      return;
    }

    // Clear existing timeouts
    if (timeoutId) clearTimeout(timeoutId);
    if (warningId) clearTimeout(warningId);

    // Set warning timeout
    const warningTimeout = setTimeout(
      () => {
        onWarning?.();
      },
      (sessionExpiry - warningTime) * 60 * 1000,
    );

    // Set session timeout
    const sessionTimeout = setTimeout(
      async () => {
        onExpired?.();
        await authServiceImpl.signOut();
      },
      sessionExpiry * 60 * 1000,
    );

    setWarningId(warningTimeout);
    setTimeoutId(sessionTimeout);

    return () => {
      clearTimeout(warningTimeout);
      clearTimeout(sessionTimeout);
    };
  }, [enabled, session, sessionExpiry, warningTime, onWarning, onExpired]);

  return null;
}
