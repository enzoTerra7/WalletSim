import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { UserType } from "./hooks/getUser";

const excludeAuthRoutes = ["/auth/wallet-create"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAuthRoute = path.startsWith("/auth");
  const isIndexRoute = path === "/";
  const isExcludedAuthRoute = excludeAuthRoutes.includes(path);

  const token = (await cookies()).get("token")?.value;
  const user = (await cookies()).get("user")?.value;

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

  if (!isAuthRoute && !isExcludedAuthRoute) {
    if (user) {
      const parsedUser = JSON.parse(user) as UserType;

      if (parsedUser.Wallet.length <= 0 && parsedUser.activeWallet <= 0) {
        return NextResponse.redirect(
          new URL(excludeAuthRoutes[0], req.nextUrl)
        );
      }
    }
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
