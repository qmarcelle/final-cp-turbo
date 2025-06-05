import Link from 'next/link'

export default function SalesPage() {
  return (
    <div>
      <h1>Sales & Quoting</h1>
      <nav aria-labelledby="sales-navigation">
        <h2 id="sales-navigation">Sales Sections</h2>
        <ul>
          <li>
            <Link href="/sales/commission">Commission Information</Link>
          </li>
          <li>
            <Link href="/sales/employer-group">Employer Group Sales</Link>
          </li>
          <li>
            <Link href="/sales/individual">Individual Sales</Link>
          </li>
          <li>
            <Link href="/sales/medicare-advantage">
              Medicare Advantage Sales
            </Link>
          </li>
          <li>
            <Link href="/sales/medicare-supplement">
              Medicare Supplement Sales
            </Link>
          </li>
          <li>
            <Link href="/sales/dsnp">D-SNP Sales</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Link href="/dashboard">Back to Dashboard</Link>
    </div>
  )
}
