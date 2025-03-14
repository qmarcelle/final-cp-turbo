/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 14 and earlier
  experimental: {
    serverComponentsExternalPackages: ['pino', 'pino-pretty']
  },
  // Next.js 15
  // serverExternalPackages: ['pino', 'pino-pretty'],
  
  // Resolve module resolution error for worker module
  webpack: (config, context) => {
    config.externals.push({
      'thread-stream': 'commonjs thread-stream',
    });
    return config;
  },
};

module.exports = nextConfig; 