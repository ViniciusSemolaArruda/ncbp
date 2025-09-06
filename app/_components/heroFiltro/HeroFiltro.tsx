"use client";

import Image from "next/image";
import { useState, FormEvent, ChangeEvent } from "react";
import styles from "./HeroFiltro.module.scss";

export type Filtros = { tipo?: string; abordagem?: string; publico?: string; nome?: string };

export type HeroFiltroProps = {
  onSearch?: (filtros: Filtros) => void;
  initial?: Partial<Filtros>;
  className?: string;
};

export const TIPOS = [
  "Clínico(a)","Escolar / Educacional","Organizacional e do Trabalho (RH)","Hospitalar",
  "Saúde (Atenção Primária / UBS / CAPS)","Neuropsicologia","Jurídico / Forense","Esporte",
  "Social / Comunitária","Trânsito","Perinatal e Parentalidade","Oncológica",
  "Geriatria / Gerontologia","Dependência Química","Sexualidade / Terapia Sexual",
  "Cuidados Paliativos / Dor Crônica",
] as const;

export const ABORDAGENS = [
  "Terapia Cognitivo-Comportamental (TCC)","Psicanálise","Gestalt-terapia",
  "Abordagem Centrada na Pessoa (ACP)","Sistêmica / Familiar / Casal",
  "Terapia Analítico-Comportamental (TAC)","ACT (Aceitação e Compromisso)",
  "DBT (Terapia Dialética Comportamental)","EMDR","Terapia do Esquema",
  "Junguiana (Psicologia Analítica)","Fenomenológico-Existencial",
  "Terapia Focada nas Emoções (EFT)","Terapia Focada na Compaixão (CFT)",
  "Terapia Breve / Focada em Soluções","Mindfulness-based","Psicodrama",
  "ABA (Análise do Comportamento Aplicada)","Hipnoterapia","Brainspotting","Logoterapia",
] as const;

export const PUBLICOS = ["Criança", "Adolescente", "Adulto", "Idoso", "Casal", "Família"] as const;

export default function HeroFiltro({ onSearch, initial, className }: HeroFiltroProps) {
  const [tipo, setTipo] = useState(initial?.tipo ?? "");
  const [abordagem, setAbordagem] = useState(initial?.abordagem ?? "");
  const [publico, setPublico] = useState(initial?.publico ?? "");
  const [nome, setNome] = useState(initial?.nome ?? "");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch?.({ tipo, abordagem, publico, nome });
  };

  const handleChange =
    (setter: (v: string) => void) =>
    (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
      setter(e.target.value);

  const clearAll = () => {
    setTipo(""); setAbordagem(""); setPublico(""); setNome("");
    onSearch?.({ tipo: "", abordagem: "", publico: "", nome: "" });
  };

  return (
    <section className={`${styles.hero} ${className ?? ""}`}>
      {/* Fundo ocupa 100% da width e height da hero */}
      <Image
        src="/images/filtro-hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.bg}
      />

      <div className={styles.content}>
        <h1>Seu cuidado começa aqui</h1>
        <p>
          Refine por tipo de psicólogo(a), abordagem e público para encontrar quem combina com você.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="tipo">Tipo de psicólogo(a)</label>
            <select id="tipo" value={tipo} onChange={handleChange(setTipo)}>
              <option value="">Todos</option>
              {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="abordagem">Abordagem</label>
            <select id="abordagem" value={abordagem} onChange={handleChange(setAbordagem)}>
              <option value="">Todas</option>
              {ABORDAGENS.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="publico">Público-alvo</label>
            <select id="publico" value={publico} onChange={handleChange(setPublico)}>
              <option value="">Todos</option>
              {PUBLICOS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="nome">Buscar por nome</label>
            <input
              id="nome" type="text" placeholder="Ex.: Ana, João..."
              value={nome} onChange={handleChange(setNome)}
            />
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.clear} onClick={clearAll}>Limpar</button>
            <button type="submit" className={styles.submit}>Buscar</button>
          </div>
        </form>
      </div>
    </section>
  );
}
