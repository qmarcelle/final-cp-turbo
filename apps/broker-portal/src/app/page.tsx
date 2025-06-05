import { auth } from "../auth"
import Link from 'next/link'

export default async function BrokerWelcomePage() {
  const session = await auth()

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to the Broker Portal
              </h1>
              
              <div className="mb-8">
                <p className="text-lg text-gray-600 mb-2">
                  Hello, <span className="font-medium text-gray-900">{session?.user?.name || 'Broker'}</span>!
                </p>
                <p className="text-gray-500">
                  Are you looking for the dashboard?
                </p>
              </div>

              <div className="space-y-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Go to Dashboard
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                
                <div className="text-sm text-gray-500">
                  Or explore other sections:
                </div>
                
                <div className="flex flex-wrap justify-center gap-2">
                  <Link
                    href="/sales"
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                  >
                    Sales & Quoting
                  </Link>
                  <Link
                    href="/member-support"
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                  >
                    Member Support
                  </Link>
                  <Link
                    href="/reporting"
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                  >
                    Reporting
                  </Link>
                </div>
              </div>

              {session?.user && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    <p>Broker ID: <span className="font-medium text-gray-700">{(session.user as any).brokerId || 'N/A'}</span></p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 