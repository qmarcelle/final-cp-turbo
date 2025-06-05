import { auth, signOut } from "../../../auth"
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await auth()

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Broker Portal Dashboard
            </h1>
            
            {session ? (
              <div className="space-y-8">
                {/* Authentication Status */}
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <h2 className="text-lg font-medium text-green-800 mb-3">
                    ✅ Welcome, {(session.user as any).brokerName}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-sm text-green-700">
                    <span><strong>Broker ID:</strong> {(session.user as any).brokerId}</span>
                    <span><strong>Email:</strong> {session.user.email}</span>
                    <form
                      action={async () => {
                        "use server"
                        await signOut({ redirectTo: "/login" })
                      }}
                      className="inline"
                    >
                      <button
                        type="submit"
                        className="text-green-600 hover:text-green-800 underline text-sm"
                      >
                        🚪 Sign Out
                      </button>
                    </form>
                  </div>
                </div>

                {/* Main Navigation */}
                <div>
                  <nav aria-labelledby="main-navigation">
                    <h2 id="main-navigation" className="text-xl font-semibold text-gray-900 mb-4">
                      Main Navigation
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Link href="/reporting" className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
                        <div className="flex items-center">
                          <div className="text-blue-600 mr-3">📊</div>
                          <div>
                            <h3 className="font-medium text-blue-900">Reporting</h3>
                            <p className="text-sm text-blue-700">View reports and analytics</p>
                          </div>
                        </div>
                      </Link>

                      <Link href="/member-support" className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
                        <div className="flex items-center">
                          <div className="text-green-600 mr-3">🏥</div>
                          <div>
                            <h3 className="font-medium text-green-900">Member Support</h3>
                            <p className="text-sm text-green-700">Assist members with queries</p>
                          </div>
                        </div>
                      </Link>

                      <Link href="/sales" className="block p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors">
                        <div className="flex items-center">
                          <div className="text-purple-600 mr-3">💼</div>
                          <div>
                            <h3 className="font-medium text-purple-900">Sales & Quoting</h3>
                            <p className="text-sm text-purple-700">Generate quotes and sales</p>
                          </div>
                        </div>
                      </Link>

                      <Link href="/materials-library" className="block p-4 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors">
                        <div className="flex items-center">
                          <div className="text-amber-600 mr-3">📚</div>
                          <div>
                            <h3 className="font-medium text-amber-900">Materials Library</h3>
                            <p className="text-sm text-amber-700">Access marketing materials</p>
                          </div>
                        </div>
                      </Link>

                      <Link href="/learning" className="block p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors">
                        <div className="flex items-center">
                          <div className="text-indigo-600 mr-3">🎓</div>
                          <div>
                            <h3 className="font-medium text-indigo-900">Learning Center</h3>
                            <p className="text-sm text-indigo-700">Training and resources</p>
                          </div>
                        </div>
                      </Link>

                      <Link href="/support" className="block p-4 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors">
                        <div className="flex items-center">
                          <div className="text-red-600 mr-3">🆘</div>
                          <div>
                            <h3 className="font-medium text-red-900">Support</h3>
                            <p className="text-sm text-red-700">Get help and assistance</p>
                          </div>
                        </div>
                      </Link>

                      <Link href="/inbox" className="block p-4 bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 transition-colors">
                        <div className="flex items-center">
                          <div className="text-teal-600 mr-3">📬</div>
                          <div>
                            <h3 className="font-medium text-teal-900">Inbox</h3>
                            <p className="text-sm text-teal-700">Messages and notifications</p>
                          </div>
                        </div>
                      </Link>

                      <Link href="/profile" className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors">
                        <div className="flex items-center">
                          <div className="text-gray-600 mr-3">⚙️</div>
                          <div>
                            <h3 className="font-medium text-gray-900">Profile Settings</h3>
                            <p className="text-sm text-gray-700">Manage your account</p>
                          </div>
                        </div>
                      </Link>

                      <Link href="/search" className="block p-4 bg-cyan-50 hover:bg-cyan-100 rounded-lg border border-cyan-200 transition-colors">
                        <div className="flex items-center">
                          <div className="text-cyan-600 mr-3">🔍</div>
                          <div>
                            <h3 className="font-medium text-cyan-900">Search</h3>
                            <p className="text-sm text-cyan-700">Find information quickly</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </nav>
                </div>

                {/* Additional Links */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Additional Resources</h3>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/sitemap" className="text-blue-600 hover:text-blue-800 underline">
                      Sitemap
                    </Link>
                  </div>
                </div>

                {/* Debug Session Info (collapsible) */}
                <details className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <summary className="cursor-pointer text-blue-800 font-medium">
                    🔧 Debug: Session Information (Click to expand)
                  </summary>
                  <pre className="text-xs text-blue-700 bg-blue-100 p-3 rounded overflow-auto mt-3">
                    {JSON.stringify(session, null, 2)}
                  </pre>
                </details>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No session found. Please log in.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 