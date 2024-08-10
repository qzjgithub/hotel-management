import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
 
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