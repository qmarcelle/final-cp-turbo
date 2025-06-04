/**
 * Security Configuration
 * Centralized security policies and headers for all applications
 */

const securityConfig = {
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'", // Required for Next.js
        "'unsafe-eval'", // Required for development
        "https://www.google-analytics.com",
        "https://www.googletagmanager.com",
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'", // Required for CSS-in-JS
        "https://fonts.googleapis.com",
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
        "data:",
      ],
      imgSrc: [
        "'self'",
        "data:",
        "https:",
        "blob:",
      ],
      connectSrc: [
        "'self'",
        "https://api.portals.bcbst.com",
        "https://analytics.google.com",
        "https://www.google-analytics.com",
      ],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },

  // Security Headers
  headers: {
    // Prevent clickjacking
    "X-Frame-Options": "DENY",
    
    // Prevent MIME type sniffing
    "X-Content-Type-Options": "nosniff",
    
    // Enable XSS protection
    "X-XSS-Protection": "1; mode=block",
    
    // Referrer policy
    "Referrer-Policy": "strict-origin-when-cross-origin",
    
    // Permissions policy
    "Permissions-Policy": [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "interest-cohort=()",
    ].join(", "),
    
    // Strict Transport Security (HTTPS only)
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  },

  // CORS Configuration
  cors: {
    origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
    ],
    credentials: true,
    maxAge: 86400, // 24 hours
  },

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
    message: {
      error: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
  },

  // Session Configuration
  session: {
    name: 'portals.sid',
    secret: process.env.SESSION_SECRET || 'change-this-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: parseInt(process.env.SESSION_TIMEOUT) * 1000 || 3600000, // 1 hour
      sameSite: 'strict',
    },
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'change-this-in-production',
    expiresIn: '1h',
    issuer: 'portals.bcbst.com',
    audience: 'portals-users',
    algorithm: 'HS256',
  },

  // Environment-specific overrides
  development: {
    contentSecurityPolicy: {
      directives: {
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://www.google-analytics.com",
          "https://www.googletagmanager.com",
        ],
      },
    },
    headers: {
      "Strict-Transport-Security": undefined, // Disable HSTS in development
    },
  },

  production: {
    headers: {
      "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    },
  },
}

module.exports = securityConfig 