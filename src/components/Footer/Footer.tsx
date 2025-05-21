import React from "react";
import styles from "./Footer.module.css";
import ObfuscatedEmail from "@/components/ObfuscatedEmail/ObfuscatedEmail";

const Footer: React.FC = () => (
  <>
    <footer className={styles.footer}>
      <div>
        <a href="/privacy">Privacy Policy</a> |{" "}
        <a href="/terms">Terms of Use</a>
      </div>
      <div>
        <ObfuscatedEmail />
      </div>
    </footer>
    <div className={styles.copySection}>
      Copyright © Repigo 2025. All Rights Reserved.
    </div>
  </>
);

export default Footer;
