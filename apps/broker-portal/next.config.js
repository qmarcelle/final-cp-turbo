/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Serve broker portal from /broker path
  basePath: '/broker',
  assetPrefix: '/broker',
  
  // Package transpilation for monorepo
  transpilePackages: [
    "@portals/ui",
    "@portals/auth",
    "@portals/logger", 
    "@portals/testing",
    "@portals/utils",
    "@portals/types"
  ],
  
  // Modern compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: [
      '@headlessui/react',
      '@heroicons/react',
      'react-hook-form'
    ],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Build configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Deployment configuration
  output: 'standalone',
  trailingSlash: false,
  poweredByHeader: false,
};

module.exports = nextConfig;