import Link from 'next/link'

type MemberOtherInsurancePageProps = {
  params: {
    memberId: string
  }
}

export default function MemberOtherInsurancePage({
  params,
}: MemberOtherInsurancePageProps) {
  const { memberId } = params

  return (
    <div>
      <h1>Other Insurance for Member: {memberId}</h1>
      <p>
        This page displays other insurance information for member {memberId}.
      </p>
      {/* Placeholder for other insurance details */}
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
