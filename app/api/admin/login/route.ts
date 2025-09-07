// app/api/admin/login/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const COOKIE_NAME =
  (process.env.ADMIN_COOKIE_NAME && process.env.ADMIN_COOKIE_NAME.trim()) ||
  "admin_token"; // mantenha consistente com middleware/logout

const enc = new TextEncoder();

function must(name: string): string {
  const v = process.env[name];
  if (!v || v.trim().length === 0) {
    throw new Error(`Missing env: ${name}`);
  }
  return v.trim();
}

function getAdminHash(): string | null {
  const b64 = process.env.ADMIN_PASSWORD_HASH_B64?.trim();
  if (b64) {
    try {
      return Buffer.from(b64, "base64").toString("utf8");
    } catch {
      // ignora e tenta o fallback
    }
  }
  const raw = process.env.ADMIN_PASSWORD_HASH?.trim();
  return raw || null;
}

export async function POST(req: Request) {
  try {
    // Parse seguro do body
    let email = "";
    let senha = "";
    try {
      const body = await req.json();
      email = typeof body?.email === "string" ? body.email.trim() : "";
      senha =
        typeof body?.senha === "string"
          ? body.senha
          : typeof body?.password === "string"
          ? body.password
          : "";
    } catch {
      // body inválido
    }

    if (!email || !senha) {
      return NextResponse.json(
        { error: "Informe e-mail e senha." },
        { status: 400 }
      );
    }

    const ADMIN_EMAIL = must("ADMIN_EMAIL").toLowerCase();
    const ADMIN_JWT_SECRET = must("ADMIN_JWT_SECRET");
    const ADMIN_PASSWORD_HASH = getAdminHash();

    if (!ADMIN_PASSWORD_HASH) {
      return NextResponse.json(
        { error: "Servidor sem senha configurada." },
        { status: 500 }
      );
    }

    // Compara email (case-insensitive)
    const emailOk = email.toLowerCase() === ADMIN_EMAIL;
    // Só compara a senha se o email bateu
    const passOk = emailOk
      ? await bcrypt.compare(senha, ADMIN_PASSWORD_HASH)
      : false;

    if (!emailOk || !passOk) {
      return NextResponse.json(
        { error: "Credenciais inválidas." },
        { status: 401 }
      );
    }

    // Gera JWT (12h)
    const token = await new SignJWT({ sub: ADMIN_EMAIL, role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("12h")
      .sign(enc.encode(ADMIN_JWT_SECRET));

    const res = NextResponse.json({ ok: true });
    res.headers.set("cache-control", "no-store");
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12, // 12h
      priority: "high",
    });
    return res;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("POST /api/admin/login error:", err);
    return NextResponse.json({ error: "Erro ao autenticar." }, { status: 500 });
  }
}
