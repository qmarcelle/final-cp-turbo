'use client';

import { useEffect, useState } from 'react';
import { useSessionTimeoutStore } from '../stores/sessionTimeoutStore';

export interface SessionTimeoutDialogProps {
  /**
   * Custom component to render instead of the default dialog
   */
  customDialog?: React.ReactNode;

  /**
   * Custom title for the dialog
   * @default "Session Timeout Warning"
   */
  title?: string;

  /**
   * Custom message for the dialog
   * @default "Your session will expire in {timeRemaining}. Would you like to continue?"
   */
  message?: string;

  /**
   * Text for the logout button
   * @default "Logout Now"
   */
  logoutButtonText?: string;

  /**
   * Text for the continue button
   * @default "Continue Session"
   */
  continueButtonText?: string;

  /**
   * CSS class for the dialog container
   */
  className?: string;
}

/**
 * Session timeout dialog component
 * Displays a warning dialog before session expiry
 */
export function SessionTimeoutDialog({
  customDialog,
  title = 'Session Timeout Warning',
  message,
  logoutButtonText = 'Logout Now',
  continueButtonText = 'Continue Session',
  className,
}: SessionTimeoutDialogProps) {
  const { showWarning, timeRemaining, logout, refreshSession, setShowWarning } =
    useSessionTimeoutStore();
  const [formattedTime, setFormattedTime] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  // Handle mounting state
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Format the remaining time for display
  useEffect(() => {
    if (!isMounted || !showWarning) return;

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    setFormattedTime(formatTime(timeRemaining));
  }, [timeRemaining, showWarning, isMounted]);

  if (!isMounted || !showWarning) {
    return null;
  }

  // Allow rendering a custom dialog component
  if (customDialog) {
    return <>{customDialog}</>;
  }

  // Default dialog implementation
  const defaultMessage =
    message ||
    `Your session will expire in ${formattedTime}. Would you like to continue?`;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${className || ''}`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{defaultMessage}</p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => logout()}
          >
            {logoutButtonText}
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => {
              refreshSession();
              setShowWarning(false);
            }}
          >
            {continueButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
