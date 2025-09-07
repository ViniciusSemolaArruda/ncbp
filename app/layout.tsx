import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "./_components/SiteChrome";

export const metadata: Metadata = {
  title: "Meu Site",
  description: "Descrição do meu site",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
