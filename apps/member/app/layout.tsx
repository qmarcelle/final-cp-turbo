'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { VisibilityProvider } from '@portals/visibility'; // Assuming @portals/visibility exports this

// Optional: Add global styles 
// import '../../../../packages/ui/dist/globals.css'; // Adjust path based on your actual global CSS location
// import '../styles/globals.css'; // Or app-specific global styles

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {/* 
            The VisibilityProvider will internally use useSession to get vRules.
            Ensure your @portals/auth correctly puts vRules into the session object.
          */}
          <VisibilityProvider>
            {children}
          </VisibilityProvider>
        </SessionProvider>
      </body>
    </html>
  );
} 