// apps/broker-portal/src/app/(protected)/member-support/member-search/[memberId]/id-card/page.tsx

import Link from 'next/link';

type MemberIdCardPageProps = {
  params: {
    memberId: string;
  };
};

export default function MemberIdCardPage({ params }: MemberIdCardPageProps) {
  const { memberId } = params;

  return (
    <div>
      <h1>ID Card for Member: {memberId}</h1>
      <p>This page displays ID card information for member {memberId}.</p>
      {/* Placeholder for ID card image/details */}
      <hr />
      <Link href={`/broker/member-support/member-search/${memberId}`}>Back to Member {memberId} Details</Link>
      <br />
      <Link href="/broker/member-support/member-search">Back to Member Search</Link>
      <br />
      <Link href="/broker/dashboard">Back to Dashboard</Link>
    </div>
  );
} 