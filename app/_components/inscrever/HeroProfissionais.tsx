"use client";

import Image from "next/image";
import styles from "./HeroProfissionais.module.scss";

type Props = {
  className?: string;
  /** id do alvo para rolar (default: "form") */
  scrollTargetId?: string;
  /** sobrescrever textos, se quiser */
  title?: string;
  subtitle?: string;
  ctaText?: string;
  /** sobrescrever imagem se precisar */
  bgSrc?: string;
};

export default function HeroProfissionais({
  className,
  scrollTargetId = "form",
  title = "Venha fazer parte da nossa rede de profissionais",
  subtitle = "Cadastre-se para receber novos pacientes, destacar sua atuação e oferecer um cuidado ético, humano e acolhedor.",
  ctaText = "Quero me inscrever",
  bgSrc = "/images/profissionais.png",
}: Props) {
  const handleClick = () => {
    const el = document.getElementById(scrollTargetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className={`${styles.hero} ${className ?? ""}`}>
      <Image
        src={bgSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.bg}
      />

      <div className={styles.content}>
        <h1>{title}</h1>
        <p>{subtitle}</p>

        <button
          type="button"
          onClick={handleClick}
          className={`${styles.cta} ${styles.pulse}`}
          aria-label={`${ctaText}: rolar até o formulário`}
        >
          {ctaText}
        </button>
      </div>
    </section>
  );
}
