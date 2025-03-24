'use client';

import { LoginErrorTemplate } from './LoginErrorTemplate';

/**
 * Props for the LoginGenericErrorComponent
 */
export interface LoginGenericErrorComponentProps {
  /**
   * Custom class name for styling
   */
  className?: string;
}

/**
 * Component for displaying generic login errors
 */
export const LoginGenericErrorComponent = ({
  className,
}: LoginGenericErrorComponentProps) => {
  return (
    <LoginErrorTemplate
      className={className}
      label="Login Error"
      body={
        <div className="flex flex-col items-center">
          <p className="text-center mb-8">
            Oops! We&apos;re sorry. Something went wrong. Please try again.
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
