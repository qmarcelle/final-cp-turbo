'use client';

import { FormEvent, useEffect, useState } from 'react';
import { requestPasswordReset, resetPassword } from '../services/resetPassword';
import { useLoginStore } from '../stores/loginStore';
import { ResetPasswordStatus } from '../types/resetPassword';

interface ResetPasswordComponentProps {
  /**
   * Custom redirect URL after successful password reset
   * @default "/login"
   */
  redirectUrl?: string;

  /**
   * Optional title to display above the reset form
   * @default "Reset Password"
   */
  title?: string;

  /**
   * Custom CSS class for the container
   */
  className?: string;

  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Reset Password component for handling password resets
 */
export function ResetPasswordComponent({
  redirectUrl = '/login',
  title = 'Reset Password',
  className = '',
  onSuccess,
  onError,
}: ResetPasswordComponentProps) {
  const {
    password,
    dob,
    username,
    apiErrors,
    updatePassword,
    updateDOB,
    updateUsername,
    resetApiErrors,
    updateUnhandledErrors,
  } = useLoginStore();

  // Local state
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState<'request' | 'reset'>('request');
  const [interactionData, setInteractionData] = useState<{
    interactionId: string;
    interactionToken: string;
  } | null>(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordStrong, setPasswordStrong] = useState(false);

  // Check password strength
  useEffect(() => {
    // Minimum criteria: 8+ chars, 1 uppercase, 1 lowercase, 1 number
    const isStrong =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password);

    setPasswordStrong(isStrong);

    // Check if passwords match when both are entered
    if (password && confirmPassword) {
      setPasswordMatch(password === confirmPassword);
    } else {
      setPasswordMatch(true);
    }
  }, [password, confirmPassword]);

  // Handle request password reset form submission
  const handleRequestReset = async (e: FormEvent) => {
    e.preventDefault();

    if (!username || !dob) {
      return;
    }

    // Reset previous errors
    resetApiErrors();

    // Set loading state
    setIsLoading(true);

    try {
      // Call request password reset service
      const result = await requestPasswordReset(username, dob);

      // Handle response
      if (
        result.status === ResetPasswordStatus.SUCCESS &&
        result.interactionId &&
        result.interactionToken
      ) {
        // Store interaction data for reset stage
        setInteractionData({
          interactionId: result.interactionId,
          interactionToken: result.interactionToken,
        });

        // Move to reset stage
        setStage('reset');
      } else {
        // Handle errors
        if (result.errors && result.errors.length > 0) {
          updateUnhandledErrors(result.errors);
        }
      }
    } catch (error) {
      console.error('Password reset request error:', error);
      updateUnhandledErrors([
        'An unexpected error occurred. Please try again.',
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle reset password form submission
  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword || !interactionData) {
      return;
    }

    // Validate password match and strength
    if (!passwordMatch) {
      updateUnhandledErrors(['Passwords do not match.']);
      return;
    }

    if (!passwordStrong) {
      updateUnhandledErrors(['Password does not meet security requirements.']);
      return;
    }

    // Reset previous errors
    resetApiErrors();

    // Set loading state
    setIsLoading(true);

    try {
      // Call reset password service
      const result = await resetPassword({
        newPassword: password,
        interactionId: interactionData.interactionId,
        interactionToken: interactionData.interactionToken,
      });

      // Handle response
      if (result.status === ResetPasswordStatus.SUCCESS) {
        // Redirect to login page on success
        window.location.href = redirectUrl;
        onSuccess?.();
      } else {
        // Handle errors
        if (result.errors && result.errors.length > 0) {
          updateUnhandledErrors(result.errors);
        }
      }
    } catch (error) {
      console.error('Password reset error:', error);
      updateUnhandledErrors([
        'An unexpected error occurred. Please try again.',
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to request stage
  const handleGoBack = () => {
    setStage('request');
    setInteractionData(null);
    updatePassword('');
    setConfirmPassword('');
    resetApiErrors();
    updateUnhandledErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetApiErrors();

    try {
      // Validation logic here
      if (!password || !dob || !username) {
        updateUnhandledErrors(['All fields are required']);
        return;
      }

      // Reset password logic here
      onSuccess?.();
    } catch (error) {
      updateUnhandledErrors(['An unexpected error occurred']);
      onError?.(error as Error);
    }
  };

  return (
    <div className={`reset-password-container ${className}`}>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      {/* Error display */}
      {apiErrors.length > 0 && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          <ul className="list-disc pl-5">
            {apiErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Request password reset form */}
      {stage === 'request' && (
        <form onSubmit={handleRequestReset}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => updateUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="dob" className="block text-sm font-medium mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={dob}
              onChange={(e) => updateDOB(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Format: YYYY-MM-DD</p>
          </div>

          <button
            type="submit"
            disabled={isLoading || !username || !dob}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Continue'}
          </button>

          <div className="mt-4 text-center">
            <a href="/login" className="text-blue-600 hover:underline text-sm">
              Back to Login
            </a>
          </div>
        </form>
      )}

      {/* Reset password form */}
      {stage === 'reset' && (
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => updatePassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!passwordStrong && password ? 'border-yellow-500' : ''}`}
              required
            />
            <ul className="text-xs text-gray-500 mt-1 list-disc pl-5">
              <li className={password.length >= 8 ? 'text-green-600' : ''}>
                At least 8 characters
              </li>
              <li className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>
                At least one uppercase letter
              </li>
              <li className={/[a-z]/.test(password) ? 'text-green-600' : ''}>
                At least one lowercase letter
              </li>
              <li className={/[0-9]/.test(password) ? 'text-green-600' : ''}>
                At least one number
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!passwordMatch && confirmPassword ? 'border-red-500' : ''}`}
              required
            />
            {!passwordMatch && confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          <div className="flex flex-col space-y-3">
            <button
              type="submit"
              disabled={
                isLoading ||
                !password ||
                !confirmPassword ||
                !passwordMatch ||
                !passwordStrong
              }
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Reset Password'}
            </button>

            <button
              type="button"
              onClick={handleGoBack}
              className="text-blue-600 hover:underline text-sm font-medium py-2"
            >
              Back
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
