import React from 'react'
import { cn } from '../../../../../utils/cn'
import { brokerPortalConfig } from '../../config/brokerPortalConfig'

export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Whether to use compact layout */
  compact?: boolean
  /** Custom links to override defaults */
  customLinks?: FooterLink[]
  /** Custom copyright text */
  customCopyright?: string
  /** Custom address text */
  customAddress?: string
  /** Whether to show the logo */
  showLogo?: boolean
  /** Whether to show social links */
  showSocial?: boolean
  /** Additional footer sections */
  additionalSections?: FooterSection[]
}

const defaultLinks: FooterLink[] = [
  { label: 'Sales & Quoting', href: '/broker/sales-quoting' },
  { label: 'Member Services', href: '/broker/member-services' },
  { label: 'Commission Reports', href: '/broker/reporting' },
  { label: 'Marketing Materials', href: '/broker/resources' },
  { label: 'Support Center', href: '/broker/support' },
]

const defaultCopyright = `© ${new Date().getFullYear()} BlueCross BlueShield of Tennessee. All rights reserved.`

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
    const links = customLinks || defaultLinks
    const copyright = customCopyright || defaultCopyright

    if (compact) {
      return (
        <footer
          ref={ref}
          className={cn(
            'bg-tertiary-gray-6 border-t border-tertiary-gray-4 py-4',
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
                <div className="text-xs text-tertiary-gray-3">
                  © {new Date().getFullYear()} BlueCross BlueShield of
                  Tennessee
                </div>
              </div>
              <nav className="flex items-center gap-6">
                {links.map((link: FooterLink, index: number) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-xs text-tertiary-gray-3 hover:text-tertiary-gray-1 transition-colors"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      link.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </footer>
      )
    }

    return (
      <footer
        ref={ref}
        className={cn(
          'bg-tertiary-gray-6 border-t border-tertiary-gray-4',
          compact ? 'py-4' : 'py-8',
          className
        )}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8">
            {/* Logo and Brand */}
            <div className="md:col-span-3 lg:col-span-4">
              {showLogo && (
                <div className="mb-4">
                  <img
                    src={brokerPortalConfig.logo.full}
                    alt={brokerPortalConfig.logo.alt}
                    className={cn('h-8 w-auto', compact && 'h-6')}
                  />
                </div>
              )}
              <p className="text-sm text-tertiary-gray-3 mb-4 max-w-md">
                Your trusted partner for health insurance solutions. Access
                comprehensive broker tools, commission reporting, and member
                services all in one place.
              </p>
              {customAddress && (
                <p className="text-sm text-tertiary-gray-3">{customAddress}</p>
              )}
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 lg:col-span-2">
              <h4 className="text-sm font-semibold text-tertiary-gray-1 uppercase tracking-wide mb-4">
                Quick Links
              </h4>
              <ul className="grid grid-cols-1 gap-2">
                {links.slice(0, Math.ceil(links.length / 2)).map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-tertiary-gray-3 hover:text-tertiary-gray-1 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3 lg:col-span-2">
              <h4 className="text-sm font-semibold text-tertiary-gray-1 uppercase tracking-wide mb-4 md:mt-0 mt-2">
                Resources
              </h4>
              <ul className="grid grid-cols-1 gap-2">
                {links.slice(Math.ceil(links.length / 2)).map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-tertiary-gray-3 hover:text-tertiary-gray-1 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Sections */}
            {additionalSections?.map(section => (
              <div key={section.title} className="md:col-span-3 lg:col-span-2">
                <h4 className="text-sm font-semibold text-tertiary-gray-1 uppercase tracking-wide mb-4">
                  {section.title}
                </h4>
                <ul className="grid grid-cols-1 gap-2">
                  {section.links.map(link => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-tertiary-gray-3 hover:text-tertiary-gray-1 transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Links */}
          {showSocial && (
            <div className="mt-8 pt-8 border-t border-tertiary-gray-4">
              <div className="flex items-center justify-center gap-6">
                <a
                  href="https://www.facebook.com/bcbstn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tertiary-gray-3 hover:text-tertiary-gray-1 transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.twitter.com/bcbstn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tertiary-gray-3 hover:text-tertiary-gray-1 transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          )}

          {/* Copyright */}
          <div
            className={cn(
              'mt-8 pt-8 border-t border-tertiary-gray-4',
              compact && 'mt-4 pt-4'
            )}
          >
            <p className="text-sm text-center text-tertiary-gray-3">
              {copyright}
            </p>
          </div>
        </div>
      </footer>
    )
  }
)

Footer.displayName = 'Footer'

export { Footer }
