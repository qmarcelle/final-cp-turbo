'use client';

import { FormEvent, useState } from 'react';
import { resendMfaCode, verifyMfa } from '../services/mfa';
import { useMfaStore } from '../stores/mfaStore';
import { MfaModeState } from '../types/mfa';

export interface OtherMfaEntryProps {
  /**
   * The MFA mode being used (sms, email, device)
   */
  mode: MfaModeState;

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
 * OtherMfaEntry component for handling SMS, email, and device verification
 */
export function OtherMfaEntry({
  mode,
  redirectUrl = '/dashboard',
  className = '',
}: OtherMfaEntryProps) {
  // Get MFA store state
  const {
    code,
    resendCode,
    updateCode,
    updateResendCode,
    updateStage,
    resetApiErrors,
  } = useMfaStore();

  // Local state
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Mode-specific titles and descriptions
  const getTitleAndDescription = () => {
    switch (mode) {
      case MfaModeState.sms:
        return {
          title: 'Text Message Verification',
          description: 'Enter the verification code sent to your mobile phone.',
        };
      case MfaModeState.email:
        return {
          title: 'Email Verification',
          description:
            'Enter the verification code sent to your email address.',
        };
      case MfaModeState.device:
        return {
          title: 'Device Verification',
          description: 'Enter the verification code from your device.',
        };
      default:
        return {
          title: 'Verification',
          description: 'Enter the verification code you received.',
        };
    }
  };

  const { title, description } = getTitleAndDescription();

  // Mock interaction data - in a real implementation, this would come from the store
  const mockInteractionData = {
    deviceId: 'device-123',
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
      console.error('MFA verification error:', error);
      useMfaStore.setState({
        apiErrors: ['An unexpected error occurred. Please try again.'],
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend code
  const handleResendCode = async () => {
    // Set resending state
    setIsResending(true);

    try {
      // Call resend service
      const result = await resendMfaCode(
        mockInteractionData.deviceId,
        mockInteractionData.interactionId,
        mockInteractionData.interactionToken,
      );

      // Update state based on result
      updateResendCode(result.success);

      // Handle errors
      if (!result.success && result.errors && result.errors.length > 0) {
        useMfaStore.setState({ apiErrors: result.errors });
      }
    } catch (error) {
      console.error('Resend code error:', error);
      useMfaStore.setState({
        apiErrors: ['Failed to resend code. Please try again.'],
      });
    } finally {
      setIsResending(false);
    }
  };

  // Go back to selection
  const handleGoBack = () => {
    updateStage(MfaModeState.selection);
    updateCode('');
    resetApiErrors();
  };

  return (
    <div className={`mfa-entry-container ${className}`}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="mb-6 text-gray-600">{description}</p>

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
          />
        </div>

        <div className="flex flex-col space-y-3">
          <button
            type="submit"
            disabled={isLoading || !code}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>

          <button
            type="button"
            onClick={handleResendCode}
            disabled={isResending || resendCode}
            className="w-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isResending
              ? 'Sending...'
              : resendCode
                ? 'Code Resent'
                : 'Resend Code'}
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
