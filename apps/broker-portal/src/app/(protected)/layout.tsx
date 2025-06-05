import React from 'react'
import { redirect } from 'next/navigation'

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
    return { isAuthenticated: true, user: { name: 'Dev User', role: 'broker' } }
  }

  // AuthJS integration will look like:
  // const session = await auth();
  // if (!session?.user) { redirect('/login'); }
  // return { isAuthenticated: true, user: session.user };

  // For now, we'll simulate AuthJS session structure
  return { isAuthenticated: true, user: { name: 'Test User', role: 'broker' } }
}

/**
 * Protected routes layout with navigation and user management
 * All routes in this group require authentication
 */
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await validateSession()

  if (!session.isAuthenticated) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  Broker Portal
                </h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a
                  href="/dashboard"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Dashboard
                </a>
                <a
                  href="/sales"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Sales
                </a>
                <a
                  href="/member-support"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Member Support
                </a>
                <a
                  href="/reporting"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Reporting
                </a>
                <a
                  href="/materials-library"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Materials
                </a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="relative ml-3">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">
                    {session.user?.name}
                  </span>
                  <a
                    href="/profile"
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Profile
                  </a>
                  <a
                    href="/login"
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}
