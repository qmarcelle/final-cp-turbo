'use client' // Error components must be Client Components

import { useEffect } from 'react'

interface MemberDetailErrorProps {
  error: Error & { digest?: string }
  reset: () => void
  params?: { memberId?: string }
}

/**
 * Error boundary for member detail pages
 * Provides user-friendly error messages and recovery options
 */
export default function MemberDetailError({
  error,
  reset,
  params,
}: MemberDetailErrorProps) {
  useEffect(() => {
    // Log error for monitoring and debugging
    console.error(`[MemberDetail] Error loading member ${params?.memberId}:`, {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    })
  }, [error, params?.memberId])

  return (
    <div className="min-h-96 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 15.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Unable to Load Member Details
          </h2>

          <p className="text-gray-600 mb-6">
            We encountered an issue while loading information for member{' '}
            {params?.memberId ? `ID: ${params.memberId}` : 'this member'}.
          </p>

          <div className="space-y-3">
            <button
              onClick={reset}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try Again
            </button>

            <a
              href="/member-support/member-search"
              className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors text-center"
            >
              Back to Member Search
            </a>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                Error Details (Development)
              </summary>
              <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto text-left">
                {error.message}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  )
}
