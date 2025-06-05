import Link from 'next/link';

type PriorAuthDetailPageProps = {
  params: {
    memberId: string;
    priorAuthId: string;
  };
};

export default function PriorAuthDetailPage({ params }: PriorAuthDetailPageProps) {
  const { memberId, priorAuthId } = params;

  return (
    <div>
      <h1>Prior Authorization Details</h1>
      <p>Displaying details for Prior Auth ID: {priorAuthId} for Member ID: {memberId}.</p>
      {/* Placeholder for prior auth details */}
      <hr />
      <Link href={`/broker/member-support/member-search/${memberId}/prior-auths`}>Back to Prior Authorizations for Member {memberId}</Link>
      <br />
      <Link href={`/broker/member-support/member-search/${memberId}`}>Back to Member {memberId} Details</Link>
      <br />
      <Link href="/broker/member-support/member-search">Back to Member Search</Link>
      <br />
      <Link href="/broker/dashboard">Back to Dashboard</Link>
    </div>
  );
} 