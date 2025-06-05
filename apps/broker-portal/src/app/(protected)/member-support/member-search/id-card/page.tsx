import Link from 'next/link'

export default function MemberIdCardSearchPage() {
  return (
    <div>
      <h1>Member ID Card (from Search Context)</h1>
      <p>
        This page would display ID card information for a member found via
        search.
      </p>
      {/* Placeholder for ID card content */}
      <hr />
      <Link href="/member-support/member-search">Back to Member Search</Link>
      <br />
      <Link href="/member-support">Back to Member Support</Link>
      <br />
      <Link href="/dashboard">Back to Dashboard</Link>
    </div>
  )
}
