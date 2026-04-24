import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}
const key = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Define Public Routes
  const isPublicRoute = pathname.startsWith("/login") || 
                        pathname.startsWith("/api/auth") ||
                        pathname.includes("."); // static assets

  // 2. Get the session cookie
  const session = request.cookies.get("user_access_token")?.value;

  // 3. Decrypt/Verify session if it exists
  let isValidSession = false;
  if (session) {
    try {
      await jwtVerify(session, key, {
        algorithms: ["HS256"],
      });
      isValidSession = true;
    } catch (err) {
      console.log("Middleware: Invalid or expired session.");
      isValidSession = false;
    }
  }

  console.log(`Middleware: Processing ${pathname} [ValidSession: ${isValidSession}]`);

  // 4. Protection Logic
  if (!isValidSession && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 5. Redirect logged-in users away from login page
  if (isValidSession && pathname === "/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// 6. Set Matcher to target only application routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
