"use client";

import Image from "next/image";
import styles from "./ResultadoBusca.module.scss";

export type Profissional = {
  id: string;
  nome: string;
  titulo?: string;              // "Psicóloga" | "Psicólogo"
  crp?: string;                 // "06/77409"
  fotoUrl?: string;
  preco?: number;               // 30 -> R$30
  temas?: string[];             // chips (ex.: "Ansiedade", "Depressão"...)
  abordagem?: string;           // ex.: "Terapia Cognitivo Comportamental - TCC"
  publicos?: string[];          // ex.: ["Adultos", "Casal"]
  sobre?: string;               // bio
  urlPerfil?: string;           // /profissional/slug
  telefone?: string;            // "(19) 99006-1035" ou "+55..."
};

export type ResultadoBuscaProps = {
  itens: Profissional[];
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
};

const money = (v?: number) =>
  typeof v === "number" ? `R$${v.toFixed(0)}` : "";

const onlyDigits = (s = "") => s.replace(/\D+/g, "");
const waLink = (telefone?: string, nome?: string) => {
  const digits = onlyDigits(telefone);
  if (!digits) return undefined;
  const withCountry = digits.startsWith("55") ? digits : `55${digits}`;
  const msg = encodeURIComponent(
    `Olá${nome ? `, ${nome}` : ""}! Gostaria de saber mais sobre as consultas.`
  );
  return `https://wa.me/${withCountry}?text=${msg}`;
};

function IconPessoas() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M16 11c1.66 0 3-1.79 3-4s-1.34-4-3-4s-3 1.79-3 4s1.34 4 3 4m-8 0c1.66 0 3-1.79 3-4S9.66 3 8 3S5 4.79 5 7s1.34 4 3 4m0 2c-2.33 0-7 1.17-7 3.5V20h7v-1.5c0-.57.18-1.1.5-1.57c-.65-.26-1.36-.43-2.09-.53c.64-.25 1.34-.4 2.09-.4c.47 0 .93.05 1.36.12c.41-.36.88-.65 1.41-.86C10.47 14.32 9.27 13 8 13m8 0c-1.58 0-4.73.79-4.98 2.64c1.37.58 2.48 1.63 2.98 2.86V20h10v-1.5C24 14.17 19.33 13 16 13Z"/>
    </svg>
  );
}

export default function ResultadoBusca({
  itens,
  loading,
  emptyMessage = "Nenhum profissional encontrado no momento.",
  className,
}: ResultadoBuscaProps) {
  return (
    <section className={`${styles.wrap} ${className ?? ""}`}>
      {loading && itens.length === 0 && (
        <article className={`${styles.card} ${styles.skeleton}`} aria-busy>
          <div className={styles.left}>
            <div className={styles.avatarSk} />
            <div className={styles.priceSk} />
          </div>
          <div className={styles.right}>
            <div className={styles.lineSk} />
            <div className={styles.chipsSk} />
            <div className={styles.multiSk} />
            <div className={styles.bioSk} />
          </div>
        </article>
      )}

      {!loading && itens.length === 0 && (
        <div className={styles.empty}>{emptyMessage}</div>
      )}

      {itens.map((p) => {
        const preco = money(p.preco);
        const whats = waLink(p.telefone, p.nome);

        return (
          <article key={p.id} className={styles.card}>
            <span className={styles.crp}>{p.crp ? `CRP: ${p.crp}` : ""}</span>

            {/* Coluna esquerda */}
            <aside className={styles.left}>
              <div className={styles.avatar}>
                {p.fotoUrl ? (
                  <Image
                    src={p.fotoUrl}
                    alt={p.nome}
                    fill
                    sizes="120px"
                    className={styles.avatarImg}
                  />
                ) : null}
              </div>
              {preco && <div className={styles.price}>{preco}</div>}
            </aside>

            {/* Coluna direita */}
            <div className={styles.right}>
              <header className={styles.header}>
                <h3 className={styles.nome}>{p.nome}</h3>
                <div className={styles.titulo}>{p.titulo ?? "Psicólogo(a)"}</div>
              </header>

              {/* Chips de temas */}
              {p.temas?.length ? (
                <div className={styles.chips}>
                  {p.temas.map((t) => (
                    <span key={t} className={styles.chip}>
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}

              {/* Abordagem + Públicos */}
              <div className={styles.lineInfo}>
                {p.abordagem && (
                  <div>
                    <strong>Abordagem:</strong> {p.abordagem}
                  </div>
                )}
                {p.publicos?.length ? (
                  <div className={styles.publico}>
                    <IconPessoas /> {p.publicos.join(", ")}
                  </div>
                ) : null}
              </div>

              {/* Sobre mim */}
              {p.sobre && (
                <div className={styles.sobre}>
                  <strong>Sobre mim:</strong>
                  <p className={styles.bio} title={p.sobre}>{p.sobre}</p>
                </div>
              )}

              {/* Ações */}
              <div className={styles.actionsRow}>
                {p.urlPerfil && (
                  <a className={styles.linkPerfil} href={p.urlPerfil}>
                    Ver perfil <span aria-hidden>→</span>
                  </a>
                )}
                <div className={styles.ctaWrap}>
                  {whats ? (
                    <>
                      <a className={styles.btnWhats} href={whats} target="_blank">
                        Quero me consultar
                        <svg
                          width="18" height="18" viewBox="0 0 24 24" aria-hidden
                          style={{ marginLeft: 8 }}
                        >
                          <path fill="currentColor" d="M20.52 3.48A11.77 11.77 0 0 0 12 .75A11.25 11.25 0 0 0 1 12a11 11 0 0 0 1.64 5.8L1 23l5.33-1.6A11.25 11.25 0 0 0 12 23a11 11 0 0 0 11-11a11.77 11.77 0 0 0-2.48-8.52M12 21a9.3 9.3 0 0 1-4.75-1.3l-.34-.2l-3.16.95l.92-3.07l-.22-.36A9.3 9.3 0 0 1 3 12a9.5 9.5 0 0 1 9-9a9.75 9.75 0 0 1 9 9a9.5 9.5 0 0 1-9 9m5.22-6.42c-.28-.16-1.67-.9-1.93-1s-.45-.16-.64.16s-.74 1-.9 1.25s-.34.24-.62.08a7.5 7.5 0 0 1-3.33-2.9c-.25-.42.25-.39.7-1.31a.54.54 0 0 0 0-.5c-.07-.16-.62-1.54-.85-2.1c-.21-.52-.43-.45-.62-.46h-.53a1 1 0 0 0-.71.33a2.94 2.94 0 0 0-.92 2.18a5.13 5.13 0 0 0 1.08 2.74a11.7 11.7 0 0 0 4.48 4.07a15.33 15.33 0 0 0 1.5.55a3.6 3.6 0 0 0 1.66.1a2.71 2.71 0 0 0 1.79-1.28a2.2 2.2 0 0 0 .15-1.28c-.13-.15-.25-.21-.53-.37"/>
                        </svg>
                      </a>
                      <span className={styles.tel}>
                        Telefone: {p.telefone}
                      </span>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
