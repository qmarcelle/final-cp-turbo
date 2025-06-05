import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Broker Portal',
  description: 'Broker Portal Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
} 