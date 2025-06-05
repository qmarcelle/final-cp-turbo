'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function MemberDetailError({
  error,
  reset,
  params // If you need to access params in the error component
}: {
  error: Error & { digest?: string };
  reset: () => void;
  params?: { memberId?: string }; // Optional, params might not always be passed or needed
}) {
  useEffect(() => {
    console.error(`Error loading details for member ${params?.memberId}:`, error);
  }, [error, params?.memberId]);

  return (
    <div>
      <h2>Error Loading Member Details!</h2>
      <p>Sorry, we couldn't load the details for member {params?.memberId || 'selected'}.</p>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
} 