'use client';

import { FormEvent } from 'react';
import { useLoginStore } from '../stores/loginStore';
import { useVerifyEmailStore } from '../stores/verifyEmailStore';
import { AppProg } from '../types/app';

// Constants for code validation
const MIN_CODE_LENGTH = 6;
const INVALID_CODE_LENGTH = 0;

/**
 * Props for the LoginEmailVerification component
 */
export interface LoginEmailVerificationProps {
  /**
   * Custom class name for styling
   */
  className?: string;
}

/**
 * Component for email verification during login process
 */
export const LoginEmailVerification = ({
  className,
}: LoginEmailVerificationProps) => {
  // Get values from login store
  const { verifyUniqueEmail, emailId } = useLoginStore((state) => ({
    verifyUniqueEmail: state.verifyUniqueEmail,
    emailId: state.emailId,
  }));

  // Get values from verify email store
  const {
    resetApiErrors,
    updateCode,
    apiErrors,
    code,
    completeVerifyEmailProg,
    submitVerifyEmailAuth,
    isResentSuccessCode,
    handleResendCode,
  } = useVerifyEmailStore((state) => state);

  // Update security code and clear errors
  const updateSecurityCode = (value: string) => {
    if (apiErrors.length) {
      resetApiErrors();
    }
    updateCode(value);
  };

  // Handle resend code action
  const updateResendCode = () => {
    if (apiErrors.length) {
      resetApiErrors();
    }
    handleResendCode();
  };

  // Validate security code
  const validateSecurityCode = () => code.length > INVALID_CODE_LENGTH;

  // Show tooltip when code is invalid
  const showTooltip = code.length < MIN_CODE_LENGTH;

  // Function to mask email for display security
  const maskEmail = (email: string) => {
    if (!email) return '';

    const [username, domain] = email.split('@');
    if (!domain) return email;

    const maskedUsername =
      username.substring(0, 2) + '*'.repeat(username.length - 2);

    return `${maskedUsername}@${domain}`;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateSecurityCode()) {
      submitVerifyEmailAuth(e as FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>

        <p className="mb-4">
          We&apos;ve sent a security code to your email address.
        </p>

        <p className="font-bold mb-4">{emailId ? maskEmail(emailId) : ''}</p>

        <p className="mb-8">
          Enter the code below to verify your email address.
        </p>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Enter Security Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => updateSecurityCode(e.target.value)}
            className={`w-full p-2 border rounded-md ${
              apiErrors.length ? 'border-red-500' : 'border-gray-300'
            }`}
          />

          {apiErrors.map((error, index) => (
            <p key={index} className="text-red-500 mt-1">
              {error}
            </p>
          ))}
        </div>

        <div className="mb-4">
          {isResentSuccessCode && verifyUniqueEmail && (
            <p className="text-green-600">Code resent!</p>
          )}

          {!isResentSuccessCode && verifyUniqueEmail && (
            <button
              type="button"
              className="text-blue-600 font-bold hover:underline"
              onClick={updateResendCode}
            >
              Resend Code
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={showTooltip}
          className={`px-4 py-2 bg-blue-600 text-white font-bold rounded w-full ${
            showTooltip ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
          title={showTooltip ? 'Enter a Security Code.' : ''}
        >
          {completeVerifyEmailProg === AppProg.loading
            ? 'Confirming...'
            : 'Confirm Code'}
        </button>

        <hr className="my-8" />

        <h3 className="text-xl font-bold mb-4">Need help?</h3>

        <p>
          Give us a call using the number listed on the back of your Member ID
          card or{' '}
          <a
            href={process.env.NEXT_PUBLIC_PORTAL_CONTACT_US_URL || '#'}
            className="text-blue-600 font-bold hover:underline"
          >
            contact us
          </a>
          .
        </p>
      </form>
    </div>
  );
};
