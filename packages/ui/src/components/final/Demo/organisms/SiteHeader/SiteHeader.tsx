import React, { useState } from 'react'
import { cn } from '../../../../../utils/cn'
import { Button } from '../../atoms/Button/Button'

export interface NavigationItem {
  id: number
  title: string
  url: string
  childPages?: Array<{
    id: number
    title: string
    description?: string
    url: string
  }>
}

export interface User {
  name: string
  email: string
  role: string
  agency: string
}

export interface SiteHeaderProps {
  /** Current user information */
  user?: User
  /** Current active navigation path */
  activePath?: string
  /** Custom className */
  className?: string
  /** Navigation items */
  navigationItems?: NavigationItem[]
  /** Mobile menu state */
  showMobileMenu?: boolean
  /** Mobile menu toggle callback */
  onMobileMenuToggle?: () => void
}

const defaultNavigationItems: NavigationItem[] = [
  {
    id: 1,
    title: 'Sales & Quoting',
    url: '/sales-quoting',
    childPages: [
      {
        id: 11,
        title: 'Quick Quote',
        description: 'Generate instant quotes',
        url: '/sales-quoting/quick-quote',
      },
      {
        id: 12,
        title: 'Group Quotes',
        description: 'Employer group quotes',
        url: '/sales-quoting/group-quotes',
      },
    ],
  },
  {
    id: 2,
    title: 'Member Support',
    url: '/member-support',
    childPages: [
      {
        id: 21,
        title: 'Member Search',
        description: 'Find and manage members',
        url: '/member-support/search',
      },
      {
        id: 22,
        title: 'Claims',
        description: 'View and manage claims',
        url: '/member-support/claims',
      },
    ],
  },
  {
    id: 3,
    title: 'Reporting',
    url: '/reporting',
    childPages: [
      {
        id: 31,
        title: 'Commission Reports',
        description: 'View commission details',
        url: '/reporting/commission',
      },
      {
        id: 32,
        title: 'Book of Business',
        description: 'Business overview',
        url: '/reporting/book-of-business',
      },
    ],
  },
  {
    id: 4,
    title: 'Materials & Forms',
    url: '/materials-forms',
    childPages: [
      {
        id: 41,
        title: 'Marketing Materials',
        description: 'Access marketing resources',
        url: '/materials-forms/marketing',
      },
      {
        id: 42,
        title: 'Forms Library',
        description: 'Download forms',
        url: '/materials-forms/forms',
      },
    ],
  },
  {
    id: 5,
    title: 'Learning Center',
    url: '/learning-center',
    childPages: [
      {
        id: 51,
        title: 'Training',
        description: 'Access training materials',
        url: '/learning-center/training',
      },
      {
        id: 52,
        title: 'Resources',
        description: 'Helpful resources',
        url: '/learning-center/resources',
      },
    ],
  },
]

const SiteHeader = React.forwardRef<HTMLElement, SiteHeaderProps>(
  (
    {
      user,
      activePath = '',
      className,
      navigationItems = defaultNavigationItems,
      showMobileMenu = false,
      onMobileMenuToggle,
      ...props
    },
    ref
  ) => {
    const [showNavDropdown, setShowNavDropdown] = useState<string | null>(null)
    const [showUserMenu, setShowUserMenu] = useState(false)

    const isActivePath = (path: string) => {
      return activePath === path || activePath.startsWith(path + '/')
    }

    const NavDropdown = ({ item }: { item: NavigationItem }) => {
      if (!item.childPages?.length) return null

      return (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-2">
            {item.childPages.map(child => (
              <a
                key={child.id}
                href={child.url}
                className="block p-3 hover:bg-gray-50 rounded-md transition-colors"
              >
                <div className="font-medium text-sm text-gray-900">
                  {child.title}
                </div>
                {child.description && (
                  <div className="text-xs text-gray-500 mt-1">
                    {child.description}
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      )
    }

    const UserMenu = () => (
      <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
        <div className="p-2">
          <a
            href="/profile"
            className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
          >
            Profile Settings
          </a>
          <a
            href="/preferences"
            className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
          >
            Preferences
          </a>
          <div className="border-t border-gray-100 mt-2 pt-2">
            <button
              className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => {
                /* Handle sign out */
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    )

    return (
      <header
        ref={ref}
        className={cn(
          'bg-white border-b border-gray-200 sticky top-0 z-40 py-4',
          className
        )}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Navigation */}
            <div className="flex items-center gap-8">
              <a href="/" className="flex-shrink-0">
                <img
                  src="/assets/logos/bcbst_blue.svg"
                  alt="BlueCross BlueShield of Tennessee"
                  className="h-8 w-auto"
                />
              </a>

              {/* Main Navigation */}
              <nav className="hidden lg:flex items-center space-x-6">
                {navigationItems.map(item => (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setShowNavDropdown(item.id.toString())}
                    onMouseLeave={() => setShowNavDropdown(null)}
                  >
                    <a
                      href={item.url}
                      className={cn(
                        'px-1 py-2 text-sm font-medium transition-colors relative group',
                        isActivePath(item.url)
                          ? 'text-blue-700'
                          : 'text-gray-600 hover:text-gray-900'
                      )}
                    >
                      {item.title}
                      <div
                        className={cn(
                          'absolute bottom-0 left-0 w-full h-0.5 transition-colors',
                          isActivePath(item.url)
                            ? 'bg-blue-700'
                            : 'bg-transparent group-hover:bg-gray-200'
                        )}
                      />
                    </a>
                    {showNavDropdown === item.id.toString() && (
                      <NavDropdown item={item} />
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-6">
              {/* Search */}
              <div className="relative hidden md:block">
                <div className="flex items-center">
                  <input
                    type="search"
                    placeholder="Search"
                    className="w-64 px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2"
                    aria-label="Search"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Support */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center gap-2 text-blue-700"
                aria-label="Support"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Support</span>
              </Button>

              {/* User Profile */}
              {user && (
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <div className="text-right">
                      <div className="text-sm text-gray-500">My Profile:</div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                    </div>
                  </Button>
                  {showUserMenu && <UserMenu />}
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={onMobileMenuToggle}
                aria-label="Toggle mobile menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {showMobileMenu ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
              <nav className="mt-4 space-y-1">
                {navigationItems.map(item => (
                  <div key={item.id}>
                    <a
                      href={item.url}
                      className={cn(
                        'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                        isActivePath(item.url)
                          ? 'text-blue-700 bg-blue-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      )}
                    >
                      {item.title}
                    </a>
                    {item.childPages && item.childPages.length > 0 && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.childPages.map(child => (
                          <a
                            key={child.id}
                            href={child.url}
                            className="block px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                          >
                            {child.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile Search */}
              <div className="mt-4 px-3">
                <div className="flex items-center">
                  <input
                    type="search"
                    placeholder="Search"
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2"
                    aria-label="Search"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    )
  }
)

SiteHeader.displayName = 'SiteHeader'

export { SiteHeader }
