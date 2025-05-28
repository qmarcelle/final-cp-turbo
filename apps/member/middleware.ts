import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify, createRemoteJWKSet, JWTPayload } from 'jose';

// Define the expected payload structure if you need to access claims from it
interface VerifiedJWTPayload extends JWTPayload {
  // Add specific claims you expect, e.g.:
  // scope?: string;
  // roles?: string[];
}

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  // Allow NextAuth specific paths and public paths to pass through
  if (pathname.startsWith('/api/auth') || pathname === '/' || pathname === '/login') {
    return NextResponse.next();
  }

  const token = req.cookies.get('next-auth.session-token')?.value || 
                req.cookies.get('__Secure-next-auth.session-token')?.value;

  if (!token) {
    console.log('Middleware: No session token found, redirecting to login.');
    return NextResponse.redirect(`${origin}/login`);
  }

  const jwksUrl = process.env.JWKS_ENDPOINT;
  const issuer = process.env.NEXTAUTH_URL; // Should be your app's URL
  // const audience = process.env.NEXTAUTH_JWT_AUDIENCE || 'accounts'; // Make audience configurable if needed

  if (!jwksUrl) {
    console.error('Middleware: JWKS_ENDPOINT environment variable is not set.');
    // Potentially redirect to an error page or allow access if misconfigured (less secure)
    return NextResponse.redirect(`${origin}/login?error=ConfigurationError`); 
  }
  if (!issuer) {
    console.error('Middleware: NEXTAUTH_URL environment variable is not set for JWT issuer validation.');
    return NextResponse.redirect(`${origin}/login?error=ConfigurationError`);
  }

  try {
    const JWKS = createRemoteJWKSet(new URL(jwksUrl));
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: issuer,
      // audience: audience, // Uncomment if you are using audience validation
      // algorithms: ['RS256'], // Specify algorithms if necessary, jose defaults to alg from JWK
    });

    // console.log('Middleware: JWT verified successfully, payload:', payload);
    // At this point, `payload` is the VerifiedJWTPayload (if you cast it)
    // You could potentially enrich the request headers here if needed
    // const requestHeaders = new Headers(req.headers);
    // requestHeaders.set('x-user-id', payload.sub || '');
    // return NextResponse.next({ request: { headers: requestHeaders } });

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware: JWT verification failed:', error);
    let redirectPath = `${origin}/login?error=InvalidToken`;
    // @ts-ignore
    if (error.code === 'ERR_JWKS_TIMEOUT' || error.code === 'ERR_JWKS_NO_MATCHING_KEY') {
      redirectPath = `${origin}/login?error=JWKSUnavailable`;
    // @ts-ignore
    } else if (error.code === 'ERR_JWT_EXPIRED') {
      redirectPath = `${origin}/login?error=TokenExpired`;
    }
    return NextResponse.redirect(redirectPath);
  }
}

export const config = {
  // Match all paths except for static files, images, and favicon
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|login|api/auth/).*)',
  ],
}; 