import React from 'react'
import Link from 'next/link'

export default function MemberSupportPage() {
  return (
    <div>
      <h1>Member Support</h1>
      <nav aria-labelledby="member-support-navigation">
        <h2 id="member-support-navigation">Member Support Sections</h2>
        <ul>
          <li>
            <Link href="/member-support/member-search">Member Search</Link>
          </li>
          <li>
            <Link href="/member-support/id-cards">ID Cards</Link>
          </li>
          <li>
            <Link href="/member-support/employer-group">
              Employer Group Support
            </Link>
          </li>
          <li>
            <Link href="/member-support/individual">Individual Support</Link>
          </li>
          <li>
            <Link href="/member-support/medicare-advantage">
              Medicare Advantage Support
            </Link>
          </li>
          <li>
            <Link href="/member-support/medicare-supplement">
              Medicare Supplement Support
            </Link>
          </li>
          <li>
            <Link href="/member-support/dsnp">D-SNP Support</Link>
          </li>
          <li>
            <Link href="/member-support/dental-cost-estimator">
              Dental Cost Estimator
            </Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Link href="/dashboard">Back to Dashboard</Link>
    </div>
  )
}
