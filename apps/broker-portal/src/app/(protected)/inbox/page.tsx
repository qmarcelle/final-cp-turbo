import Link from 'next/link';

export default function InboxPage() {
  return (
    <div>
      <h1>Inbox</h1>
      <p>This is your inbox. Messages and notifications will appear here.</p>
      {/* Content for the inbox page */}
      <hr />
      <Link href="/broker/dashboard">Back to Dashboard</Link>
    </div>
  );
} 