import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { validateJwt } from "./lib/strapi/strapi"

const PROTECTED_ROUTES = ["/dashboard"]

function checkIsProtectedRoute(path: string) {
  return PROTECTED_ROUTES.some((route) => path.startsWith(route))
}

export async function proxy(request: NextRequest) {
  const currentPath = request.nextUrl.pathname
  const isProtectedRoute = checkIsProtectedRoute(currentPath)

  if (!isProtectedRoute) return NextResponse.next()

  // Protected routes

  try {
    // User has a token
    const cookieStore = await cookies()
    const jwt = cookieStore.get("jwt")?.value

    if (!jwt) {
      return NextResponse.redirect(new URL("/signin", request.url))
    }

    // Validate token
    const isJwtValid = await validateJwt(jwt)

    if (!isJwtValid) {
      console.error("Jwt invalid on proxy, redirecting...")

      cookieStore.delete("jwt")
      return NextResponse.redirect(new URL("/signin", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Error verifying user authentication:", error)
    return NextResponse.redirect(new URL("/signin", request.url))
  }
}

export const config = {
  matcher: [
    "/((?!api/|_next/static|_next/image|favicon.ico).*)", // All routes except api, static, image and favicon
    "/dashboard",
    "/dashboard/:path*",
  ],
}
