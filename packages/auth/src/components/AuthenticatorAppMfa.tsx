'use client';

import { FormEvent, useState } from 'react';
import { verifyMfa } from '../services/mfa';
import { useMfaStore } from '../stores/mfaStore';
import { MfaModeState } from '../types/mfa';

export interface AuthenticatorAppMfaProps {
  /**
   * Redirect URL after successful verification
   * @default "/dashboard"
   */
  redirectUrl?: string;

  /**
   * Custom CSS class for the container
   */
  className?: string;
}

/**
 * AuthenticatorAppMfa component for handling authenticator app verification
 */
export function AuthenticatorAppMfa({
  redirectUrl = '/dashboard',
  className = '',
}: AuthenticatorAppMfaProps) {
  // Get MFA store state
  const { code, updateCode, updateStage, resetApiErrors } = useMfaStore();

  // Local state
  const [isLoading, setIsLoading] = useState(false);

  // Mock interaction data - in a real implementation, this would come from the store
  const mockInteractionData = {
    deviceId: 'auth-app-123',
    interactionId: 'interaction-123',
    interactionToken: 'token-123',
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!code) {
      return;
    }

    // Reset errors
    resetApiErrors();

    // Set loading state
    setIsLoading(true);

    try {
      // Call MFA verification service
      const result = await verifyMfa(
        code,
        mockInteractionData.deviceId,
        mockInteractionData.interactionId,
        mockInteractionData.interactionToken,
      );

      // Handle verification result
      if (result.isVerified) {
        // Successful verification, redirect
        window.location.href = redirectUrl;
      } else {
        // Handle verification errors
        if (result.errors && result.errors.length > 0) {
          useMfaStore.setState({ apiErrors: result.errors });
        }
      }
    } catch (error) {
      console.error('Authenticator app verification error:', error);
      useMfaStore.setState({
        apiErrors: ['An unexpected error occurred. Please try again.'],
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to selection
  const handleGoBack = () => {
    updateStage(MfaModeState.selection);
    updateCode('');
    resetApiErrors();
  };

  return (
    <div className={`authenticator-app-container ${className}`}>
      <h3 className="text-xl font-semibold mb-2">Authenticator App</h3>
      <p className="mb-6 text-gray-600">
        Enter the verification code from your authenticator app.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="code" className="block text-sm font-medium mb-1">
            Verification Code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={code}
            onChange={(e) => updateCode(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="one-time-code"
            required
            placeholder="Enter 6-digit code"
            maxLength={6}
            pattern="[0-9]{6}"
          />
          <p className="text-xs text-gray-500 mt-1">
            Open your authenticator app to view your verification code.
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            type="submit"
            disabled={isLoading || !code || code.length !== 6}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>

          <button
            type="button"
            onClick={handleGoBack}
            className="text-blue-600 hover:underline text-sm font-medium py-2"
          >
            Back to Selection
          </button>
        </div>
      </form>
    </div>
  );
}
