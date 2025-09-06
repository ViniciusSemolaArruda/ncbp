// app/inscrever/page.tsx
"use client";

import Header from "../_components/header/Header";
import Beneficios from "../_components/inscrever/Beneficios";
import HeroProfissionais from "../_components/inscrever/HeroProfissionais";
import Inscrever from "../_components/inscrever/Inscrever";

export default function InscreverPage() {
  const handleSubmit = async () => {
    // envie para sua API se desejar
    // await fetch("/api/inscrever", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dados) });
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
