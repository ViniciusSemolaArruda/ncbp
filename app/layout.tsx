import type { Metadata } from "next";
import "./globals.css";

import Header from "./_components/header/Header";
import Footer from "./_components/footer/Footer";
import WhatsappFloat from "./_components/WhatsappFloat/WhatsappFloat"; // ✅ Adicionado

export const metadata: Metadata = {
  title: "Meu Site",
  description: "Descrição do meu site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Header fixo em todas as páginas */}
        <Header />

        {/* Espaço para o conteúdo não ficar por baixo do header fixo */}
        <div style={{ height: "90px" }} />

        {/* Conteúdo principal da página */}
        {children}

        {/* Ícone flutuante do WhatsApp */}
        <WhatsappFloat />

        {/* Rodapé fixo em todas as páginas */}
        <Footer />
      </body>
    </html>
  );
}
