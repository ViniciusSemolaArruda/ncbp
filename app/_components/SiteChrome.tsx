"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// Como este wrapper é client, pode importar Header/Footer direto.
// Se seus Header/Footer forem client components (com "use client"), está OK:
import Header from "../_components/header/Header";
import Footer from "../_components/footer/Footer";

// WhatsApp flutuante mexe com window/document → sem SSR:
const WhatsappFloat = dynamic(
  () =>
    import("../_components/WhatsappFloat/WhatsappFloat").then(
      (m) => m.default || m
    ),
  { ssr: false }
);

type Props = { children: React.ReactNode };

export default function SiteChrome({ children }: Props) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  // Nas rotas /admin, não renderiza Header/Footer do site
  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {/* Espaço para não ficar por baixo do header fixo do site (ajuste se precisar) */}
      <div aria-hidden style={{ height: 90 }} />
      {children}
      <WhatsappFloat />
      <Footer />
    </>
  );
}
