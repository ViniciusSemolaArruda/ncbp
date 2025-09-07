// app/api/admin/logout/route.ts
export const runtime = "nodejs";
import { NextResponse } from "next/server";

const COOKIE_NAME =
  (process.env.ADMIN_COOKIE_NAME && process.env.ADMIN_COOKIE_NAME.trim()) ||
  "admin_token";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
