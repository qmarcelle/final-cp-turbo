import Link from 'next/link'

type PriorAuthDetailPageProps = {
  params: Promise<{
    memberId: string
    priorAuthId: string
  }>
}

export default async function PriorAuthDetailPage({
  params,
}: PriorAuthDetailPageProps) {
  const { memberId, priorAuthId } = await params

  return (
    <div>
      <h1>Prior Authorization Details</h1>
      <p>
        Displaying details for Prior Auth ID: {priorAuthId} for Member ID:{' '}
        {memberId}.
      </p>
      {/* Placeholder for prior auth details */}
      <hr />
      <Link href={`/member-support/member-search/${memberId}/prior-auths`}>
        Back to Prior Authorizations for Member {memberId}
      </Link>
      <br />
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
