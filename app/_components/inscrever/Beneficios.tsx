"use client";

import styles from "./Beneficios.module.scss";

type IconName =
  | "alcance"
  | "verificado"
  | "agenda"
  | "seguranca"
  | "divulgacao"
  | "suporte";

export type Benefit = {
  icon: IconName;
  title: string;
  text: string;
};

export type BeneficiosProps = {
  className?: string;
  title?: string;
  subtitle?: string;
  items?: Benefit[];
  /** id do alvo para rolar (ex.: "form") */
  scrollTargetId?: string;
  ctaText?: string;
};

const defaultBenefits: Benefit[] = [
  {
    icon: "alcance",
    title: "Alcance novos pacientes",
    text: "Seu perfil aparece nas buscas por tipo, abordagem e público, ampliando sua visibilidade.",
  },
  {
    icon: "verificado",
    title: "Perfil completo e verificado",
    text: "Dados profissionais, CRP e áreas de atuação organizados com clareza e credibilidade.",
  },
  {
    icon: "agenda",
    title: "Flexibilidade de agenda",
    text: "Você define disponibilidade, formatos e preferências de atendimento online.",
  },
  {
    icon: "seguranca",
    title: "Privacidade e segurança",
    text: "Processos alinhados à LGPD e compromisso com ética e confidencialidade.",
  },
  {
    icon: "divulgacao",
    title: "Divulgação contínua",
    text: "Apareça em campanhas temáticas e páginas de conteúdo para temas relevantes.",
  },
  {
    icon: "suporte",
    title: "Suporte humano",
    text: "Time disponível para ajudar com cadastro, ajustes no perfil e boas práticas.",
  },
];

function Icon({ name }: { name: IconName }) {
  switch (name) {
    case "alcance":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M12 2a10 10 0 1 0 10 10h-2A8 8 0 1 1 12 4V2m0 4a6 6 0 1 0 6 6h-2a4 4 0 1 1-4-4V6m7 1l-7 7l-3-3l1.41-1.41L12 11.17l5.59-5.59L19 7Z"
          />
        </svg>
      );
    case "verificado":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="m12 1l3.09 6.26L22 8.27l-5 4.87L18.18 21L12 17.77L5.82 21L7 13.14l-5-4.87l6.91-1.01L12 1m-1.2 12.53l5.66-5.66l-1.41-1.41l-4.25 4.24l-1.9-1.9l-1.41 1.41l3.31 3.32Z"
          />
        </svg>
      );
    case "agenda":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M7 2h2v2h6V2h2v2h3a1 1 0 0 1 1 1v15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h3V2m13 8H4v10h16V10m-5 2v2h-2v-2h2Z"
          />
        </svg>
      );
    case "seguranca":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M12 1l7 4v6c0 5-3.8 9.74-7 11c-3.2-1.26-7-6-7-11V5l7-4m0 3.18L7 6.47V11c0 3.71 2.73 7.62 5 8.89c2.27-1.27 5-5.18 5-8.89V6.47l-5-2.29M11 7h2v5h-2V7m0 6h2v2h-2v-2Z"
          />
        </svg>
      );
    case "divulgacao":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M14 3v14a4 4 0 1 1-8 0V7H3V5h3V3h2v2h6m4 4h3v2h-3v4h-2V7h2v2Z"
          />
        </svg>
      );
    case "suporte":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M12 2a7 7 0 0 1 7 7v3a3 3 0 0 1-3 3h-1v-2h1a1 1 0 0 0 1-1V9a5 5 0 0 0-10 0v3a1 1 0 0 0 1 1h1v2H8a3 3 0 0 1-3-3V9a7 7 0 0 1 7-7m-1 17h2v2h-2v-2Z"
          />
        </svg>
      );
  }
}

export default function Beneficios({
  className,
  title = "Vantagens de se cadastrar",
  subtitle = "Segurança, visibilidade e suporte para você focar no que importa: o cuidado com as pessoas.",
  items = defaultBenefits,
  scrollTargetId = "form",
  ctaText = "Começar cadastro",
}: BeneficiosProps) {
  const handleClick = () => {
    const el = document.getElementById(scrollTargetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className={`${styles.section} ${className ?? ""}`}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </header>

        <div className={styles.grid}>
          {items.map((b, i) => (
            <article key={`${b.title}-${i}`} className={styles.card}>
              <div className={styles.icon}>
                <Icon name={b.icon} />
              </div>
              <h3 className={styles.cardTitle}>{b.title}</h3>
              <p className={styles.cardText}>{b.text}</p>
            </article>
          ))}
        </div>

        {/* <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.cta} ${styles.pulse}`}
            onClick={handleClick}
            aria-label={`${ctaText}: rolar até o formulário`}
          >
            {ctaText}
          </button>
        </div> */}
      </div>
    </section>
  );
}
