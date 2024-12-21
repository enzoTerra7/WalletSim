import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const excludeAuthRoutes = ["/auth/wallet-create"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAuthRoute = path.startsWith("/auth");
  const isIndexRoute = path === "/";
  const isExcludedAuthRoute = excludeAuthRoutes.includes(path);

  const token = (await cookies()).get("token")?.value;

  if (isExcludedAuthRoute && token) {
    return NextResponse.next();
  }

  if (isIndexRoute) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
