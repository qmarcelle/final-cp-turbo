import React from 'react';

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav style={{ borderBottom: '1px solid #e0e0e0', marginBottom: '1rem', paddingBottom: '0.5rem' }}>
        <h4>Sales Section</h4>
        {/* Add sales-specific navigation if needed */}
      </nav>
      {children}
    </div>
  );
} 