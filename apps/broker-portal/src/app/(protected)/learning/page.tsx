import Link from 'next/link'

export default function LearningPage() {
  return (
    <div>
      <h1>Learning Center</h1>
      <nav aria-labelledby="learning-navigation">
        <h2 id="learning-navigation">Learning Resources</h2>
        <ul>
          <li>
            <Link href="/learning/seminar-videos">Seminar Videos</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Link href="/dashboard">Back to Dashboard</Link>
    </div>
  )
}
