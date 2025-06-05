import Link from 'next/link'

export default function ProfilePage() {
  return (
    <div>
      <h1>Profile</h1>
      <nav aria-labelledby="profile-navigation">
        <h2 id="profile-navigation">Profile Sections</h2>
        <ul>
          <li>
            <Link href="/profile/security">Security Settings</Link>
          </li>
          <li>
            <Link href="/profile/admin">Broker Admin</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Link href="/dashboard">Back to Dashboard</Link>
    </div>
  )
}
