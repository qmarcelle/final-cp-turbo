'use client';

import { FormEvent, useState } from 'react';
import { checkEmailUniqueness } from '../services/emailUniqueness';
import {
  useVerifyEmailStore,
  VerifyEmailStore,
} from '../stores/verifyEmailStore';

/**
 * Props for the EmailUniquenessVerification component
 */
export interface EmailUniquenessVerificationProps {
  /**
   * Custom class name for styling
   */
  className?: string;

  /**
   * Callback when email is verified as unique
   */
  onSuccess?: (email: string) => void;

  /**
   * Callback when email is not unique
   */
  onDuplicate?: (email: string) => void;

  /**
   * Callback when verification fails
   */
  onError?: (error: string) => void;
}

/**
 * Component for verifying if an email is unique before registration
 */
export const EmailUniquenessVerification = ({
  className,
  onSuccess,
  onDuplicate,
  onError,
}: EmailUniquenessVerificationProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const updateEmailId = useVerifyEmailStore(
    (state: VerifyEmailStore) => state.updateEmailId,
  );
  const updateInteractionData = useVerifyEmailStore(
    (state: VerifyEmailStore) => state.updateInteractionData,
  );

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await checkEmailUniqueness({ email });

      if (response.status === 'UNIQUE') {
        // Update store with email and interaction data
        updateEmailId(email);

        if (response.interactionId && response.interactionToken) {
          updateInteractionData(
            response.interactionId,
            response.interactionToken,
          );
        }

        if (onSuccess) {
          onSuccess(email);
        }
      } else if (response.status === 'DUPLICATE') {
        if (onDuplicate) {
          onDuplicate(email);
        } else {
          setErrorMessage(
            'This email is already registered. Please use a different email or sign in.',
          );
        }
      } else {
        throw new Error(response.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Email uniqueness check failed:', error);
      const errorMsg =
        error instanceof Error ? error.message : 'An error occurred';

      setErrorMessage('Could not verify email uniqueness. Please try again.');

      if (onError) {
        onError(errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>

        <p className="mb-6">
          Please provide your email address. We&apos;ll send a verification code
          to this email.
        </p>

        <div className="mb-4">
          <label className="block mb-2 font-medium" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 border rounded-md ${
              errorMessage ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="your.email@example.com"
            required
          />

          {errorMessage && <p className="text-red-500 mt-1">{errorMessage}</p>}
        </div>

        <button
          type="submit"
          disabled={!email || isLoading}
          className={`px-4 py-2 bg-blue-600 text-white font-bold rounded w-full ${
            !email || isLoading
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Verifying...' : 'Continue'}
        </button>
      </form>
    </div>
  );
};
