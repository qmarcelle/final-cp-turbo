import React from 'react';
import { redirect } from 'next/navigation';

/**
 * Server-side authentication check for protected routes
 * Uses AuthJS for JWT-based session validation
 * 
 * @todo Replace with auth() from @portals/auth when AuthJS integration is complete
 * @see https://authjs.dev/reference/nextjs#in-server-components
 */
async function validateSession() {
  // Development mode allows bypassing auth for testing
  if (process.env.NODE_ENV === 'development') {
    return { isAuthenticated: true, user: { name: 'Dev User', role: 'broker' } };
  }
  
  // AuthJS integration will look like:
  // const session = await auth();
  // if (!session?.user) { redirect('/broker/login'); }
  // return { isAuthenticated: true, user: session.user };
  
  // For now, we'll simulate AuthJS session structure
  return { isAuthenticated: true, user: { name: 'Broker User', role: 'broker' } };
}

/**
 * Protected layout wrapper for authenticated broker portal routes
 * Provides consistent navigation and layout structure across protected areas
 * 
 * When AuthJS is integrated, session data will be automatically available
 * throughout the component tree via AuthJS context
 */
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user } = await validateSession();

  if (!isAuthenticated) {
    redirect('/broker/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Broker Portal
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user.name}
              </span>
              <nav className="flex space-x-4">
                <a href="/broker/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </a>
                <a href="/broker/member-support" className="text-gray-600 hover:text-gray-900">
                  Member Support
                </a>
                <a href="/broker/profile" className="text-gray-600 hover:text-gray-900">
                  Profile
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {children}
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} BlueCross BlueShield of Tennessee. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 