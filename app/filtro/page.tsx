// app/filtro/page.tsx
"use client";

import { useEffect, useState } from "react";
import Header from "../_components/header/Header";
import HeroFiltro, { Filtros } from "../_components/heroFiltro/HeroFiltro";
import ResultadoBusca, {
  Profissional,
} from "../_components/resultadoBusca/ResultadoBusca";

// Estende o tipo do card com campos usados pelo filtro
type ProfissionalFiltro = Profissional & {
  tipo?: string;            // área de atuação (ex.: "Clínico(a)")
  abordagens?: string[];    // para casar com o filtro "abordagem"
};

// Mock de exemplo
const MOCK: ProfissionalFiltro[] = [
  {
    id: "juliana",
    nome: "Juliana Maria Rasteiro Silva",
    titulo: "Psicóloga",
    crp: "06/77409",
    fotoUrl: "/images/juliana.png",
    preco: 30,
    temas: [
      "Acompanhamento psicológico",
      "Agressão",
      "Depressão",
      "Autoconhecimento",
      "Ansiedade",
      "Relacionamentos",
      "Traumas",
      "Tristeza",
      "Autoconfiança",
      "Angústia",
    ],
    abordagem: "Terapia Cognitivo Comportamental - TCC",
    abordagens: ["Terapia Cognitivo Comportamental - TCC", "TCC"],
    publicos: ["Adultos"],
    tipo: "Clínico(a)",
    sobre:
      "Olá, sou Juliana, psicóloga formada e especialista em Terapia Cognitivo-Comportamental (TCC). Minha paixão é ajudar pessoas a encontrarem bem-estar em suas vidas, proporcionando um ambiente seguro e acolhedor para explorar seus pensamentos...",
    urlPerfil: "/profissionais/juliana-maria-rasteiro-silva",
    telefone: "(19) 99006-1035",
  },
  {
    id: "juliana",
    nome: "Juliana Maria Rasteiro Silva",
    titulo: "Psicóloga",
    crp: "06/77409",
    fotoUrl: "/images/juliana.png",
    preco: 30,
    temas: [
      "Acompanhamento psicológico",
      "Agressão",
      "Depressão",
      "Autoconhecimento",
      "Ansiedade",
      "Relacionamentos",
      "Traumas",
      "Tristeza",
      "Autoconfiança",
      "Angústia",
    ],
    abordagem: "Terapia Cognitivo Comportamental - TCC",
    abordagens: ["Terapia Cognitivo Comportamental - TCC", "TCC"],
    publicos: ["Adultos"],
    tipo: "Clínico(a)",
    sobre:
      "Olá, sou Juliana, psicóloga formada e especialista em Terapia Cognitivo-Comportamental (TCC). Minha paixão é ajudar pessoas a encontrarem bem-estar em suas vidas, proporcionando um ambiente seguro e acolhedor para explorar seus pensamentos...",
    urlPerfil: "/profissionais/juliana-maria-rasteiro-silva",
    telefone: "(19) 99006-1035",
  },
  {
    id: "juliana",
    nome: "Juliana Maria Rasteiro Silva",
    titulo: "Psicóloga",
    crp: "06/77409",
    fotoUrl: "/images/juliana.png",
    preco: 30,
    temas: [
      "Acompanhamento psicológico",
      "Agressão",
      "Depressão",
      "Autoconhecimento",
      "Ansiedade",
      "Relacionamentos",
      "Traumas",
      "Tristeza",
      "Autoconfiança",
      "Angústia",
    ],
    abordagem: "Terapia Cognitivo Comportamental - TCC",
    abordagens: ["Terapia Cognitivo Comportamental - TCC", "TCC"],
    publicos: ["Adultos"],
    tipo: "Clínico(a)",
    sobre:
      "Olá, sou Juliana, psicóloga formada e especialista em Terapia Cognitivo-Comportamental (TCC). Minha paixão é ajudar pessoas a encontrarem bem-estar em suas vidas, proporcionando um ambiente seguro e acolhedor para explorar seus pensamentos...",
    urlPerfil: "/profissionais/juliana-maria-rasteiro-silva",
    telefone: "(19) 99006-1035",
  },
];

export default function FiltroPage() {
  const [filtros, setFiltros] = useState<Filtros>({});
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ProfissionalFiltro[]>(MOCK);

  // Simula "buscar no backend" quando filtros mudam
  useEffect(() => {
    setLoading(true);

    const t = setTimeout(() => {
      const { tipo, abordagem, publico, nome } = filtros;
      const termo = (nome ?? "").toLowerCase().trim();

      const filtrado = MOCK.filter((p) => {
        const okTipo = !tipo || p.tipo === tipo;

        const okAbord =
          !abordagem ||
          p.abordagens?.includes(abordagem) ||
          (p.abordagem &&
            p.abordagem.toLowerCase().includes(abordagem.toLowerCase()));

        const okPub = !publico || p.publicos?.includes(publico);
        const okNome = !termo || p.nome.toLowerCase().includes(termo);

        return okTipo && okAbord && okPub && okNome;
      });

      setItems(filtrado);
      setLoading(false);
    }, 350);

    return () => clearTimeout(t);
  }, [filtros]);

  return (
    <>
      <Header />
      <HeroFiltro onSearch={setFiltros} />
      <ResultadoBusca itens={items} loading={loading} />
    </>
  );
}
