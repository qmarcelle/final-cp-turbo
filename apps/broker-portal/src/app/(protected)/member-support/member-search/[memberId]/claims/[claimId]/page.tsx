import Link from 'next/link'

type ClaimDetailPageProps = {
  params: Promise<{
    memberId: string
    claimId: string
  }>
}

export default async function ClaimDetailPage({
  params,
}: ClaimDetailPageProps) {
  const { memberId, claimId } = await params

  return (
    <div>
      <h1>Claim Details</h1>
      <p>
        Displaying details for Claim ID: {claimId} for Member ID: {memberId}.
      </p>
      {/* Placeholder for claim details */}
      <hr />
      <Link href={`/member-support/member-search/${memberId}/claims`}>
        Back to Claims for Member {memberId}
      </Link>
      <br />
      <Link href={`/member-support/member-search/${memberId}`}>
        Back to Member {memberId} Details
      </Link>
      <br />
      <Link href="/member-support/member-search">Back to Member Search</Link>
      <br />
      <h4>Claim Details</h4>
      <p>Member ID: {memberId}</p>
      <p>Claim ID: {claimId}</p>
      <p>Displaying full details for the selected claim.</p>
      {/* Placeholder for claim details content */}
      {/* <pre>{JSON.stringify(claimDetails, null, 2)}</pre> */}
    </div>
  )
}

// Optional: If you need to generate static paths for known claims at build time
// export async function generateStaticParams({ params: { memberId } }: { params: { memberId: string }}) {
//   // const claims = await fetch(`/api/members/${memberId}/claims`).then((res) => res.json());
//   // return claims.map((claim: { id: string }) => ({ claimId: claim.id }));
//   return [{ claimId: 'claimA' }, { claimId: 'claimB' }]; // Example for a given memberId
// }
