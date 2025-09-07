// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_PREFIX = "/admin";
const ADMIN_LOGIN = "/admin/login";
const COOKIE_NAME =
  (process.env.ADMIN_COOKIE_NAME && process.env.ADMIN_COOKIE_NAME.trim()) ||
  "admin_token"; // <<-- mantenha igual ao route.ts de login/logout

async function verifyJWT(token?: string) {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!token || !secret) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Protege apenas rotas /admin (o matcher já ignora /api e arquivos com extensão)
  if (pathname.startsWith(ADMIN_PREFIX)) {
    const isLoginPage = pathname === ADMIN_LOGIN;
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const authed = await verifyJWT(token);

    if (!authed && !isLoginPage) {
      const url = req.nextUrl.clone();
      url.pathname = ADMIN_LOGIN;
      url.searchParams.set("unauthorized", "1");
      // opcional: voltar para a página desejada após login
      url.searchParams.set("next", pathname + (search || ""));
      return NextResponse.redirect(url);
    }

    if (authed && isLoginPage) {
      const url = req.nextUrl.clone();
      url.pathname = ADMIN_PREFIX;
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Ignora /api, _next e QUALQUER arquivo com extensão (ex.: .png, .svg, .css, .js, .webmanifest, etc.)
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
