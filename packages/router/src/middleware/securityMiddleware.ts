/**
 * Security middleware for Next.js applications
 * Implements best practices for security headers and protections
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Options for configuring Content Security Policy
 */
export interface CSPOptions {
  /**
   * Enable default CSP directives
   * @default true
   */
  enableDefaults?: boolean;
  
  /**
   * Custom script sources
   * @default []
   */
  scriptSrc?: string[];
  
  /**
   * Custom style sources
   * @default []
   */
  styleSrc?: string[];
  
  /**
   * Custom connect sources
   * @default []
   */
  connectSrc?: string[];
  
  /**
   * Custom image sources
   * @default []
   */
  imgSrc?: string[];
  
  /**
   * Custom font sources
   * @default []
   */
  fontSrc?: string[];
  
  /**
   * Enable nonce for scripts and styles
   * @default false
   */
  useNonce?: boolean;
}

/**
 * Options for security middleware
 */
export interface SecurityOptions {
  /**
   * Content Security Policy configuration
   */
  csp?: CSPOptions;
  
  /**
   * Enable strict transport security
   * @default true
   */
  hsts?: boolean;
  
  /**
   * Enable permissions policy
   * @default true
   */
  permissionsPolicy?: boolean;
  
  /**
   * Custom permissions policy directives
   */
  permissionsPolicyDirectives?: Record<string, string>;
  
  /**
   * Enable Cross-Origin Opener Policy
   * @default true
   */
  coop?: boolean;
  
  /**
   * Enable Cross-Origin Embedder Policy
   * @default false - enable only when all resources support CORP
   */
  coep?: boolean;
  
  /**
   * Enable Cross-Origin Resource Policy
   * @default true
   */
  corp?: boolean;
  
  /**
   * Generate random nonce for CSP
   * @default false
   */
  generateNonce?: boolean;
  
  /**
   * Routes to exempt from security headers (e.g., for third-party integrations)
   * @default []
   */
  exemptRoutes?: string[];
}

/**
 * Default security options
 */
const defaultSecurityOptions: SecurityOptions = {
  csp: {
    enableDefaults: true,
    useNonce: false,
    scriptSrc: [],
    styleSrc: [],
    connectSrc: [],
    imgSrc: [],
    fontSrc: [],
  },
  hsts: true,
  permissionsPolicy: true,
  permissionsPolicyDirectives: {
    camera: '()',
    microphone: '()',
    geolocation: '()',
    'interest-cohort': '()',
  },
  coop: true,
  coep: false,
  corp: true,
  generateNonce: false,
  exemptRoutes: [],
};

/**
 * Generate a random nonce for CSP
 */
function generateCSPNonce(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // Fallback for environments without crypto.randomUUID
  const array = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  }
  
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Generate Content Security Policy header value
 */
function generateCSP(options: CSPOptions = {}, nonce?: string): string {
  const {
    enableDefaults = true,
    scriptSrc = [],
    styleSrc = [],
    connectSrc = [],
    imgSrc = [],
    fontSrc = [],
    useNonce = false,
  } = options;
  
  const directives: string[] = [];
  
  // Default or base CSP directives
  if (enableDefaults) {
    directives.push(
      "default-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    );
  }
  
  // Script sources
  const scriptSources = ["'self'", ...scriptSrc];
  if (useNonce && nonce) {
    scriptSources.push(`'nonce-${nonce}'`);
  }
  directives.push(`script-src ${scriptSources.join(' ')}`);
  
  // Style sources
  const styleSources = ["'self'", ...styleSrc];
  if (useNonce && nonce) {
    styleSources.push(`'nonce-${nonce}'`);
  }
  directives.push(`style-src ${styleSources.join(' ')}`);
  
  // Connect sources
  if (connectSrc.length > 0) {
    directives.push(`connect-src 'self' ${connectSrc.join(' ')}`);
  }
  
  // Image sources
  if (imgSrc.length > 0) {
    directives.push(`img-src 'self' data: ${imgSrc.join(' ')}`);
  }
  
  // Font sources
  if (fontSrc.length > 0) {
    directives.push(`font-src 'self' ${fontSrc.join(' ')}`);
  }
  
  return directives.join('; ');
}

/**
 * Generate Permissions Policy header value
 */
function generatePermissionsPolicy(directives: Record<string, string>): string {
  return Object.entries(directives)
    .map(([feature, allowlist]) => `${feature}=${allowlist}`)
    .join(', ');
}

/**
 * Check if a route should be exempt from security headers
 */
function isExemptRoute(pathname: string, exemptRoutes: string[]): boolean {
  return exemptRoutes.some(route => {
    // Exact match
    if (route === pathname) {
      return true;
    }
    
    // Wildcard match
    if (route.endsWith('*')) {
      const prefix = route.slice(0, -1);
      return pathname.startsWith(prefix);
    }
    
    return false;
  });
}

/**
 * Create security header values for a given configuration
 */
export function generateSecurityHeaders(
  options: SecurityOptions = {},
  pathname: string,
): Record<string, string> {
  const config = { ...defaultSecurityOptions, ...options };
  const { exemptRoutes = [] } = config;
  
  // Check if this route is exempt from security headers
  if (isExemptRoute(pathname, exemptRoutes)) {
    return {};
  }
  
  // Generate security headers
  const headers: Record<string, string> = {};
  
  // Generate nonce if needed
  const nonce = config.generateNonce ? generateCSPNonce() : undefined;
  
  // Store nonce in response headers for use in the app
  if (nonce) {
    headers['X-Nonce'] = nonce;
  }
  
  // Content Security Policy
  if (config.csp) {
    const cspValue = generateCSP(config.csp, nonce);
    headers['Content-Security-Policy'] = cspValue;
  }
  
  // HTTP Strict Transport Security
  if (config.hsts) {
    headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';
  }
  
  // Permissions Policy
  if (config.permissionsPolicy && config.permissionsPolicyDirectives) {
    const ppValue = generatePermissionsPolicy(config.permissionsPolicyDirectives);
    headers['Permissions-Policy'] = ppValue;
  }
  
  // Cross-Origin headers
  if (config.coop) {
    headers['Cross-Origin-Opener-Policy'] = 'same-origin';
  }
  
  if (config.coep) {
    headers['Cross-Origin-Embedder-Policy'] = 'require-corp';
  }
  
  if (config.corp) {
    headers['Cross-Origin-Resource-Policy'] = 'same-origin';
  }
  
  // Other security headers
  headers['X-Content-Type-Options'] = 'nosniff';
  headers['X-Frame-Options'] = 'DENY';
  headers['X-XSS-Protection'] = '1; mode=block';
  headers['Referrer-Policy'] = 'strict-origin-when-cross-origin';
  
  return headers;
}

/**
 * Create security middleware with the specified options
 */
export function createSecurityMiddleware(options: SecurityOptions = {}) {
  return async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    
    // Skip security headers for exempt routes
    if (options.exemptRoutes && isExemptRoute(pathname, options.exemptRoutes)) {
      return NextResponse.next();
    }
    
    // Generate security headers
    const headers = generateSecurityHeaders(options, pathname);
    
    // Create response with headers directly
    // @ts-expect-error NextResponse.next() accepts a headers object in newer Next.js versions
    return NextResponse.next({
      headers: headers,
    });
  };
}

/**
 * Edge runtime configuration for the security middleware
 */
export const config = {
  runtime: 'edge',
}; 