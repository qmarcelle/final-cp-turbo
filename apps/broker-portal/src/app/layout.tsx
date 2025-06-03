import type { Metadata } from 'next';
import '../styles/globals.css';

// import '@fontsource/inter/400.css'; // Regular
// import '@fontsource/inter/500.css'; // Medium
// import '@fontsource/inter/600.css'; // SemiBold
// import '@fontsource/inter/700.css'; // Bold

export const metadata: Metadata = {
  title: 'Broker Portal',
  description: 'BCBST Broker Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
} 