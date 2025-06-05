// apps/broker-portal/src/app/(protected)/member-support/member-search/[memberId]/claims/page.tsx

import Link from 'next/link'

type MemberClaimsPageProps = {
  params: Promise<{
    memberId: string
  }>
}

export default async function MemberClaimsPage({
  params,
}: MemberClaimsPageProps) {
  const { memberId } = await params
  const exampleClaimId = 'example-claim-123' // Placeholder

  return (
    <div>
      <h1>Claims for Member: {memberId}</h1>
      <p>This page lists claims for member {memberId}.</p>
      {/* Placeholder for claims list */}
      <nav aria-labelledby="claims-list-navigation">
        <h2 id="claims-list-navigation">Example Claim</h2>
        <ul>
          <li>
            <Link
              href={`/member-support/member-search/${memberId}/claims/${exampleClaimId}`}
            >
              View Details for Claim {exampleClaimId}
            </Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Link href={`/member-support/member-search/${memberId}`}>
        Back to Member {memberId} Details
      </Link>
      <br />
      <Link href="/member-support/member-search">Back to Member Search</Link>
      <br />
      <Link href="/dashboard">Back to Dashboard</Link>
    </div>
  )
}
