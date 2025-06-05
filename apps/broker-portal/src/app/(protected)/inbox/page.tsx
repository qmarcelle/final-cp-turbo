import Link from 'next/link'

export default function InboxPage() {
  return (
    <div>
      <h1>Inbox</h1>
      <p>View messages and notifications here.</p>
      {/* Content for the inbox page */}
      <hr />
      <Link href="/dashboard">Back to Dashboard</Link>
    </div>
  )
}
