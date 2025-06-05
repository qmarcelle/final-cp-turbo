import Link from 'next/link';

export default function NetworksAndSteeragePage() {
  return (
    <div>
      <h1>Networks & Steerage</h1>
      <p>This page would provide information about networks and steerage for employer groups.</p>
      {/* Placeholder for networks and steerage content */}
      <hr />
      <Link href="/broker/member-support/employer-group">Back to Employer Group Support</Link>
      <br />
      <Link href="/broker/member-support">Back to Member Support</Link>
      <br />
      <Link href="/broker/dashboard">Back to Dashboard</Link>
    </div>
  );
} 