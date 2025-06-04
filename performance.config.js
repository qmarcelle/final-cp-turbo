/**
 * Performance Monitoring Configuration
 * Centralized performance budgets and monitoring for all applications
 */

const performanceConfig = {
  // Bundle Size Budgets
  budgets: {
    // Maximum bundle sizes
    maxBundleSize: process.env.PERFORMANCE_BUDGET || '500KB',
    maxChunkSize: '250KB',
    maxAssetSize: '100KB',
    
    // Performance thresholds
    firstContentfulPaint: 1500, // ms
    largestContentfulPaint: 2500, // ms
    firstInputDelay: 100, // ms
    cumulativeLayoutShift: 0.1,
    timeToInteractive: 3000, // ms
  },

  // Web Vitals Configuration
  webVitals: {
    enabled: true,
    reportingEndpoint: process.env.WEB_VITALS_ENDPOINT || '/api/analytics/web-vitals',
    sampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // Core Web Vitals thresholds
    thresholds: {
      LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
      FID: { good: 100, poor: 300 },   // First Input Delay
      CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
      FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
      TTFB: { good: 800, poor: 1800 }, // Time to First Byte
    },
  },

  // Lighthouse Configuration
  lighthouse: {
    enabled: process.env.NODE_ENV === 'production',
    thresholds: {
      performance: 90,
      accessibility: 95,
      bestPractices: 90,
      seo: 90,
      pwa: 80,
    },
    
    // CI integration
    ci: {
      collect: {
        numberOfRuns: 3,
        settings: {
          chromeFlags: '--no-sandbox --disable-dev-shm-usage',
        },
      },
      assert: {
        assertions: {
          'categories:performance': ['error', { minScore: 0.9 }],
          'categories:accessibility': ['error', { minScore: 0.95 }],
          'categories:best-practices': ['error', { minScore: 0.9 }],
          'categories:seo': ['error', { minScore: 0.9 }],
        },
      },
    },
  },

  // Caching Strategy
  caching: {
    // Static assets
    staticAssets: {
      maxAge: 31536000, // 1 year
      immutable: true,
    },
    
    // API responses
    apiResponses: {
      defaultTTL: 300, // 5 minutes
      maxTTL: 3600,    // 1 hour
    },
    
    // Page caching
    pages: {
      static: 86400,    // 24 hours
      dynamic: 300,     // 5 minutes
      revalidate: 60,   // ISR revalidation
    },
    
    // CDN configuration
    cdn: {
      enabled: process.env.NODE_ENV === 'production',
      provider: 'azure-cdn',
      regions: ['us-east-1', 'us-west-2'],
      compression: true,
      brotli: true,
    },
  },

  // Resource Hints
  resourceHints: {
    // DNS prefetch for external domains
    dnsPrefetch: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com',
    ],
    
    // Preconnect for critical resources
    preconnect: [
      'https://api.portals.bcbst.com',
    ],
    
    // Preload critical resources
    preload: [
      { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
    ],
  },

  // Code Splitting Strategy
  codeSplitting: {
    // Chunk splitting configuration
    chunks: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
        priority: 10,
      },
      common: {
        name: 'common',
        minChunks: 2,
        chunks: 'all',
        priority: 5,
      },
    },
    
    // Dynamic imports
    dynamicImports: {
      // Route-based splitting
      routes: true,
      // Component-based splitting
      components: ['Modal', 'Chart', 'Editor'],
    },
  },

  // Image Optimization
  images: {
    // Next.js Image component configuration
    domains: ['cdn.portals.bcbst.com'],
    formats: ['image/webp', 'image/avif'],
    sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Responsive images
    responsive: {
      breakpoints: [640, 768, 1024, 1280, 1536],
      quality: 85,
      placeholder: 'blur',
    },
  },

  // Monitoring and Analytics
  monitoring: {
    // Real User Monitoring (RUM)
    rum: {
      enabled: process.env.NODE_ENV === 'production',
      sampleRate: 0.1,
      trackInteractions: true,
      trackLongTasks: true,
    },
    
    // Performance Observer
    observer: {
      entryTypes: [
        'navigation',
        'resource',
        'paint',
        'largest-contentful-paint',
        'first-input',
        'layout-shift',
      ],
    },
    
    // Error tracking
    errors: {
      trackJSErrors: true,
      trackUnhandledRejections: true,
      trackResourceErrors: true,
    },
  },

  // Environment-specific overrides
  development: {
    budgets: {
      maxBundleSize: '2MB', // More lenient in development
    },
    webVitals: {
      sampleRate: 1.0, // Track all in development
    },
    caching: {
      pages: {
        static: 0, // No caching in development
        dynamic: 0,
      },
    },
  },

  production: {
    budgets: {
      maxBundleSize: '500KB', // Strict in production
    },
    webVitals: {
      sampleRate: 0.1, // Sample in production
    },
    monitoring: {
      rum: {
        enabled: true,
        sampleRate: 0.1,
      },
    },
  },
}

module.exports = performanceConfig 