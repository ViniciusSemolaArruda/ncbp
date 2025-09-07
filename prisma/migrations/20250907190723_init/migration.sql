-- CreateEnum
CREATE TYPE "public"."ApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "public"."PsychologistApplication" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nome" VARCHAR(200) NOT NULL,
    "telefone" VARCHAR(30),
    "email" VARCHAR(320) NOT NULL,
    "crp" VARCHAR(20) NOT NULL,
    "especialidades" TEXT[],
    "abordagens" TEXT[],
    "aceito" BOOLEAN NOT NULL,
    "consentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "termsVersion" VARCHAR(32),
    "status" "public"."ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "source" VARCHAR(100),
    "ip" INET,

    CONSTRAINT "PsychologistApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PsychologistApplication_email_key" ON "public"."PsychologistApplication"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PsychologistApplication_crp_key" ON "public"."PsychologistApplication"("crp");

-- CreateIndex
CREATE INDEX "PsychologistApplication_createdAt_idx" ON "public"."PsychologistApplication"("createdAt");

-- CreateIndex
CREATE INDEX "PsychologistApplication_status_idx" ON "public"."PsychologistApplication"("status");
