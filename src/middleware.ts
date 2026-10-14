import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, isValidSession } from '@/lib/auth';

// Protect /admin routes (except /admin/login)
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow login page and API routes
  if (pathname === '/admin/login' || pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }

  // Check auth for /admin routes
  if (pathname.startsWith('/admin')) {
    const sessionToken = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    if (!isValidSession(sessionToken)) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
