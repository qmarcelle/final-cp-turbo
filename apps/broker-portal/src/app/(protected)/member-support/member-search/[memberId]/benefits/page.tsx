// apps/broker-portal/src/app/(protected)/member-support/member-search/[memberId]/benefits/page.tsx

import Link from 'next/link'

type MemberBenefitsPageProps = {
  params: Promise<{
    memberId: string
  }>
}

export default async function MemberBenefitsPage({
  params,
}: MemberBenefitsPageProps) {
  const { memberId } = await params

  return (
    <div>
      <h1>Benefits for Member: {memberId}</h1>
      <p>This page displays benefits information for member {memberId}.</p>
      {/* Placeholder for benefits details */}
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
