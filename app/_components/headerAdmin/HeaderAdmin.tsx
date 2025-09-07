"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./HeaderAdmin.module.scss";

type NavItem = { href: string; label: string; exact?: boolean };

const NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/inscricoes", label: "Inscrições" },
  { href: "/admin/busca", label: "Buscar" },
  { href: "/admin/exportar", label: "Exportar" },
  { href: "/admin/usuarios", label: "Usuários" },
  { href: "/admin/config", label: "Config." },
];

function isActive(pathname: string, item: NavItem) {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

export default function HeaderAdmin() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  async function handleLogout() {
    try {
      setLoading(true);
      await fetch("/api/admin/logout", { method: "POST" });
      window.location.href = "/admin/login";
    } finally {
      setLoading(false);
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <div className={styles.brand}>
          
          <strong>Painel do Admin</strong>
        </div>

        <nav className={styles.nav} aria-label="Navegação do admin">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname ?? "", item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.link} ${active ? styles.active : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className={styles.logout}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Saindo..." : "Sair"}
        </button>
      </div>
    </header>
  );
}
