'use client';

import { FormEvent, useState } from 'react';
import { login } from '../services/login';
import { useLoginStore } from '../stores/loginStore';
import { LoginStatus } from '../types/login';

export interface LoginComponentProps {
  /**
   * Custom success redirect URL
   */
  redirectUrl?: string;

  /**
   * Optional title to display above the login form
   * @default "Log In"
   */
  title?: string;

  /**
   * Show or hide the forgot password link
   * @default true
   */
  showForgotPassword?: boolean;

  /**
   * Custom text for the username field label
   * @default "Username"
   */
  usernameLabel?: string;

  /**
   * Custom text for the password field label
   * @default "Password"
   */
  passwordLabel?: string;

  /**
   * Custom text for the login button
   * @default "Log In"
   */
  loginButtonText?: string;

  /**
   * Custom CSS class for the login container
   */
  className?: string;
}

/**
 * Login component for user authentication
 */
export function LoginComponent({
  redirectUrl = '/dashboard',
  title = 'Log In',
  showForgotPassword = true,
  usernameLabel = 'Username',
  passwordLabel = 'Password',
  loginButtonText = 'Log In',
  className = '',
}: LoginComponentProps) {
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Get login store state and actions
  const {
    username,
    password,
    apiErrors,
    updateUsername,
    updatePassword,
    updateMfaNeeded,
    updateForcePasswordReset,
    updateVerifyEmail,
    updateInactive,
    updateIsRiskScoreHigh,
    updateRiskLevelNotDetermined,
    updateUnhandledErrors,
    resetApiErrors,
  } = useLoginStore();

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      return;
    }

    // Reset previous errors
    resetApiErrors();

    // Set loading state
    setIsLoading(true);

    try {
      // Call login service
      const result = await login({ username, password });

      // Handle different login statuses
      switch (result.status) {
        case LoginStatus.ACTIVE:
          // Successful login, redirect to dashboard or specified URL
          window.location.href = redirectUrl;
          break;

        case LoginStatus.MFA_REQUIRED:
          // MFA required, update store and let MFA component handle
          updateMfaNeeded(true);
          break;

        case LoginStatus.INACTIVE:
          // Account inactive
          updateInactive(true);
          break;

        case LoginStatus.PASSWORD_RESET:
          // Password reset required
          updateForcePasswordReset(true);
          break;

        case LoginStatus.VALIDATE_EMAIL:
          // Email validation required
          updateVerifyEmail(true);
          break;

        case LoginStatus.VERIFY_UNIQUE_EMAIL:
          // Verify unique email required
          // This will be handled by a specific component
          break;

        case LoginStatus.ERROR:
          // Handle risk level flags
          if (result.riskLevelHigh) {
            updateIsRiskScoreHigh(true);
          }

          if (result.riskLevelUndetermined) {
            updateRiskLevelNotDetermined(true);
          }

          // Add errors to store
          if (result.errors && result.errors.length > 0) {
            useLoginStore.setState({ apiErrors: result.errors });
          } else {
            updateUnhandledErrors(['An unexpected error occurred']);
          }
          break;
      }
    } catch (error) {
      console.error('Login error:', error);
      updateUnhandledErrors(['An unexpected error occurred']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`login-container ${className}`}>
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

      {/* Login form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            {usernameLabel}
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
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            {passwordLabel}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => updatePassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {showForgotPassword && (
          <div className="mb-4 text-right">
            <a
              href="/login?forgot=true"
              className="text-blue-600 hover:underline text-sm"
            >
              Forgot Password?
            </a>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? (
            <span aria-label="Logging In...">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </span>
          ) : (
            loginButtonText
          )}
        </button>
      </form>
    </div>
  );
}
