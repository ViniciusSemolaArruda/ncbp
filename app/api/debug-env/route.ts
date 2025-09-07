// app/api/debug-env/route.ts
import { NextResponse } from "next/server";
export async function GET() {
  const b64 = process.env.ADMIN_PASSWORD_HASH_B64;
  const fromB64 = b64 ? Buffer.from(b64, "base64").toString("utf8") : "";
  return NextResponse.json({
    ADMIN_EMAIL_present: !!process.env.ADMIN_EMAIL,
    HASH_B64_present: !!b64,
    HASH_prefix_from_B64: fromB64.slice(0, 7), // deve ser "$2b$12"
    ADMIN_JWT_SECRET_length: (process.env.ADMIN_JWT_SECRET || "").length,
  });
}
