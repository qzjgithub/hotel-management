import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getServerSession } from "next-auth/next"
import { getCsrfToken } from "next-auth/react"
import { authOptions } from './libs/auth';
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { db } from './libs/db';
 
// This function can be marked `async` if using `await` inside
async function middleware(request: NextRequest, response: NextResponse) {
  const session = await getCsrfToken({ req: request as any});
  console.log(session);
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-hello-from-middleware1', 'hello');
  // const response = NextResponse.next({
  //   request: {
  //     // New request headers
  //     headers: requestHeaders,
  //   },
  // });
  // return response;
  return NextResponse.json({
    success: true,
    data: 'test'
  });
}
export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    if (!token || !token.email || !token.isAdmin) {
      return NextResponse.json({
        success: false,
        data: 'No permissions'
      });
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  }
);
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/admin/:path*',
}