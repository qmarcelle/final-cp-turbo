/**
 * Broker portal login page
 * Integrates with AuthJS for SSO authentication and JWT token management
 * 
 * @todo Implement signIn() from @portals/auth when AuthJS integration is complete
 * @see https://authjs.dev/reference/nextjs/react#signin
 */
import { signIn } from "../../../auth"

async function handleMockLogin() {
  "use server"
  await signIn("mock-broker", {
    brokerName: "John Doe",
    brokerId: "BROKER001",
    redirectTo: "/dashboard"
  })
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Broker Portal Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Development Mock Authentication
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <form action={handleMockLogin}>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Mock Login as John Doe (BROKER001)
              </button>
            </div>
          </form>
          <div className="text-xs text-gray-500 text-center">
            <p>This is a development mock authentication system.</p>
            <p>In production, this will be replaced with your actual authentication provider.</p>
          </div>
        </div>
      </div>
    </div>
  )
} 