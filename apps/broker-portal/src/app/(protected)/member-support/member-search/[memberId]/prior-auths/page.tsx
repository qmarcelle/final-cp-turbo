// apps/broker-portal/src/app/(protected)/member-support/member-search/[memberId]/prior-auths/page.tsx

import Link from 'next/link';

type MemberPriorAuthsPageProps = {
  params: {
    memberId: string;
  };
};

export default function MemberPriorAuthsPage({ params }: MemberPriorAuthsPageProps) {
  const { memberId } = params;
  const examplePriorAuthId = "pa-example-456"; // Placeholder

  return (
    <div>
      <h1>Prior Authorizations for Member: {memberId}</h1>
      <p>This page lists prior authorizations for member {memberId}.</p>
      {/* Placeholder for prior auths list */}
      <nav aria-labelledby="prior-auths-list-navigation">
        <h2 id="prior-auths-list-navigation">Example Prior Authorization</h2>
        <ul>
          <li>
            <Link href={`/broker/member-support/member-search/${memberId}/prior-auths/${examplePriorAuthId}`}>
              View Details for Prior Authorization {examplePriorAuthId}
            </Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Link href={`/broker/member-support/member-search/${memberId}`}>Back to Member {memberId} Details</Link>
      <br />
      <Link href="/broker/member-support/member-search">Back to Member Search</Link>
      <br />
      <Link href="/broker/dashboard">Back to Dashboard</Link>
    </div>
  );
} 