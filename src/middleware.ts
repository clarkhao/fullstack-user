// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  console.log(`from middleware, token in cookie: ${JSON.stringify(token)}`);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/auth', '/api/auth/logout', '/api/users/:path*']
}