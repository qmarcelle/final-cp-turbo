import React from 'react';

// Removed async checkAuth and related logic for now to simplify

export default function ProtectedLayout({ 
  children,
}: {
  children: React.ReactNode;
}) {
  // console.log('Using simplified ProtectedLayout'); // For debugging if needed
  return (
    <div>
      <header style={{ padding: '1rem', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
        <h2>Broker Portal - Protected Area</h2>
        {/* Add shared navigation, user profile, etc. here */}
      </header>
      <main style={{ padding: '1rem' }}>
        {children}
      </main>
      <footer style={{ padding: '1rem', backgroundColor: '#f0f0f0', borderTop: '1px solid #ccc', textAlign: 'center' }}>
        <p>&copy; {new Date().getFullYear()} Broker Portal</p>
      </footer>
    </div>
  );
} 