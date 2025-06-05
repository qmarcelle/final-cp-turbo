// apps/broker-portal/src/app/(protected)/member-support/member-search/[memberId]/benefits/page.tsx

import Link from 'next/link';

type MemberBenefitsPageProps = {
  params: {
    memberId: string;
  };
};

export default function MemberBenefitsPage({ params }: MemberBenefitsPageProps) {
  const { memberId } = params;

  return (
    <div>
      <h1>Benefits for Member: {memberId}</h1>
      <p>This page displays benefits information for member {memberId}.</p>
      {/* Placeholder for benefits details */}
      <hr />
      <Link href={`/broker/member-support/member-search/${memberId}`}>Back to Member {memberId} Details</Link>
      <br />
      <Link href="/broker/member-support/member-search">Back to Member Search</Link>
      <br />
      <Link href="/broker/dashboard">Back to Dashboard</Link>
    </div>
  );
} 