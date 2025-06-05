import Link from 'next/link'

export default function ReportingPage() {
  return (
    <div>
      <h1>Reporting</h1>
      <nav aria-labelledby="reporting-navigation">
        <h2 id="reporting-navigation">Reporting Sections</h2>
        <ul>
          <li>
            <Link href="/reporting/bob">Book of Business Reporting</Link>
          </li>
          <li>
            <Link href="/reporting/compensation">Compensation Reporting</Link>
          </li>
          <li>
            <Link href="/reporting/edi">EDI Reporting</Link>
          </li>
          <li>
            <Link href="/reporting/on-off-marketplace-reporting">
              On/Off Marketplace Reporting
            </Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Link href="/dashboard">Back to Dashboard</Link>
    </div>
  )
}
