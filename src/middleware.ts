import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes requiring authentication
const protectedPaths = [
  '/dashboard',
  '/onboarding',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if current route is protected
  const isProtected = protectedPaths.some((prefix) => pathname.startsWith(prefix));

  if (isProtected) {
    const sessionCookie = request.cookies.get('a2_session')?.value;

    if (!sessionCookie) {
      // Redirect unauthenticated guests to login with return path
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/onboarding/:path*',
  ],
};
