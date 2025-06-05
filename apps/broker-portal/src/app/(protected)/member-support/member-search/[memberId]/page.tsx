import Link from 'next/link'

type MemberIdPageProps = {
  params: Promise<{
    memberId: string
  }>
}

export default async function MemberIdPage({ params }: MemberIdPageProps) {
  const { memberId } = await params

  return (
    <div>
      <h1>Member Details: {memberId}</h1>
      <p>
        This is the main page for member ID: {memberId}. Select a section below
        to view more details.
      </p>

      <nav aria-labelledby="member-specific-navigation">
        <h2 id="member-specific-navigation">Member Sections</h2>
        <ul>
          <li>
            <Link href={`/member-support/member-search/${memberId}/benefits`}>
              View Benefits
            </Link>
          </li>
          <li>
            <Link href={`/member-support/member-search/${memberId}/claims`}>
              View Claims
            </Link>
          </li>
          <li>
            <Link href={`/member-support/member-search/${memberId}/id-card`}>
              View ID Card
            </Link>
          </li>
          <li>
            <Link
              href={`/member-support/member-search/${memberId}/prior-auths`}
            >
              View Prior Authorizations
            </Link>
          </li>
          <li>
            <Link
              href={`/member-support/member-search/${memberId}/other-insurance`}
            >
              View Other Insurance
            </Link>
          </li>
        </ul>
      </nav>

      <hr />
      <Link href="/member-support/member-search">Back to Member Search</Link>
      <br />
      <Link href="/member-support">Back to Member Support</Link>
      <br />
      <Link href="/dashboard">Back to Dashboard</Link>
    </div>
  )
}

// Optional: If you need to generate static paths for known memberIds at build time
// export async function generateStaticParams() {
//   // const members = await fetch('/api/members').then((res) => res.json());
//   // return members.map((member: { id: string }) => ({ memberId: member.id }));
//   return [{ memberId: '123' }, { memberId: '456' }]; // Example
// }
