"use client";

import { useMemo, useState, FormEvent } from "react";
import styles from "./Inscrever.module.scss";

/** Todas as especialidades (áreas de atuação) possíveis */
export const ESPECIALIDADES: string[] = [
  "Clínico(a)",
  "Escolar / Educacional",
  "Organizacional e do Trabalho (RH)",
  "Hospitalar",
  "Saúde (Atenção Primária / UBS / CAPS)",
  "Neuropsicologia",
  "Jurídico / Forense",
  "Esporte",
  "Social / Comunitária",
  "Trânsito",
  "Perinatal e Parentalidade",
  "Oncológica",
  "Geriatria / Gerontologia",
  "Dependência Química",
  "Sexualidade / Terapia Sexual",
  "Cuidados Paliativos / Dor Crônica",
];

/** Todas as abordagens terapêuticas possíveis */
export const ABORDAGENS: string[] = [
  "Terapia Cognitivo-Comportamental (TCC)",
  "Psicanálise",
  "Gestalt-terapia",
  "Abordagem Centrada na Pessoa (ACP)",
  "Sistêmica / Familiar / Casal",
  "Terapia Analítico-Comportamental (TAC)",
  "ACT (Aceitação e Compromisso)",
  "DBT (Terapia Dialética Comportamental)",
  "EMDR",
  "Terapia do Esquema",
  "Junguiana (Psicologia Analítica)",
  "Fenomenológico-Existencial",
  "Terapia Focada nas Emoções (EFT)",
  "Terapia Focada na Compaixão (CFT)",
  "Terapia Breve / Focada em Soluções",
  "Mindfulness-based",
  "Psicodrama",
  "ABA (Análise do Comportamento Aplicada)",
  "Hipnoterapia",
  "Brainspotting",
  "Logoterapia",
];

export type InscreverPayload = {
  nome: string;
  telefone?: string;
  email: string;
  crp: string;
  especialidades: string[];
  abordagens: string[];
  aceito: boolean;
};

export type InscreverProps = {
  onSubmit?: (dados: InscreverPayload) => void | Promise<void>;
  className?: string;
  initial?: Partial<InscreverPayload>;
};

