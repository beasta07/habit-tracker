import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";
import prisma from "./lib/prisma";

export async function proxy(request: NextRequest) {
  const isAuthPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  const token = request.cookies.get("jwt_token")?.value;
  const sessionCheck = await prisma.session.findFirst({
    where:{
token
    }
  })

  if (!token) {
    if (isAuthPage) return NextResponse.next(); // let them through!
 
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
    const payload = await verifyToken(token);

    if (payload && isAuthPage && sessionCheck) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (payload && sessionCheck) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}
export const config = {
  matcher: ["/","/dashboard/:path*"],
};
