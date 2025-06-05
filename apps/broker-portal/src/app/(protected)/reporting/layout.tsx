import React from 'react';

export default function ReportingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav style={{ borderBottom: '1px dashed #ccc', marginBottom: '1rem', paddingBottom: '0.5rem' }}>
        <h3>Reporting Section Nav</h3>
        {/* Add reporting-specific navigation links here if needed */}
        {/* e.g., <Link href="/reporting/bob">BOB</Link> | <Link href="/reporting/compensation">Compensation</Link> */}
      </nav>
      {children}
    </div>
  );
} 