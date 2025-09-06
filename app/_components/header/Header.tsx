"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";

type NavItem = { href: string; label: string };

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { href: "/", label: "Como Funciona" },
  { href: "/filtro", label: "Quero Começar" },
  { href: "/tournament", label: "Sou Psicólogo" },
];

const LEGAL_ITEMS: ReadonlyArray<NavItem> = [
  { href: "/termos", label: "Termos de Serviço" },
  { href: "/privacidade", label: "Política de Privacidade" },
  { href: "/suporte", label: "Suporte" },
];

export default function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const prevOverflow = useRef<string>("");

  const isActive = useCallback(
    (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href)),
    [pathname]
  );

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setHidden(y > lastY.current && y > 64);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      prevOverflow.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prevOverflow.current || "";
    }
    return () => {
      document.body.style.overflow = prevOverflow.current || "";
    };
  }, [menuOpen]);

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div className={styles.headerScope}>
      <header
        className={[
          styles.header,
          hidden ? styles.headerHidden : "",
          scrolled ? styles.headerElevated : "",
        ].join(" ")}
        role="banner"
      >
        <div className={styles.container}>
          <Link href="/" className={styles.brand} aria-label="Ir para a página inicial">
            <Image
              src="/images/logo.png"
              alt="NCBP"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </Link>

          <nav className={styles.nav} aria-label="Principal">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[styles.navLink, active ? styles.active : ""].join(" ")}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            className={[styles.burger, menuOpen ? styles.burgerActive : ""].join(" ")}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Overlay + Drawer ficam dentro do escopo também */}
      <div
        className={[styles.overlay, menuOpen ? styles.overlayVisible : ""].join(" ")}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      />

      <aside
        id="mobile-drawer"
        className={[styles.drawer, menuOpen ? styles.drawerOpen : ""].join(" ")}
        aria-hidden={!menuOpen}
      >
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>Menu</span>
          <button className={styles.close} aria-label="Fechar menu" onClick={closeMenu}>
            ✕
          </button>
        </div>

        <nav className={styles.drawerNav} aria-label="Menu móvel">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[styles.drawerLink, active ? styles.drawerActive : ""].join(" ")}
                aria-current={active ? "page" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sep} role="separator" />

        <div className={styles.socials} aria-label="Redes sociais">
          <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 12.06C22 6.49 17.52 2 12 2S2 6.49 2 12.06c0 5.01 3.66 9.17 8.44 9.94v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.77-1.61 1.56v1.87h2.74l-.44 2.9h-2.3V22c4.78-.77 8.44-4.93 8.44-9.94z" fill="currentColor"/>
            </svg>
          </a>
          <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 5.92c-.75.33-1.54.54-2.37.64a4.14 4.14 0 0 0 1.82-2.28 8.26 8.26 0 0 1-2.62 1 4.12 4.12 0 0 0-7 3.76A11.68 11.68 0 0 1 3.15 4.7a4.1 4.1 0 0 0 1.28 5.49 4.1 4.1 0 0 1-1.86-.51v.05a4.12 4.12 0 0 0 3.3 4.04 4.22 4.22 0 0 1-1.85.07 4.13 4.13 0 0 0 3.85 2.86A8.27 8.27 0 0 1 2 19.54a11.67 11.67 0 0 0 6.32 1.85c7.58 0 11.73-6.28 11.73-11.73 0-.18 0-.36-.01-.53A8.36 8.36 0 0 0 22 5.92z" fill="currentColor"/>
            </svg>
          </a>
          <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.94 6.5A1.94 1.94 0 1 1 5 4.56 1.94 1.94 0 0 1 6.94 6.5ZM5.49 8.34H8.4V20H5.49ZM10.57 8.34H13.34V9.9h.04a3.05 3.05 0 0 1 2.75-1.51c2.94 0 3.48 1.94 3.48 4.46V20h-2.92v-5.13c0-1.22 0-2.78-1.7-2.78s-1.97 1.33-1.97 2.7V20H10.6Z" fill="currentColor"/>
            </svg>
          </a>
          <a href="#" aria-label="YouTube" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.5 7.2a3.14 3.14 0 0 0-2.21-2.22C19.5 4.5 12 4.5 12 4.5s-7.5 0-9.29.48A3.14 3.14 0 0 0 .5 7.2 32.76 32.76 0 0 0 0 12a32.76 32.76 0 0 0 .5 4.8 3.14 3.14 0 0 0 2.21 2.22C4.5 19.5 12 19.5 12 19.5s7.5 0 9.29-.48A3.14 3.14 0 0 0 23.5 16.8 32.76 32.76 0 0 0 24 12a32.76 32.76 0 0 0-.5-4.8ZM9.75 15.02V8.98L15.5 12Z" fill="currentColor"/>
            </svg>
          </a>
        </div>

        <div className={styles.sep} role="separator" />

        <nav className={styles.legalNav} aria-label="Links legais">
          {LEGAL_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[styles.drawerLink, active ? styles.drawerActive : ""].join(" ")}
                aria-current={active ? "page" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
