import Link from 'next/link';

export default function ProfileSettingsPage() {
  return (
    <div>
      <h1>Profile Settings</h1>
      <nav aria-labelledby="profile-settings-navigation">
        <h2 id="profile-settings-navigation">Settings</h2>
        <ul>
          <li><Link href="/broker/profile/security">Security Settings</Link></li>
          <li><Link href="/broker/profile/admin">Broker Admin</Link></li>
        </ul>
      </nav>
      <hr />
      <Link href="/broker/dashboard">Back to Dashboard</Link>
    </div>
  );
} 