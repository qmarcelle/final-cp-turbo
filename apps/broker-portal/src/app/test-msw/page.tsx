'use client'

import React, { useState } from 'react'

interface Member {
  id: string
  firstName: string
  lastName: string
  email: string
  memberId: string
}

export default function TestMSWPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState<string | null>(null)

  const searchMembers = async (query: string) => {
    if (!query.trim()) {
      setMembers([])
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      // This will hit MSW handlers if enabled, or real API if not
      const response = await fetch(`/api/members/search?q=${encodeURIComponent(query)}`)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      setMembers(data.members || [])
    } catch (err) {
      console.error('Search failed:', err)
      setError(err instanceof Error ? err.message : 'Search failed')
      setMembers([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    
    // Simple debounced search
    setTimeout(() => {
      searchMembers(query)
    }, 300)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          MSW Test Page
        </h1>
        <p className="text-gray-600">
          This page tests Mock Service Worker integration.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Member Search</h2>
        
        <div className="mb-6">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Members
          </label>
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Enter member name to search..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-gray-600">Searching...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Search Error</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && members.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Search Results ({members.length})
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
                <div key={member.id} className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {member.firstName} {member.lastName}
                      </h4>
                      <p className="text-sm text-gray-600">{member.email}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        ID: {member.memberId}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && searchQuery && members.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500">
              <h3 className="mt-2 text-sm font-medium text-gray-900">No members found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try searching for a different name.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">MSW Development Tips</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Try searching for &quot;John&quot;, &quot;Jane&quot;, or &quot;test&quot; to see mock data</li>
          <li>• Check browser console for MSW interception logs</li>
          <li>• Network tab shows intercepted requests</li>
          <li>• MSW handlers are defined in @portals/api-client/mocks</li>
        </ul>
      </div>
    </div>
  )
} 