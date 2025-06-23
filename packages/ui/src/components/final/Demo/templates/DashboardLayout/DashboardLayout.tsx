import React from 'react';
import { cn } from '../../../../../utils/cn';
import { SiteHeader, User } from '../../organisms/SiteHeader/SiteHeader';
import { Footer } from '../../organisms/Footer/Footer';

export interface DashboardLayoutProps {
  /** Page title */
  title?: string;
  /** Page subtitle or description */
  subtitle?: string;
  /** Current user information */
  user?: User;
  /** Main content */
  children: React.ReactNode;
  /** Sidebar content */
  sidebar?: React.ReactNode;
  /** Whether to show the sidebar */
  showSidebar?: boolean;
  /** Custom header content */
  headerContent?: React.ReactNode;
  /** Custom footer content */
  footerContent?: React.ReactNode;
  /** Whether to use compact layout */
  compact?: boolean;
  /** Whether to show breadcrumbs */
  showBreadcrumbs?: boolean;
  /** Breadcrumb items */
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
  /** Page actions (buttons, etc.) */
  actions?: React.ReactNode;
  /** Current active path for navigation */
  activePath?: string;
  /** Custom className */
  className?: string;
  /** Whether to show notifications */
  showNotifications?: boolean;
  /** Number of unread notifications */
  notificationCount?: number;
  /** Loading state */
  loading?: boolean;
  /** Error state */
  error?: string;
}

const DashboardLayout = React.forwardRef<HTMLDivElement, DashboardLayoutProps>(
  (
    {
      title,
      subtitle,
      user,
      children,
      sidebar,
      showSidebar = false,
      headerContent,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      footerContent,
      compact = false,
      showBreadcrumbs = false,
      breadcrumbs = [],
      actions,
      activePath,
      className,
      showNotifications = true,
      notificationCount = 0,
      loading = false,
      error,
      ...props
    },
    ref
  ) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const Breadcrumbs = () => {
      if (!showBreadcrumbs || breadcrumbs.length === 0) return null;

      return (
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {breadcrumbs.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-sm text-gray-900 font-medium">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      );
    };

    const PageHeader = () => {
      if (!title && !subtitle && !actions && !headerContent) return null;

      return (
        <div className={cn('mb-6', compact && 'mb-4')}>
          <Breadcrumbs />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              {title && (
                <h1 className={cn(
                  'font-bold text-gray-900',
                  compact ? 'text-xl' : 'text-2xl lg:text-3xl'
                )}>
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
              )}
            </div>
            {actions && (
              <div className="flex items-center gap-2">
                {actions}
              </div>
            )}
          </div>
          {headerContent && (
            <div className="mt-4">
              {headerContent}
            </div>
          )}
        </div>
      );
    };

    const Sidebar = () => {
      if (!showSidebar || !sidebar) return null;

      return (
        <>
          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          {/* Sidebar */}
          <aside className={cn(
            'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:translate-x-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}>
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-4">
                {sidebar}
              </div>
            </div>
          </aside>
        </>
      );
    };

    const LoadingState = () => (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );

    const ErrorState = () => (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );

    return (
      <div ref={ref} className={cn('min-h-screen flex flex-col', className)} {...props}>
        {/* Header */}
        <SiteHeader
          user={user}
          activePath={activePath}
          showNotifications={showNotifications}
          notificationCount={notificationCount}
          compact={compact}
          onMobileMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          showMobileMenu={sidebarOpen}
        />

        {/* Main Layout */}
        <div className="flex flex-1">
          <Sidebar />
          
          {/* Main Content */}
          <main className={cn(
            'flex-1 bg-gray-50',
            showSidebar && 'lg:ml-0' // Sidebar is handled by flex layout
          )}>
            <div className={cn(
              'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
              compact ? 'py-4' : 'py-6 lg:py-8'
            )}>
              <PageHeader />
              
              {/* Content Area */}
              <div className="relative">
                {loading ? (
                  <LoadingState />
                ) : error ? (
                  <ErrorState />
                ) : (
                  children
                )}
              </div>
            </div>
          </main>
        </div>

        {/* Footer */}
        <Footer compact={compact} />
      </div>
    );
  }
);

DashboardLayout.displayName = 'DashboardLayout';

export { DashboardLayout };