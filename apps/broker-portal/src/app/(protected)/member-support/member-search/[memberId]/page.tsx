interface MemberDetailsPageProps {
  params: { memberId: string };
}

export default async function MemberDetailsPage({ params }: MemberDetailsPageProps) {
  // Fetch member details based on params.memberId
  // const member = await getMemberDetails(params.memberId);

  return (
    <div>
      <h1>Member Details: {params.memberId}</h1>
      <p>Displaying detailed information for the selected member.</p>
      {/* Placeholder for member details content */}
      {/* <pre>{JSON.stringify(member, null, 2)}</pre> */}
      <nav>
        <a href={`/member-support/member-search/${params.memberId}/benefits`}>Benefits</a> |
        <a href={`/member-support/member-search/${params.memberId}/claims`}>Claims</a> |
        <a href={`/member-support/member-search/${params.memberId}/id-card`}>ID Card</a> |
        <a href={`/member-support/member-search/${params.memberId}/prior-auths`}>Prior Auths</a>
      </nav>
      {/* Sub-page content will be rendered by child routes */}
    </div>
  );
}

// Optional: If you need to generate static paths for known memberIds at build time
// export async function generateStaticParams() {
//   // const members = await fetch('/api/members').then((res) => res.json());
//   // return members.map((member: { id: string }) => ({ memberId: member.id }));
//   return [{ memberId: '123' }, { memberId: '456' }]; // Example
// } 