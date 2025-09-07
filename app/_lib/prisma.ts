import { PrismaClient } from "@prisma/client"

declare global {
  // Evita múltiplas instâncias em hot-reload no dev
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const db =
  global.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") global.prisma = db
