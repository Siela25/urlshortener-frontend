import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define routes that require authentication
const protectedRoutes = ['/dashboard', '/analytics', '/settings'];

// Define routes that should redirect authenticated users
const authRoutes = ['/login', '/register'];

// Define public routes that don't need any special handling
const publicRoutes = ['/', '/contact', '/docs', '/pricing'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if user has authentication token
  const token = request.cookies.get('auth-token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');

  const isAuthenticated = !!token;

  // Handle protected routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('returnUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Handle auth routes (login, register)
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (isAuthenticated) {
      // Redirect authenticated users away from auth pages
      const returnUrl = request.nextUrl.searchParams.get('returnUrl') || '/dashboard';
      return NextResponse.redirect(new URL(returnUrl, request.url));
    }
  }

  // Handle short code redirects (e.g., /abc123)
  if (pathname.length > 1 && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
    // Check if this looks like a short code (no slashes, reasonable length)
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 1 && segments[0].length >= 3 && segments[0].length <= 20) {
      // This might be a short code, let the app handle it
      return NextResponse.next();
    }
  }

  // Add security headers
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Add CORS headers for API routes
  if (pathname.startsWith('/api')) {
    response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_APP_URL || '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, icons, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};