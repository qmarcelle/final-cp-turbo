import Link from 'next/link';

export default function LearningCenterPage() {
  return (
    <div>
      <h1>Learning Center</h1>
      <nav aria-labelledby="learning-center-navigation">
        <h2 id="learning-center-navigation">Learning Resources</h2>
        <ul>
          <li><Link href="/broker/learning/seminar-videos">Seminar Videos</Link></li>
        </ul>
      </nav>
      <hr />
      <Link href="/broker/dashboard">Back to Dashboard</Link>
    </div>
  );
} 