import Link from 'next/link';

export default function MemberSearchPage() {
  return (
    <div>
      <h1>Member Search</h1>
      <p>Use this page to find a member. Once a member is selected, you will be taken to their details page.</p>
      {/* Actual search form would go here */}
      <nav aria-labelledby="member-search-navigation">
        <h2 id="member-search-navigation">Example Member Link</h2>
        <ul>
          {/* This link would typically be generated after a successful search */}
          <li><Link href="/broker/member-support/member-search/example-member-id">View Example Member Details</Link></li>
        </ul>
      </nav>
      <hr />
      <Link href="/broker/member-support">Back to Member Support</Link>
      <br />
      <Link href="/broker/dashboard">Back to Dashboard</Link>
    </div>
  );
} 