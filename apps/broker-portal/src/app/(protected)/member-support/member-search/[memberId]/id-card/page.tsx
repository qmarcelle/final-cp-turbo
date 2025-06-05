// apps/broker-portal/src/app/(protected)/member-support/member-search/[memberId]/id-card/page.tsx

import Link from 'next/link'

type MemberIdCardPageProps = {
  params: Promise<{
    memberId: string
  }>
}

export default async function MemberIdCardPage({
  params,
}: MemberIdCardPageProps) {
  const { memberId } = await params

  return (
    <div>
      <h1>ID Card for Member: {memberId}</h1>
      <p>This page displays ID card information for member {memberId}.</p>
      {/* Placeholder for ID card image/details */}
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
