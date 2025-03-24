'use client';

import { LoginErrorTemplate } from './LoginErrorTemplate';

/**
 * Props for the MultipleAttemptsErrorComponent
 */
export interface MultipleAttemptsErrorComponentProps {
  /**
   * Custom class name for styling
   */
  className?: string;

  /**
   * URL for password reset
   */
  passwordResetUrl?: string;
}

/**
 * Component for displaying errors when there are too many login attempts
 */
export const MultipleAttemptsErrorComponent = ({
  className,
  passwordResetUrl = process.env.NEXT_PUBLIC_PASSWORD_RESET || '#',
}: MultipleAttemptsErrorComponentProps) => {
  return (
    <LoginErrorTemplate
      className={className}
      label="Too Many Login Attempts"
      body={
        <div className="flex flex-col items-center">
          <p className="text-center mb-8">
            You have attempted to log in too many times. Please wait 10 minutes
            to try again.
          </p>

          <a
            href={passwordResetUrl}
            className="self-start text-blue-600 font-bold hover:underline"
          >
            Forgot Username/Password?
          </a>

          <hr className="w-full border-t border-gray-300 my-8" />

          <h3 className="text-xl font-bold mb-4 text-center">Need help?</h3>
        </div>
      }
      bottomNote="Give us a call using the number listed on the back of your Member ID card or"
      contactUs="contact us."
    />
  );
};
