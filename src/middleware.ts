import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  // // Get the token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // Check if the user is logged in
  if (!token) {
    // Redirect to the homepage if the user is not authenticated
    return NextResponse.redirect(new URL('/', req.url))
  }

  // // Allow access if the user is authenticated
  return NextResponse.next()
}

// Specify the paths for which the middleware will run
export const config = {
  matcher: ['/dashboard/:path*'] // Apply to all routes under /dashboard
}
