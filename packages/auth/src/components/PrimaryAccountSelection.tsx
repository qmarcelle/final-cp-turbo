'use client';

import { FormEvent, useState } from 'react';
import {
  PrimaryAccountSelectionState,
  usePrimaryAccountSelectionStore,
} from '../stores';
import { useLoginStore } from '../stores/loginStore';
import { AppProg } from '../types/app';

/**
 * Props for the PrimaryAccountSelection component
 */
export interface PrimaryAccountSelectionProps {
  /**
   * Custom class name for styling
   */
  className?: string;
}

/**
 * Primary Account Selection Component
 *
 * Used when a user needs to select their primary account from multiple accounts
 */
export const PrimaryAccountSelection = ({
  className,
}: PrimaryAccountSelectionProps) => {
  const username = useLoginStore((state) => state.username);
  const resetToHome = useLoginStore((state) => state.resetToHome);
  const [isChecked, setIsChecked] = useState(false);

  const { continueWithUsernameProg, submitPrimaryAccountSelection } =
    usePrimaryAccountSelectionStore((state: PrimaryAccountSelectionState) => ({
      continueWithUsernameProg: state.continueWithUsernameProg,
      submitPrimaryAccountSelection: state.submitPrimaryAccountSelection,
    }));

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isChecked) {
      submitPrimaryAccountSelection(e);
    }
  };

  const isLoading = continueWithUsernameProg === AppProg.loading;
  const isSuccess = continueWithUsernameProg === AppProg.success;

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">
          You&apos;ll be able to access all of your plans in one place.
        </h2>

        <div className="flex flex-row mb-4">
          <p className="text-base">
            First, let&apos;s confirm the username and password you will use
            from now on.
          </p>
          <div
            className="relative ml-2 cursor-help"
            title="You have more than one account login. To make switching between your plans easier, we are going to prioritize one login over others. The username you confirm on this page will become your only username and password for all your BlueCross BlueShield of Tennessee registered accounts moving forward. Your login can be used for both the BlueCross website and mobile apps."
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="8"></line>
            </svg>
          </div>
        </div>

        <div className="p-4 border rounded-md shadow-md mb-4">
          <p className="text-base">Username:</p>
          <p className="text-base font-bold">{username}</p>
        </div>

        <div className="mb-4">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="mt-1 mr-2"
            />
            <span>
              <strong>I understand </strong>
              the username listed above and its password will be the only login
              credentials for
              <strong>
                {' '}
                all my BlueCross BlueShield of Tennessee registered
                accounts{' '}
              </strong>
              moving forward.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={!isChecked || isLoading || isSuccess}
          className={`px-4 py-2 bg-blue-600 text-white font-bold rounded ${
            !isChecked || isLoading || isSuccess
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-blue-700'
          }`}
          title={!isChecked ? 'Check the box above to continue.' : ''}
        >
          {isLoading || isSuccess
            ? 'Continuing...'
            : 'Continue With This Username'}
        </button>

        <hr className="my-6" />

        <h3 className="text-xl font-bold mb-2">
          Want to use a different username?
        </h3>
        <p className="mb-4">
          Go{' '}
          <button
            type="button"
            className="text-blue-600 font-bold hover:underline"
            onClick={resetToHome}
          >
            back to the login page
          </button>{' '}
          and sign in with the username and password you want to use.
        </p>

        <h3 className="text-xl font-bold mb-2">Need help?</h3>
        <p>
          Give us a call using the number listed on the back of your Member ID
          card or{' '}
          <a
            href={process.env.NEXT_PUBLIC_PORTAL_CONTACT_US_URL || '#'}
            className="text-blue-600 font-bold hover:underline"
          >
            contact us
          </a>
        </p>
      </form>
    </div>
  );
};
