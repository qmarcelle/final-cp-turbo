import Link from 'next/link';

export default function HtmlSitemapPage() {
  // This page would list out all accessible routes within the protected area.
  // It would need to be maintained manually or generated dynamically if possible.
  return (
    <div>
      <h1>HTML Sitemap (Protected Area)</h1>
      <p>A list of accessible pages within the portal.</p>
      <ul>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/reporting">Reporting</Link></li>
        <ul>
          <li><Link href="/reporting/bob">BOB Reporting</Link></li>
          {/* ... other reporting links */}
        </ul>
        <li><Link href="/member-support">Member Support</Link></li>
        <ul>
          <li><Link href="/member-support/member-search">Member Search</Link></li>
          {/* ... other member support links */}
        </ul>
        <li><Link href="/sales">Sales</Link></li>
         {/* ... other sales links */}
        <li><Link href="/materials-library">Materials Library</Link></li>
        <li><Link href="/learning">Learning Center</Link></li>
        <li><Link href="/support">Support</Link></li>
        <li><Link href="/inbox">Inbox</Link></li>
        <li><Link href="/profile">Profile</Link></li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
} 