import React from "react";
import Seo from "@/components/Seo/Seo";
import styles from "./Contact.module.css";
import ObfuscatedEmail from "@/components/ObfuscatedEmail/ObfuscatedEmail";

const APP_STORE_URL = "https://apps.apple.com/app/id6746357264";
const PAGE_TITLE = "Contact Repigo";
const PAGE_DESCRIPTION =
  "Contact Repigo for support, feature requests, feedback, and account help.";

const Contact: React.FC = () => (
  <>
    <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} path="/contact" />
    <main className={styles.contact}>
      <h1>Contact us</h1>
      <p>
        Have questions, feature requests, issues, or feedback? Reach out to us at{" "}
        <ObfuscatedEmail />.
      </p>
      <p>
        You can also download Repigo on the{" "}
        <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
          App Store
        </a>
        . Android support is coming soon.
      </p>
    </main>
  </>
);

export default Contact;
