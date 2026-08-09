import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const SESSION_COOKIE = "voxlore_token"

const PROTECTED_PATHS = [
  "/home",
  "/explore",
  "/events",
  "/dashboard",
  "/culture",
  "/favorites",
  "/downloads",
  "/notifications",
  "/packages",
  "/profile",
  "/scan",
  "/security",
  "/help",
]

function isProtected(pathname: string): boolean {
  return PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  )
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasToken = request.cookies.has(SESSION_COOKIE)

  if (isProtected(pathname) && !hasToken) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("next", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/home/:path*",
    "/explore/:path*",
    "/events/:path*",
    "/dashboard/:path*",
    "/culture/:path*",
    "/favorites/:path*",
    "/downloads/:path*",
    "/notifications/:path*",
    "/packages/:path*",
    "/profile/:path*",
    "/scan/:path*",
    "/security/:path*",
    "/help/:path*",
  ],
}