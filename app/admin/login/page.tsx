// app/admin/login/page.tsx
"use client";

import { useState, FormEvent, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./Login.module.scss";

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}
function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M3 3l18 18M10.58 10.58A3 3 0 0012 15a3 3 0 002.42-4.42M9.9 4.24C10.58 4.09 11.28 4 12 4c7 0 11 8 11 8a20.94 20.94 0 01-4.23 5.28M6.11 6.11A20.93 20.93 0 001 12s4 8 11 8a10.6 10.6 0 004.45-.95" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sp = useSearchParams();
  const unauthorized = sp.get("unauthorized") === "1";
  const router = useRouter();

  useEffect(() => {
    if (msg) {
      const t = setTimeout(() => setMsg(null), 5000);
      return () => clearTimeout(t);
    }
  }, [msg]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), senha }), // trim só no e-mail
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Falha no login.");
      router.replace("/admin"); // evita full reload
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Erro ao autenticar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Login do Admin</h1>
        <p className={styles.subtitle}>Acesse o painel administrativo com seu e-mail e senha.</p>

        {unauthorized && (
          <div className={`${styles.feedback} ${styles.error}`} role="status">
            Você não tem autorização para acessar essa página. Faça login.
          </div>
        )}

        {msg && !unauthorized && (
          <div
            className={`${styles.feedback} ${
              /inválidas|Falha|Erro/i.test(msg) ? styles.error : styles.success
            }`}
            role="status"
          >
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.field}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (msg) setMsg(null); }}
              placeholder="voce@exemplo.com"
              autoComplete="username"
              required
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="senha">Senha</label>
            <div className={styles.passwordWrap}>
              <input
                id="senha"
                type={show ? "text" : "password"}
                value={senha}
                onChange={(e) => { setSenha(e.target.value); if (msg) setMsg(null); }}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className={styles.toggle}
                onClick={() => setShow((s) => !s)}
                aria-pressed={show}
                aria-label={show ? "Ocultar senha" : "Mostrar senha"}
                title={show ? "Ocultar senha" : "Mostrar senha"}
                disabled={loading}
              >
                {show ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className={styles.help}>
          <a href="/" className={styles.link}>← Voltar ao site</a>
        </div>
      </section>
    </main>
  );
}
