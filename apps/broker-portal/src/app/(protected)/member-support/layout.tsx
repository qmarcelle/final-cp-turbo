import React from 'react'
import Link from 'next/link'

/**
 * Layout wrapper for member support section
 * Provides consistent structure and navigation for member-related tools
 */
export default function MemberSupportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Member Support</h1>
        <p className="mt-2 text-sm text-gray-600">
          Tools and resources for managing member accounts and support requests
        </p>
      </div>

      <nav className="flex space-x-6 border-b border-gray-200">
        <Link
          href="/member-support/member-search"
          className="border-b-2 border-transparent hover:border-gray-300 pb-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Member Search
        </Link>
        <Link
          href="/member-support/id-cards"
          className="border-b-2 border-transparent hover:border-gray-300 pb-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          ID Cards
        </Link>
        <Link
          href="/member-support/employer-group"
          className="border-b-2 border-transparent hover:border-gray-300 pb-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Groups
        </Link>
        <Link
          href="/member-support/individual"
          className="border-b-2 border-transparent hover:border-gray-300 pb-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Individual
        </Link>
        <Link
          href="/member-support/medicare-advantage"
          className="border-b-2 border-transparent hover:border-gray-300 pb-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Medicare Advantage
        </Link>
      </nav>

      {children}
    </section>
  )
}
