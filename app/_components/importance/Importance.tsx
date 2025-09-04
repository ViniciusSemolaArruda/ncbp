import styles from "./Importance.module.scss";

export default function Importance() {
  return (
    <section className={styles.section} aria-labelledby="imp-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.kicker}>Etapas da vida</span>
          <h2 id="imp-title" className={styles.title}>
            A importância do atendimento psicológico
          </h2>
          <p className={styles.lede}>
            Acreditamos que a saúde mental é a base para uma vida plena e
            equilibrada. Nossa equipe é dedicada, acolhedora e qualificada para
            acompanhar você na jornada de autoconhecimento e bem-estar, com
            respeito à sua história e às necessidades de cada fase da vida.
          </p>
        </header>

        {/* Cartas por público/etapa */}
        <div className={styles.grid}>
          <article className={styles.card}>
            <h3>Adolescentes</h3>
            <p>
              Apoio em autoestima, relações, escola e construção de identidade.
              Ferramentas para lidar com ansiedade e pressões do dia a dia.
            </p>
          </article>

          <article className={styles.card}>
            <h3>Jovens & Adultos</h3>
            <p>
              Acompanhamento em carreira, estudos, relacionamentos e saúde
              emocional. Estratégias para estresse, ansiedade e decisões.
            </p>
          </article>

          <article className={styles.card}>
            <h3>Idosos</h3>
            <p>
              Cuidado em transições, perdas e adaptação de rotinas, preservando
              autonomia, vínculos e propósito ao longo do envelhecimento.
            </p>
          </article>

          <article className={styles.card}>
            <h3>Famílias & Casais</h3>
            <p>
              Espaço seguro para diálogo, acordos e fortalecimento de vínculos.
              Comunicação mais clara e manejo de conflitos com respeito.
            </p>
          </article>
        </div>

        {/* Benefícios – grid de chips com ícone */}
        <div className={styles.benefits}>
          <h3 className={styles.benefitsTitle}>Como a terapia ajuda</h3>
          <ul className={styles.benefitsGrid} role="list">
            <li className={styles.benefitItem}>
              <span className={styles.bIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M20.3 5.7a1 1 0 0 1 0 1.4l-9.5 9.5a1 1 0 0 1-1.4 0L3.7 11a1 1 0 1 1 1.4-1.4l4.1 4.1 8.8-8.8a1 1 0 0 1 1.3-.2z" fill="currentColor"/>
                </svg>
              </span>
              <span className={styles.bText}>Suporte acolhedor em momentos de mudança</span>
            </li>
            <li className={styles.benefitItem}>
              <span className={styles.bIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M20.3 5.7a1 1 0 0 1 0 1.4l-9.5 9.5a1 1 0 0 1-1.4 0L3.7 11a1 1 0 1 1 1.4-1.4l4.1 4.1 8.8-8.8a1 1 0 0 1 1.3-.2z" fill="currentColor"/>
                </svg>
              </span>
              <span className={styles.bText}>Estratégias práticas para ansiedade e estresse</span>
            </li>
            <li className={styles.benefitItem}>
              <span className={styles.bIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M20.3 5.7a1 1 0 0 1 0 1.4l-9.5 9.5a1 1 0 0 1-1.4 0L3.7 11a1 1 0 1 1 1.4-1.4l4.1 4.1 8.8-8.8a1 1 0 0 1 1.3-.2z" fill="currentColor"/>
                </svg>
              </span>
              <span className={styles.bText}>Melhora da comunicação e dos relacionamentos</span>
            </li>
            <li className={styles.benefitItem}>
              <span className={styles.bIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M20.3 5.7a1 1 0 0 1 0 1.4l-9.5 9.5a1 1 0 0 1-1.4 0L3.7 11a1 1 0 1 1 1.4-1.4l4.1 4.1 8.8-8.8a1 1 0 0 1 1.3-.2z" fill="currentColor"/>
                </svg>
              </span>
              <span className={styles.bText}>Autoconhecimento para escolhas conscientes</span>
            </li>
            <li className={styles.benefitItem}>
              <span className={styles.bIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M20.3 5.7a1 1 0 0 1 0 1.4l-9.5 9.5a1 1 0 0 1-1.4 0L3.7 11a1 1 0 1 1 1.4-1.4l4.1 4.1 8.8-8.8a1 1 0 0 1 1.3-.2z" fill="currentColor"/>
                </svg>
              </span>
              <span className={styles.bText}>Hábitos saudáveis e equilíbrio no dia a dia</span>
            </li>
            <li className={styles.benefitItem}>
              <span className={styles.bIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M20.3 5.7a1 1 0 0 1 0 1.4l-9.5 9.5a1 1 0 0 1-1.4 0L3.7 11a1 1 0 1 1 1.4-1.4l4.1 4.1 8.8-8.8a1 1 0 0 1 1.3-.2z" fill="currentColor"/>
                </svg>
              </span>
              <span className={styles.bText}>Acompanhamento contínuo e plano de cuidado</span>
            </li>
            <li className={styles.benefitItem}>
  <span className={styles.bIcon} aria-hidden="true">
    <svg viewBox="0 0 24 24">
      <path d="M20.3 5.7a1 1 0 0 1 0 1.4l-9.5 9.5a1 1 0 0 1-1.4 0L3.7 11a1 1 0 1 1 1.4-1.4l4.1 4.1 8.8-8.8a1 1 0 0 1 1.3-.2z" fill="currentColor"/>
    </svg>
  </span>
  <span className={styles.bText}>Fortalecimento da resiliência e do enfrentamento de desafios</span>
</li>

<li className={styles.benefitItem}>
  <span className={styles.bIcon} aria-hidden="true">
    <svg viewBox="0 0 24 24">
      <path d="M20.3 5.7a1 1 0 0 1 0 1.4l-9.5 9.5a1 1 0 0 1-1.4 0L3.7 11a1 1 0 1 1 1.4-1.4l4.1 4.1 8.8-8.8a1 1 0 0 1 1.3-.2z" fill="currentColor"/>
    </svg>
  </span>
  <span className={styles.bText}>Regulação emocional e melhora na qualidade do sono</span>
</li>

          </ul>
        </div>
      </div>
    </section>
  );
}
