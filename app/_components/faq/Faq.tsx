// components/Faq/Faq.tsx
"use client";

import { useState } from "react";
import styles from "./Faq.module.scss";
import { ChevronDown, ChevronUp } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: "Como funciona o agendamento?",
    answer: "Você pode agendar uma consulta online pelo nosso site de forma rápida e segura.",
  },
  {
    question: "O atendimento é feito por vídeo?",
    answer: "Sim. As consultas são realizadas por vídeo com profissionais capacitados.",
  },
  {
    question: "Onde acesso meu prontuário?",
    answer: "Após a sessão, seu prontuário fica disponível no painel do paciente.",
  },
  {
    question: "Posso reagendar ou cancelar uma consulta?",
    answer: "Sim, basta acessar seu painel e fazer as alterações desejadas com antecedência.",
  },
  {
    question: "Atendem presencialmente?",
    answer: "Não. Todos os atendimentos são realizados exclusivamente de forma online, garantindo praticidade, segurança e acessibilidade para todos os pacientes.",
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <h2 className={styles.title}>Perguntas Frequentes</h2>
      <div className={styles.accordion}>
        {faqs.map((item, index) => (
          <div key={index} className={styles.item}>
            <button
              className={styles.question}
              onClick={() => toggleIndex(index)}
            >
              {item.question}
              {activeIndex === index ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            <div
              className={`${styles.answer} ${
                activeIndex === index ? styles.open : ""
              }`}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
