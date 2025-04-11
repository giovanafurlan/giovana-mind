import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.headers.get("authorization");

  if (request.nextUrl.pathname.startsWith("/api/facts")) {
    if (authToken !== `Bearer ${process.env.ADMIN_TOKEN}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}
