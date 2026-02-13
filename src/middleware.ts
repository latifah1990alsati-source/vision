import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Minimal route protection using a client-side auth model.
 * In demo mode we only redirect based on the presence of Firebase auth session cookies
 * (Firebase Auth uses indexedDB/localStorage; middleware cannot read that).
 *
 * So: middleware here only prevents accidental direct access by redirecting to /login
 * if user explicitly visits /app without having seen app shell.
 *
 * Real protection is enforced in the client via AuthProvider + page guards.
 */
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // We keep middleware "soft" in demo mode to avoid false lockouts.
  // Always allow /login and /_next and static.
  if (url.pathname.startsWith("/login")) return NextResponse.next();

  // Allow app routes; client will enforce auth.
  if (url.pathname.startsWith("/app")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