export default function Inscrever({ onSubmit, className, initial }: InscreverProps) {
  const [nome, setNome] = useState(initial?.nome ?? "");
  const [telefone, setTelefone] = useState(initial?.telefone ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [crp, setCrp] = useState(initial?.crp ?? "");
  const [especialidades, setEspecialidades] = useState<string[]>(
    initial?.especialidades ?? []
  );
  const [abordagens, setAbordagens] = useState<string[]>(
    initial?.abordagens ?? []
  );
  const [aceito, setAceito] = useState<boolean>(!!initial?.aceito);

  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [errs, setErrs] = useState<Record<string, string>>({});

  const toggle =
    (list: string[], setList: (v: string[]) => void) => (v: string) => {
      setList(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
    };

  const allEspSelected = useMemo(
    () => especialidades.length === ESPECIALIDADES.length,
    [especialidades]
  );
  const allAboSelected = useMemo(
    () => abordagens.length === ABORDAGENS.length,
    [abordagens]
  );

  const selectAll = (
    all: boolean,
    allValues: string[],
    setList: (v: string[]) => void
  ) => setList(all ? [] : [...allValues]);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!nome.trim()) e.nome = "Informe seu nome.";
    if (!email.trim()) e.email = "Informe um e-mail válido.";
    if (!crp.trim()) e.crp = "Informe seu CRP.";
    const crpOk = /^\d{2}\/\d{4,6}$/.test(crp.trim());
    if (crp && !crpOk) e.crp = "Formato do CRP esperado: 00/00000";
    if (!aceito) e.aceito = "É necessário aceitar os termos.";
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setOk(null);
    if (!validate()) return;

    const payload: InscreverPayload = {
      nome: nome.trim(),
      telefone: telefone.trim() || undefined,
      email: email.trim(),
      crp: crp.trim(),
      especialidades,
      abordagens,
      aceito,
    };

    try {
      setSending(true);
      await onSubmit?.(payload);
      setOk("Inscrição enviada com sucesso!");
    } catch {
      setOk("Não foi possível enviar agora. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={`${styles.wrap} ${className ?? ""}`}>
        <h2 className={styles.title}>Inscreva-se</h2>
        <p className={styles.subtitle}>
          Preencha seus dados para participar da nossa rede de profissionais.
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Nome */}
          <div className={styles.field}>
            <label htmlFor="nome">Nome*</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              aria-invalid={!!errs.nome}
            />
            {errs.nome && <span className={styles.err}>{errs.nome}</span>}
          </div>

          {/* Telefone */}
          <div className={styles.field}>
            <label htmlFor="telefone">Telefone</label>
            <input
              id="telefone"
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(11) 99999-0000"
            />
          </div>

          {/* E-mail */}
          <div className={styles.field}>
            <label htmlFor="email">E-mail*</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@exemplo.com"
              aria-invalid={!!errs.email}
            />
            {errs.email && <span className={styles.err}>{errs.email}</span>}
          </div>

          {/* CRP */}
          <div className={styles.field}>
            <label htmlFor="crp">CRP*</label>
            <input
              id="crp"
              type="text"
              value={crp}
              onChange={(e) => setCrp(e.target.value)}
              placeholder="00/00000"
              title="Formato: 00/00000"
              aria-invalid={!!errs.crp}
            />
            {errs.crp && <span className={styles.err}>{errs.crp}</span>}
          </div>

          {/* Especialidades */}
          <div className={styles.fieldFull}>
            <div className={styles.legendRow}>
              <label>Especialidade(s)</label>
              <button
                type="button"
                className={styles.micro}
                onClick={() =>
                  selectAll(allEspSelected, ESPECIALIDADES, setEspecialidades)
                }
              >
                {allEspSelected ? "Limpar todas" : "Selecionar todas"}
              </button>
            </div>
            <div className={styles.checkboxList}>
              {ESPECIALIDADES.map((esp) => {
                const id = `esp-${esp}`;
                const checked = especialidades.includes(esp);
                return (
                  <label
                    key={esp}
                    htmlFor={id}
                    className={`${styles.check} ${checked ? styles.on : ""}`}
                  >
                    <input
                      id={id}
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        toggle(especialidades, setEspecialidades)(esp)
                      }
                    />
                    <span>{esp}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Abordagens */}
          <div className={styles.fieldFull}>
            <div className={styles.legendRow}>
              <label>Abordagem(ns)</label>
              <button
                type="button"
                className={styles.micro}
                onClick={() =>
                  selectAll(allAboSelected, ABORDAGENS, setAbordagens)
                }
              >
                {allAboSelected ? "Limpar todas" : "Selecionar todas"}
              </button>
            </div>
            <div className={styles.checkboxList}>
              {ABORDAGENS.map((abo) => {
                const id = `abo-${abo}`;
                const checked = abordagens.includes(abo);
                return (
                  <label
                    key={abo}
                    htmlFor={id}
                    className={`${styles.check} ${checked ? styles.on : ""}`}
                  >
                    <input
                      id={id}
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(abordagens, setAbordagens)(abo)}
                    />
                    <span>{abo}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Termos */}
          <div className={styles.terms}>
            <label className={styles.termsLabel}>
              <input
                type="checkbox"
                checked={aceito}
                onChange={(e) => setAceito(e.target.checked)}
                aria-invalid={!!errs.aceito}
              />
              <span>
                Li os{" "}
                <a href="/termos" target="_blank" rel="noopener noreferrer">
                  termos de uso
                </a>{" "}
                e a{" "}
                <a
                  href="/privacidade"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  política de privacidade
                </a>{" "}
                e estou de acordo.
              </span>
            </label>
            {errs.aceito && <span className={styles.err}>{errs.aceito}</span>}
          </div>

          {/* Ações */}
          <div className={styles.actions}>
            <button type="submit" className={styles.submit} disabled={sending}>
              {sending ? "Enviando..." : "Inscrever"}
            </button>
          </div>

          {ok && <div className={styles.feedback}>{ok}</div>}
        </form>
      </div>
    </section>
  );
}
