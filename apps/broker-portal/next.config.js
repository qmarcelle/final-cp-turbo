/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@cp/ui",
    "@cp/router",
    "@cp/auth",
    "@cp/logger",
    "@cp/testing",
    "@cp/utils"
  ],
  eslint: {
    // Allow production builds to successfully complete even with ESLint errors
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  typescript: {
    // Allow production builds to successfully complete even with TypeScript errors
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig; 