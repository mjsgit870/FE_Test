import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authenticatedRoutes = ["/dashboard", "/master-data"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authToken = request.cookies.get("auth_token")?.value;

  const isAuthenticatedRoute = authenticatedRoutes.some((route) => pathname.startsWith(route));
  const isLoginRoute = pathname.startsWith("/login");

  // If on login route and already authenticated, redirect to dashboard
  if (isLoginRoute && authToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If on authenticated route without token, redirect to login
  if (isAuthenticatedRoute && !authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/master-data/:path*", "/login"],
};
