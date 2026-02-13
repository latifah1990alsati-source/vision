import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Proxy (Next.js 16+)
 * Demo mode: we do NOT enforce auth at the edge here.
 * Auth is handled in the client (Firebase Auth state).
 */
export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
