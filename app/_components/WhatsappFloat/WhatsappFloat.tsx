"use client";

import { useEffect, useRef } from "react";
import styles from "./WhatsappFloat.module.scss";

export default function WhatsappFloat() {
  const floatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = floatRef.current;
    if (!el) return;

    let frame: number;

    const animate = () => {
      const now = Date.now();
      const rotate = Math.sin(now / 200) * 6; // ↔️ Gira de -6° até +6°
      el.style.transform = `rotate(${rotate}deg)`;
      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frame); // limpar animação se o componente for desmontado
  }, []);

  return (
    <div ref={floatRef} className={styles.floating}>
      <a
        href="https://wa.me/5521999999999" // coloque seu número real aqui
        target="_blank"
        rel="noopener noreferrer"
        className={styles.icon}
      >
        <img src="/images/whats2.svg" alt="Fale no WhatsApp" />
      </a>
    </div>
  );
}
