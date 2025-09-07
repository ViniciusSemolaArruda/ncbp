// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "admin_session";

async function verifyJWT(token: string, secret: string) {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return payload;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Libera assets e favicon
  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon")) {
    return NextResponse.next();
  }

  // Protege tudo de /admin/**
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const secret = process.env.ADMIN_JWT_SECRET || "";

    const isLoginPage = pathname === "/admin/login";

    // Se já está logado e tentou abrir /admin/login -> manda para /admin
    if (isLoginPage && token) {
      try {
        await verifyJWT(token, secret);
        return NextResponse.redirect(new URL("/admin", req.url));
      } catch {
        // token inválido: segue para a página de login
      }
    }

    // Para qualquer rota /admin (exceto /admin/login), exige token
    if (!isLoginPage) {
      if (!token) {
        const url = new URL("/admin/login", req.url);
        url.searchParams.set("unauthorized", "1");
        return NextResponse.redirect(url);
      }
      try {
        await verifyJWT(token, secret);
        return NextResponse.next();
      } catch {
        const url = new URL("/admin/login", req.url);
        url.searchParams.set("unauthorized", "1");
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
