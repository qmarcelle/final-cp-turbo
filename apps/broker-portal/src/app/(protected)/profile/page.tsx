export default function ProfilePage() {
  return (
    <div>
      <h1>Your Profile</h1>
      <p>View and manage your profile settings.</p>
      {/* Profile information display and edit forms */}
      <nav>
        <a href="/profile/security">Security Settings</a> |
        <a href="/profile/admin">Admin Settings</a> (if applicable)
      </nav>
    </div>
  );
} 