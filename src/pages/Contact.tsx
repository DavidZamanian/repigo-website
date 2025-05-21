import React from "react";
import styles from "./Contact.module.css";
import ObfuscatedEmail from "@/components/ObfuscatedEmail/ObfuscatedEmail";

const Contact: React.FC = () => (
  <main className={styles.contact}>
    <h1>Contact us</h1>
    <p>
      Have questions, feature requests, issues, or feedback? Reach out to us at{" "}
      <ObfuscatedEmail />
    </p>
    <p>
      We're here to help and would love to hear from you about how we can
      improve your workout experience.
    </p>
  </main>
);

export default Contact;
