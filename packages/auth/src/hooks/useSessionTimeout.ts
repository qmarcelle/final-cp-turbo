'use client';

import { useSessionTimeoutStore } from '../stores/sessionTimeoutStore';

/**
 * Session timeout state interface
 */
interface SessionTimeoutState {
  timeRemaining: number;
  showWarning: boolean;
  lastActivity: number;
  intervalId: number | null;
  isTestMode: boolean;
  testDuration: number;

  // Actions
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  setShowWarning: (show: boolean) => void;
  logout: () => void;
  refreshSession: () => Promise<void>;
  // Test helpers
  enableTestMode: (duration?: number) => void;
  disableTestMode: () => void;
  fastForward: (seconds: number) => void;
}

/**
 * Custom hook to access session timeout functionality
 * @returns Session timeout store methods and state
 */
export function useSessionTimeout(): SessionTimeoutState {
  return useSessionTimeoutStore();
}
