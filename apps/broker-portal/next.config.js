/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add base path for context root
  basePath: '/broker',
  // Ensure assets are also served from this path
  assetPrefix: '/broker',
  transpilePackages: [
          "@portals/ui",
      "@portals/logger",
      "@portals/testing",
      "@portals/utils"
  ],
  eslint: {
    // Allow production builds to successfully complete even with ESLint errors
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  typescript: {
    // Allow production builds to successfully complete even with TypeScript errors
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  // Enable standalone output for OpenShift deployments
  output: 'standalone',
};

module.exports = nextConfig;