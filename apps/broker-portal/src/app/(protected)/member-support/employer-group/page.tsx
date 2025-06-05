import Link from 'next/link';

export default function EmployerGroupSupportPage() {
  return (
    <div>
      <h1>Employer Group Support</h1>
      <p>Support resources for employer groups.</p>
      <nav aria-labelledby="employer-group-navigation">
        <h2 id="employer-group-navigation">Sub Sections</h2>
        <ul>
          <li><Link href="/broker/member-support/employer-group/networks-and-steerage">Networks & Steerage</Link></li>
        </ul>
      </nav>
      <hr />
      <Link href="/broker/member-support">Back to Member Support</Link>
      <br />
      <Link href="/broker/dashboard">Back to Dashboard</Link>
    </div>
  );
} 