import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/study")) {
    return NextResponse.next();
  }
  return updateSession(request);
}

export const config = {
  matcher: ["/study/:path*"]
};
