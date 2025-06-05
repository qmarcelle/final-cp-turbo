import Link from 'next/link'

export default function SupportPage() {
  return (
    <div>
      <h1>Support</h1>
      <p>Get help and assistance with the broker portal.</p>
      {/* Content for the support page */}
      <hr />
      <Link href="/dashboard">Back to Dashboard</Link>
    </div>
  )
}
