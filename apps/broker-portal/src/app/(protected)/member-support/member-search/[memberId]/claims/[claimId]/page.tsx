interface ClaimDetailsPageProps {
  params: { 
    memberId: string;
    claimId: string;
  };
}

export default async function ClaimDetailsPage({ params }: ClaimDetailsPageProps) {
  // Fetch specific claim details for params.memberId and params.claimId
  // const claimDetails = await getClaimDetails(params.memberId, params.claimId);

  return (
    <div>
      <h4>Claim Details</h4>
      <p>Member ID: {params.memberId}</p>
      <p>Claim ID: {params.claimId}</p>
      <p>Displaying full details for the selected claim.</p>
      {/* Placeholder for claim details content */}
      {/* <pre>{JSON.stringify(claimDetails, null, 2)}</pre> */}
    </div>
  );
}

// Optional: If you need to generate static paths for known claims at build time
// export async function generateStaticParams({ params: { memberId } }: { params: { memberId: string }}) {
//   // const claims = await fetch(`/api/members/${memberId}/claims`).then((res) => res.json());
//   // return claims.map((claim: { id: string }) => ({ claimId: claim.id }));
//   return [{ claimId: 'claimA' }, { claimId: 'claimB' }]; // Example for a given memberId
// } 