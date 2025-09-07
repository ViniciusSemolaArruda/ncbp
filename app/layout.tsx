import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "./_components/SiteChrome";

export const metadata: Metadata = {
  title: "NCBP",
  description: "Núcleo de Cuidados Biopsocossociais",
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
