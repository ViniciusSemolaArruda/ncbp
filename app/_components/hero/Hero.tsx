"use client";

import styles from "./Hero.module.scss";
import Image from "next/image";

export default function Hero() {
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
        {/* use a classe do módulo */}
        <button className={styles.pulse}>Começar agora</button>
      </div>
    </section>
  );
}
