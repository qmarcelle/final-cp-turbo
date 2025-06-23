import React from 'react';
import { cn } from '../../../../../utils/cn';
import { brokerPortalConfig } from '../../config/brokerPortalConfig';

export interface FooterProps {
  /** Custom className */
  className?: string;
  /** Whether to show the compact version */
  compact?: boolean;
  /** Custom footer links (overrides config) */
  customLinks?: Array<{
    title: string;
    url: string;
    external?: boolean;
  }>;
  /** Custom copyright text (overrides config) */
  customCopyright?: string;
  /** Custom address (overrides config) */
  customAddress?: string;
  /** Whether to show the logo */
  showLogo?: boolean;
  /** Whether to show social links */
  showSocial?: boolean;
  /** Additional footer sections */
  additionalSections?: React.ReactNode;
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      className,
      compact = false,
      customLinks,
      customCopyright,
      customAddress,
      showLogo = true,
      showSocial = false,
      additionalSections,
      ...props
    },
    ref
  ) => {
    const currentYear = new Date().getFullYear();
    const copyrightText = customCopyright || brokerPortalConfig.footer.copyrightText.replace('[YEAR]', currentYear.toString());
    const address = customAddress || brokerPortalConfig.footer.address;
    const links = customLinks || brokerPortalConfig.footer.links;

    if (compact) {
      return (
        <footer
          ref={ref}
          className={cn(
            'bg-gray-50 border-t border-gray-200 py-4',
            className
          )}
          {...props}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {showLogo && (
                  <img
                    src={brokerPortalConfig.logo.stacked}
                    alt={brokerPortalConfig.logo.alt}
                    className="h-6 w-auto"
                  />
                )}
                <div className="text-xs text-gray-500">
                  © {currentYear} BlueCross BlueShield of Tennessee
                </div>
              </div>
              <nav className="flex items-center gap-4">
                {links.map((link: { title: string; url: string; external?: boolean }, index: number) => (
                  <a
                    key={index}
                    href={link.url}
                    className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                    target={link.url.startsWith('http') ? '_blank' : undefined}
                    rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {link.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </footer>
      );
    }

    return (
      <footer
        ref={ref}
        className={cn(
          'bg-white border-t border-gray-200',
          className
        )}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Logo and Brand */}
            <div className="lg:col-span-2">
              {showLogo && (
                <div className="mb-4">
                  <img
                    src={brokerPortalConfig.logo.full}
                    alt={brokerPortalConfig.logo.alt}
                    className="h-8 w-auto"
                  />
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {brokerPortalConfig.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4 max-w-md">
                Your trusted partner for health insurance solutions. Access comprehensive 
                broker tools, commission reporting, and member services all in one place.
              </p>
              {address && (
                <p className="text-sm text-gray-500">
                  {address}
                </p>
              )}
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                Quick Links
              </h4>
              <nav className="space-y-2">
                <a
                  href="/broker/sales-quoting"
                  className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Sales & Quoting
                </a>
                <a
                  href="/broker/member-services"
                  className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Member Services
                </a>
                <a
                  href="/broker/reporting"
                  className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Commission Reports
                </a>
                <a
                  href="/broker/resources"
                  className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Marketing Materials
                </a>
                <a
                  href="/broker/support"
                  className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Support Center
                </a>
              </nav>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                Resources
              </h4>
              <nav className="space-y-2">
                <a
                  href="/broker/training-center"
                  className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Training Center
                </a>
                <a
                  href="/broker/product-information"
                  className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Product Information
                </a>
                <a
                  href="/broker/forms-documents"
                  className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Forms & Documents
                </a>
                <a
                  href="/broker/news-updates"
                  className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  News & Updates
                </a>
                <a
                  href="/broker/contact-us"
                  className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Contact Us
                </a>
              </nav>
            </div>
          </div>

          {/* Additional Sections */}
          {additionalSections && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              {additionalSections}
            </div>
          )}

          {/* Social Links */}
          {showSocial && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-6">
                <a
                  href="https://www.facebook.com/bcbstn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://www.twitter.com/bcbstn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/bcbstn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          )}

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-500 text-center md:text-left">
                {copyrightText}
              </div>
              <nav className="flex items-center gap-6">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                    target={link.url.startsWith('http') ? '_blank' : undefined}
                    rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {link.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';

export { Footer };