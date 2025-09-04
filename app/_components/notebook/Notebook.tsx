// components/Notebook/Notebook.tsx
"use client";

import { useEffect } from "react";
import styles from "./Notebook.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Notebook() {
  useEffect(() => {
    gsap.to("." + styles.screen, {
      className: `${styles.screen} ${styles.aberto}`,
      scrollTrigger: {
        trigger: "." + styles.screen,
        start: "top bottom",
        end: "top bottom",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.base}>
        <div className={styles.screen}>
          <p>Consulta online</p>
        </div>
      </div>
    </div>
  );
}
