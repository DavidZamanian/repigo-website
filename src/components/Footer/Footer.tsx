import React from "react";
import styles from "./Footer.module.css";
import ObfuscatedEmail from "@/components/ObfuscatedEmail/ObfuscatedEmail";

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <section className={styles.brandBlock}>
        <p className={styles.brand}>REPIGO</p>
        <p className={styles.tagline}>
          Smart workout tracking that keeps your training consistent.
        </p>
      </section>

      <section className={styles.linksBlock}>
        <p className={styles.blockTitle}>Explore</p>
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Use</a>
      </section>

      <section className={styles.supportBlock}>
        <p className={styles.blockTitle}>Support</p>
        <div className={styles.emailRow}>
          <ObfuscatedEmail />
        </div>
      </section>
    </div>

    <div className={styles.copy}>Copyright © Repigo 2026. All Rights Reserved.</div>
  </footer>
);

export default Footer;
