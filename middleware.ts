import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // If the request is for the root path
  if (request.nextUrl.pathname === '/') {
    // Redirect to the landing page
    return NextResponse.redirect(new URL('/landing-page', request.url));
  }

  // For all other requests, continue as normal
  return NextResponse.next();
}

// Optionally, you can specify which routes this middleware applies to
export const config = {
  matcher: '/',
};