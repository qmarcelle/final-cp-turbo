// apps/broker-portal/src/app/(protected)/member-support/member-search/[memberId]/claims/page.tsx

interface MemberClaimsPageProps {
  params: { memberId: string };
}

export default async function MemberClaimsPage({ params }: MemberClaimsPageProps) {
  // Fetch claims list for params.memberId
  // const claims = await getMemberClaims(params.memberId);

  return (
    <div>
      <h3>Claims for Member {params.memberId}</h3>
      <p>Displaying a list of claims. Click on a claim to see details.</p>
      {/* Placeholder for claims list */}
      {/* Example link to a specific claim (assuming claim.id exists) */}
      {/* {claims.map(claim => <a key={claim.id} href={`/member-support/member-search/${params.memberId}/claims/${claim.id}`}>View Claim {claim.id}</a>)} */}
    </div>
  );
} 