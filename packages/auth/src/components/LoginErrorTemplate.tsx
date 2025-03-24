'use client';

import { ReactElement } from 'react';

/**
 * Props for the LoginErrorTemplate component
 */
export interface LoginErrorTemplateProps {
  /**
   * Error title/label
   */
  label: string;

  /**
   * React element for the error body content
   */
  body: ReactElement;

  /**
   * Text that appears before the contact us link
   */
  bottomNote: string;

  /**
   * Text for the contact us link
   */
  contactUs: string;

  /**
   * Custom class name for styling
   */
  className?: string;
}

/**
 * Generic template for displaying login-related errors
 */
export const LoginErrorTemplate = ({
  label,
  body,
  bottomNote,
  contactUs,
  className,
}: LoginErrorTemplateProps) => {
  // Function to track analytics for contact us link
  const trackContactUsAnalytics = () => {
    // Analytics tracking would be implemented here
    console.log('Contact us link clicked');
  };

  return (
    <article className={`max-w-2xl mx-auto ${className || ''}`}>
      <div className="flex flex-col items-center">
        <div className="my-8">
          {/* Alert icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-600"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center">{label}</h2>

        <div className="mb-4">{body}</div>

        <footer className="mt-4 text-center">
          <p>
            {bottomNote}{' '}
            <a
              className="text-blue-600 font-bold hover:underline"
              href={process.env.NEXT_PUBLIC_PORTAL_CONTACT_US_URL || '#'}
              onClick={trackContactUsAnalytics}
            >
              {contactUs}
            </a>
          </p>
        </footer>
      </div>
    </article>
  );
};
