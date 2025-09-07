// app/inscrever/page.tsx
"use client";

import Header from "../_components/header/Header";
import Beneficios from "../_components/inscrever/Beneficios";
import HeroProfissionais from "../_components/inscrever/HeroProfissionais";
import Inscrever, { type InscreverPayload } from "../_components/inscrever/Inscrever";

export default function InscreverPage() {
  // Esta função é passada para o componente <Inscrever />
  // e será chamada com todos os dados já validados do formulário.
  const handleSubmit = async (dados: InscreverPayload) => {
    const res = await fetch("/api/inscricoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...dados,
        termsVersion: "v1.0",   // opcional
        source: "ncbp-site",    // opcional
      }),
    });

    const json = await res.json();
    if (!res.ok) {
      // Propaga a mensagem do backend para o componente mostrar no feedback
      throw new Error(json?.error || "Não foi possível salvar a inscrição.");
    }
    // Se quiser fazer algo após sucesso (scroll, analytics, etc.), faça aqui.
    return json;
  };

  return (
    <>
      <Header />
      <HeroProfissionais />
      <Beneficios />
      <div id="form">
        <Inscrever onSubmit={handleSubmit} />
      </div>
    </>
  );
}
