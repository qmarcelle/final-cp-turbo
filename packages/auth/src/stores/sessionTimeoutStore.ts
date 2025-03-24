'use client';

import { signOut } from 'next-auth/react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Default values
const DEFAULT_EXPIRY = 1800; // 30 minutes in seconds
const WARNING_BEFORE_TIMEOUT = 60; // Show warning 60 seconds before timeout

/**
 * Session timeout state interface
 */
interface SessionTimeoutState {
  timeRemaining: number;
  showWarning: boolean;
  lastActivity: number;
  intervalId: number | null;
  // For testing
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
 * Session timeout store
 */
export const useSessionTimeoutStore = create<SessionTimeoutState>()(
  persist(
    (set, get) => ({
      timeRemaining: DEFAULT_EXPIRY,
      showWarning: false,
      lastActivity: Date.now(),
      intervalId: null,
      isTestMode: false,
      testDuration: 120, // Default test duration: 2 minutes

      startTimer: () => {
        // Clear any existing interval
        const { intervalId } = get();
        if (intervalId !== null) {
          clearInterval(intervalId);
        }

        const newIntervalId = window.setInterval(() => {
          const { lastActivity, isTestMode, testDuration } = get();

          // Use test duration if in test mode
          const sessionDuration = isTestMode ? testDuration : DEFAULT_EXPIRY;

          // If no activity for sessionDuration seconds, log out
          const inactiveTime = Math.floor((Date.now() - lastActivity) / 1000);

          if (inactiveTime >= sessionDuration) {
            get().logout();
            return;
          }

          // Calculate new time remaining
          const newTimeRemaining = sessionDuration - inactiveTime;

          // Show warning dialog when 60 seconds remaining (or 25% of test duration)
          const warningTime = isTestMode
            ? Math.floor(testDuration * 0.25)
            : WARNING_BEFORE_TIMEOUT;

          if (newTimeRemaining <= warningTime && !get().showWarning) {
            set({ showWarning: true });
          }

          set({ timeRemaining: newTimeRemaining });
        }, 1000);

        set({ intervalId: newIntervalId });
      },

      stopTimer: () => {
        const { intervalId } = get();
        if (intervalId !== null) {
          clearInterval(intervalId);
          set({ intervalId: null });
        }
      },

      resetTimer: () => {
        set({
          lastActivity: Date.now(),
          timeRemaining: get().isTestMode ? get().testDuration : DEFAULT_EXPIRY,
          showWarning: false,
        });
      },

      setShowWarning: (show) => {
        set({ showWarning: show });
      },

      logout: () => {
        get().stopTimer();
        // Use next-auth signOut function for authentication
        signOut({ redirect: true, callbackUrl: '/login' }).catch((error) => {
          console.error('Logout failed:', error);
          // Fallback to direct navigation if signOut fails
          window.location.href = '/login';
        });
      },

      refreshSession: async () => {
        try {
          // Call API to refresh session using Auth.js v5 pattern
          const response = await fetch('/api/auth/session', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Session refresh failed');
          }

          // Reset timer
          get().resetTimer();
          set({ showWarning: false });
        } catch (error) {
          console.error('Failed to refresh session:', error);
          // Force logout if refresh fails
          get().logout();
        }
      },

      // Test mode methods
      enableTestMode: (duration) => {
        set({
          isTestMode: true,
          testDuration: duration || 120,
          timeRemaining: duration || 120,
          lastActivity: Date.now(),
        });
        // Restart timer with new settings
        get().stopTimer();
        get().startTimer();
      },

      disableTestMode: () => {
        set({
          isTestMode: false,
          timeRemaining: DEFAULT_EXPIRY,
          lastActivity: Date.now(),
        });
        // Restart timer with original settings
        get().stopTimer();
        get().startTimer();
      },

      fastForward: (seconds) => {
        // Simulate time passing by adjusting lastActivity
        const { lastActivity } = get();
        set({ lastActivity: lastActivity - seconds * 1000 });
      },
    }),
    {
      name: 'session-timeout-storage',
      // Only persist non-testing state values
      partialize: (state) => ({
        lastActivity: state.lastActivity,
      }),
    },
  ),
);
