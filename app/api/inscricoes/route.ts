//app\api\inscricoes\route.ts
export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"
import { db } from "@/app/_lib/prisma"

type Payload = {
  nome: string
  telefone?: string
  email: string
  crp: string
  especialidades: string[]
  abordagens: string[]
  aceito: boolean
  termsVersion?: string
  source?: string
}

function getClientIp(req: Request): string | undefined {
  const fwd = req.headers.get("x-forwarded-for")
  if (fwd && fwd.length > 0) {
    const ip = fwd.split(",")[0]?.trim()
    return ip || undefined
  }
  const real = req.headers.get("x-real-ip")
  return real || undefined
}

function isValidCrp(crp: string): boolean {
  // Aceita formatos 00/00000 e 00/000000
  return /^\d{2}\/\d{5,6}$/.test(crp)
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Payload>

    // --- Validações mínimas (backend) ---
    const nome = body?.nome?.trim() ?? ""
    const email = body?.email?.trim().toLowerCase() ?? ""
    const crp = body?.crp?.trim() ?? ""
    const aceito = Boolean(body?.aceito)

    if (!nome) return NextResponse.json({ error: "Nome é obrigatório." }, { status: 400 })
    if (!email) return NextResponse.json({ error: "E-mail é obrigatório." }, { status: 400 })
    if (!crp) return NextResponse.json({ error: "CRP é obrigatório." }, { status: 400 })
    if (!isValidCrp(crp)) {
      return NextResponse.json({ error: "Formato do CRP esperado: 00/00000 ou 00/000000." }, { status: 400 })
    }
    if (!aceito) {
      return NextResponse.json({ error: "É necessário aceitar os termos." }, { status: 400 })
    }

    const especialidades = Array.isArray(body?.especialidades) ? body!.especialidades! : []
    const abordagens = Array.isArray(body?.abordagens) ? body!.abordagens! : []

    const ip = getClientIp(req)

    const created = await db.psychologistApplication.create({
      data: {
        nome,
        telefone: body?.telefone?.trim() || null,
        email,
        crp,
        especialidades,
        abordagens,
        aceito,
        termsVersion: body?.termsVersion ?? null,
        source: body?.source ?? "inscrever",
        ip: ip ?? null,
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ ok: true, ...created }, { status: 201 })
  } catch (err: unknown) {
    // Erros conhecidos do Prisma (ex.: unicidade)
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        const target = (err.meta?.target as string[] | undefined) ?? []
        if (target.includes("email")) {
          return NextResponse.json({ error: "Este e-mail já está inscrito." }, { status: 409 })
        }
        if (target.includes("crp")) {
          return NextResponse.json({ error: "Este CRP já está inscrito." }, { status: 409 })
        }
        return NextResponse.json({ error: "Registro duplicado." }, { status: 409 })
      }
    }

    // Loga no server e responde genérico
    // eslint-disable-next-line no-console
    console.error("POST /api/inscricoes error:", err)
    return NextResponse.json({ error: "Erro ao salvar inscrição." }, { status: 500 })
  }
}
