import React from 'react';
import Link from 'next/link';

export default function MemberSupportPage() {
  return (
    <div>
      <h1>Member Support</h1>
      <nav aria-labelledby="member-support-navigation">
        <h2 id="member-support-navigation">Member Support Sections</h2>
        <ul>
          <li><Link href="/broker/member-support/member-search">Member Search</Link></li>
          <li><Link href="/broker/member-support/id-cards">ID Cards</Link></li>
          <li><Link href="/broker/member-support/employer-group">Employer Group Support</Link></li>
          <li><Link href="/broker/member-support/individual">Individual Support</Link></li>
          <li><Link href="/broker/member-support/medicare-advantage">Medicare Advantage Support</Link></li>
          <li><Link href="/broker/member-support/medicare-supplement">Medicare Supplement Support</Link></li>
          <li><Link href="/broker/member-support/dsnp">DSNP Support</Link></li>
          <li><Link href="/broker/member-support/dental-cost-estimator">Dental Cost Estimator</Link></li>
        </ul>
      </nav>
      <hr />
      <Link href="/broker/dashboard">Back to Dashboard</Link>
    </div>
  );
} 