import Link from 'next/link';

export default function SupportPage() {
  return (
    <div>
      <h1>Support</h1>
      <p>This is the main support page. Information and resources will be available here.</p>
      {/* Content for the support page */}
      <hr />
      <Link href="/broker/dashboard">Back to Dashboard</Link>
    </div>
  );
} 