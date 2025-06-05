import Link from 'next/link'

export default function EmployerGroupSupportPage() {
  return (
    <div>
      <h1>Employer Group Support</h1>
      <p>Support resources for employer groups.</p>
      <nav aria-labelledby="employer-group-navigation">
        <h2 id="employer-group-navigation">Sub Sections</h2>
        <ul>
          <li>
            <Link href="/member-support/employer-group/networks-and-steerage">
              Networks & Steerage
            </Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Link href="/member-support">Back to Member Support</Link>
      <br />
      <Link href="/dashboard">Back to Dashboard</Link>
    </div>
  )
}
