'use client';

import { LoginErrorTemplate } from './LoginErrorTemplate';

/**
 * Props for the MFASecurityCodeMultipleAttemptComponent
 */
export interface MFASecurityCodeMultipleAttemptComponentProps {
  /**
   * Custom class name for styling
   */
  className?: string;
}

/**
 * Component for displaying errors when there are too many MFA security code attempts
 */
export const MFASecurityCodeMultipleAttemptComponent = ({
  className,
}: MFASecurityCodeMultipleAttemptComponentProps) => {
  return (
    <LoginErrorTemplate
      className={className}
      label="Too Many Login Attempts"
      body={
        <div className="flex flex-col items-center">
          <p className="text-center mb-8">
            You have tried the security code too many times. Please wait 10
            minutes to try again.
          </p>

          <hr className="w-full border-t border-gray-300 my-8" />

          <h3 className="text-xl font-bold mb-4 text-center">Need help?</h3>
        </div>
      }
      bottomNote="Give us a call using the number listed on the back of your Member ID card or"
      contactUs="contact us."
    />
  );
};
