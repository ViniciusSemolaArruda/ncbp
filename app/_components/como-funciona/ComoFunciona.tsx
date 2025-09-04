"use client";

import styles from "./ComoFunciona.module.scss";

export default function ComoFunciona() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Como Funciona</h2>
        <p className={styles.subtitle}>
          Nosso processo é simples, seguro e pensado para o seu bem-estar.
        </p>

        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.number}>1</span>
            <h3>Agende online</h3>
            <p>Escolha o dia e horário mais confortável para você, direto na plataforma.</p>
          </div>

          <div className={styles.step}>
            <span className={styles.number}>2</span>
            <h3>Conecte-se com o psicólogo</h3>
            <p>Receba o link da sessão e fale com um profissional qualificado por vídeo chamada.</p>
          </div>

          <div className={styles.step}>
            <span className={styles.number}>3</span>
            <h3>Cuide da sua saúde mental</h3>
            <p>Acompanhe sua evolução com sessões recorrentes no seu ritmo.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
