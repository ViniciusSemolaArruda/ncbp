// app/api/admin/login/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const COOKIE_NAME = "admin_session";

function must(name: string): string {
  const v = process.env[name];
  if (!v || v.length === 0) throw new Error(`ENV:${name}`);
  return v;
}

function getAdminHash(): string | null {
  const b64 = process.env.ADMIN_PASSWORD_HASH_B64?.trim();
  if (b64) {
    try { return Buffer.from(b64, "base64").toString("utf8"); } catch {}
  }
  const raw = process.env.ADMIN_PASSWORD_HASH?.trim(); // fallback opcional
  return raw || null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as unknown));
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const senha =
      typeof body?.senha === "string"
        ? body.senha
        : typeof body?.password === "string"
          ? body.password
          : "";

    if (!email || !senha) {
      return NextResponse.json({ error: "Informe e-mail e senha." }, { status: 400 });
    }

    const ADMIN_EMAIL = must("ADMIN_EMAIL").trim();
    const ADMIN_JWT_SECRET = must("ADMIN_JWT_SECRET").trim();
    const ADMIN_PASSWORD_HASH = getAdminHash();
    if (!ADMIN_PASSWORD_HASH) {
      return NextResponse.json({ error: "Servidor sem senha configurada." }, { status: 500 });
    }

    if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
    }

    const ok = await bcrypt.compare(senha, ADMIN_PASSWORD_HASH);
    if (!ok) {
      return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
    }

    const token = await new SignJWT({ sub: ADMIN_EMAIL, role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("12h")
      .sign(new TextEncoder().encode(ADMIN_JWT_SECRET));

    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
    return res;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("POST /api/admin/login error:", err);
    return NextResponse.json({ error: "Erro ao autenticar." }, { status: 500 });
  }
}
