'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Dashboard Error:', error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong on the Dashboard!</h2>
      <p>{error.message}</p>
      <button
        onClick={() => reset()} // Attempt to recover by trying to re-render the segment
      >
        Try again
      </button>
    </div>
  );
} 