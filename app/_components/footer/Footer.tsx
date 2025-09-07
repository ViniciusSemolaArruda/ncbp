"use client";

import styles from "./Footer.module.scss";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.col}>
          <p>CNPJ: 00.000.000/0000-00</p>
          <p>Rua Exemplo, 123 - Rio de Janeiro - RJ</p>
          <p>Email: contato@ncbp.com.br</p>
        </div>

        <div className={styles.col}>
          <p className={styles.label}>Links úteis</p>
          <ul className={styles.linksList}>
            <li>
              <Link href="/termos">Termos de Serviço</Link>
            </li>
            <li>
              <Link href="/privacidade">Política de Privacidade</Link>
            </li>
            <li>
              <Link href="/contato">Suporte</Link>
            </li>
            <li>
              <Link href="/admin/login">Admin</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2025 Copyright NCBP</p>
      </div>
    </footer>
  );
}
