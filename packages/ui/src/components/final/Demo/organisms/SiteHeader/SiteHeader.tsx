import React, { useState } from 'react';
import { cn } from '../../../../../utils/cn';
import { brokerPortalConfig, type NavigationItem } from '../../config/brokerPortalConfig';
import { Button } from '../../atoms/Button/Button';
import { Badge } from '../../atoms/Badge/Badge';

export interface User {
  name: string;
  email: string;
  avatar?: string;
  role: string;
  agency?: string;
}

export interface SiteHeaderProps {
  /** Current user information */
  user?: User;
  /** Whether to show the mobile menu */
  showMobileMenu?: boolean;
  /** Callback when mobile menu is toggled */
  onMobileMenuToggle?: () => void;
  /** Current active navigation path */
  activePath?: string;
  /** Whether to show notifications */
  showNotifications?: boolean;
  /** Number of unread notifications */
  notificationCount?: number;
  /** Custom className */
  className?: string;
  /** Whether to use compact layout */
  compact?: boolean;
  /** Custom navigation items (overrides default config) */
  navigationItems?: NavigationItem[];
}

const SiteHeader = React.forwardRef<HTMLElement, SiteHeaderProps>(
  (
    {
      user,
      showMobileMenu = false,
      onMobileMenuToggle,
      activePath = '',
      showNotifications = true,
      notificationCount = 0,
      className,
      compact = false,
      navigationItems = brokerPortalConfig.navigation,
      ...props
    },
    ref
  ) => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showNavDropdown, setShowNavDropdown] = useState<string | null>(null);

    const isActivePath = (path: string) => {
      return activePath === path || activePath.startsWith(path + '/');
    };

    const NavDropdown = ({ item }: { item: NavigationItem }) => {
      if (!item.childPages || item.childPages.length === 0) return null;

      return (
        <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4">
            {item.template && (
              <div className="grid grid-cols-3 gap-4 mb-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
                <div>{item.template.secondCol}</div>
                <div>{item.template.thirdCol}</div>
                <div>{item.template.fourthCol}</div>
              </div>
            )}
            <div className="grid grid-cols-3 gap-4">
              {item.childPages.map((child) => (
                <a
                  key={child.id}
                  href={child.url}
                  className="block p-2 rounded-md hover:bg-gray-50 transition-colors"
                  target={child.openInNewWindow ? '_blank' : undefined}
                  rel={child.openInNewWindow ? 'noopener noreferrer' : undefined}
                >
                  <div className="font-medium text-sm text-gray-900">{child.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{child.description}</div>
                </a>
              ))}
            </div>
            {item.shortLinks && item.shortLinks.length > 0 && (
              <div className="border-t pt-4 mt-4">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Quick Links
                </div>
                <div className="space-y-1">
                  {item.shortLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.link}
                      className="block text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {link.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    };

    const UserMenu = () => (
      <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
              ) : (
                <span className="text-sm font-medium text-blue-700">
                  {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-gray-900 truncate">{user?.name}</div>
              <div className="text-xs text-gray-500 truncate">{user?.email}</div>
              {user?.agency && (
                <div className="text-xs text-gray-500 truncate">{user.agency}</div>
              )}
            </div>
          </div>
        </div>
        <div className="p-2">
          <a
            href="/broker/profile"
            className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
          >
            Profile Settings
          </a>
          <a
            href="/broker/preferences"
            className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
          >
            Preferences
          </a>
          <a
            href="/broker/support"
            className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
          >
            Support
          </a>
          <div className="border-t border-gray-100 mt-2 pt-2">
            <button
              className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => {/* Handle sign out */}}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );

    return (
      <header
        ref={ref}
        className={cn(
          'bg-white border-b border-gray-200 sticky top-0 z-40',
          compact && 'py-2',
          !compact && 'py-4',
          className
        )}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <img
                  src={brokerPortalConfig.logo.full}
                  alt={brokerPortalConfig.logo.alt}
                  className={cn(
                    'h-8 w-auto',
                    compact && 'h-6'
                  )}
                />
                <div className="hidden md:block">
                  <span className="text-lg font-semibold text-gray-900">
                    {brokerPortalConfig.name}
                  </span>
                </div>
              </div>

              {/* Main Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navigationItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setShowNavDropdown(item.id.toString())}
                    onMouseLeave={() => setShowNavDropdown(null)}
                  >
                    <a
                      href={item.url}
                      className={cn(
                        'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        isActivePath(item.url)
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      )}
                    >
                      {item.title}
                    </a>
                    {showNavDropdown === item.id.toString() && (
                      <NavDropdown item={item} />
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              {showNotifications && (
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative p-2"
                    aria-label="Notifications"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                    {notificationCount > 0 && (
                      <Badge
                        variant="error"
                        className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 text-xs"
                      >
                        {notificationCount > 99 ? '99+' : notificationCount}
                      </Badge>
                    )}
                  </Button>
                </div>
              )}

              {/* User Menu */}
              {user && (
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 p-2"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    aria-label="User menu"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                      ) : (
                        <span className="text-sm font-medium text-blue-700">
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.role}</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Button>
                  {showUserMenu && <UserMenu />}
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2"
                onClick={onMobileMenuToggle}
                aria-label="Toggle mobile menu"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  {showMobileMenu ? (
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  )}
                </svg>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
              <nav className="mt-4 space-y-1">
                {navigationItems.map((item) => (
                  <div key={item.id}>
                    <a
                      href={item.url}
                      className={cn(
                        'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                        isActivePath(item.url)
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      )}
                    >
                      {item.title}
                    </a>
                    {item.childPages && item.childPages.length > 0 && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.childPages.map((child) => (
                          <a
                            key={child.id}
                            href={child.url}
                            className="block px-3 py-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            {child.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    );
  }
);

SiteHeader.displayName = 'SiteHeader';

export { SiteHeader };