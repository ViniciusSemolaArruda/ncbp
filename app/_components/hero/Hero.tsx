"use client";

import styles from "./Hero.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section className={styles.hero}>
      <Image
        src="/images/hero-bg.png"
        alt="Pessoa sorrindo em atendimento psicológico online"
        fill
        priority
        style={{ objectFit: "cover" }}
      />

      <div className={styles.content}>
        <h1>Atendimento psicológico com empatia</h1>
        <p>Cuidados biopsicossociais online, com acolhimento e humanidade.</p>

        <button
          className={styles.pulse}
          onClick={() => router.push("/filtro")}
          aria-label="Começar agora: ir para a página de filtros"
        >
          Começar agora
        </button>
      </div>
    </section>
  );
}
