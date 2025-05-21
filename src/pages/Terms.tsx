import React from "react";
import { Helmet } from "react-helmet-async";
import ObfuscatedEmail from "@/components/ObfuscatedEmail/ObfuscatedEmail";
import styles from "./Terms.module.css";

const Terms: React.FC = () => (
  <>
    <Helmet>
      <title>Terms of Use - Repigo</title>
      <meta
        name="description"
        content="Review Repigo's Terms of Use for accessing and using our services."
      />
    </Helmet>
    <main className={styles.terms}>
      <h1>Terms of Use</h1>
      <p>
        Welcome to Repigo (“we”, “us”, “our”). These Terms of Use (“Terms")
        govern your access to and use of the Repigo mobile application and
        related services (collectively, the “Service”). By installing or using
        the Service, you agree to these Terms and our{" "}
        <a href="/privacy">Privacy Policy</a>. If you disagree, do not use the
        Service.
      </p>
      <h2>Accounts</h2>
      <p>
        To access certain features, you must register an account and provide
        accurate information. You are responsible for maintaining your password
        confidentiality and all activities under your account. Notify us
        immediately at <ObfuscatedEmail /> of unauthorized use.
      </p>
      <h2>Content</h2>
      <p>
        You retain ownership of the data and content you upload. You grant us a
        non‑ exclusive license to use and display it in connection with the
        Service. Do not upload content that you don’t have rights to or that is
        illegal, offensive, or infringes third‑party rights.
      </p>
      <h2>Intellectual Property</h2>
      <p>
        All Service content, features, and functionality are owned by Repigo and
        its licensors. You may not copy, modify, distribute, or use our
        trademarks without permission.
      </p>
      <h2>Subscriptions</h2>
      <p>
        Certain features require a paid subscription. Subscriptions auto‑renew
        unless canceled at least 24 hours before the end of the current period.
        You can manage or cancel your subscription via the App Store. Fees are
        non‑refundable.
      </p>
      <h2>Changes to Service and Terms</h2>
      <p>
        We may modify or discontinue the Service or these Terms at any time. We
        will post updates and indicate the “Last updated” date. Continued use
        after updates constitutes acceptance.
      </p>
      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Repigo is not liable for any
        indirect, incidental, or consequential damages arising from your use of
        the Service.
      </p>
      <h2>Governing Law</h2>
      <p>
        These Terms are governed by the laws of Sweden. Disputes will be
        resolved in Swedish courts.
      </p>
      <h2>Termination</h2>
      <p>
        We may suspend or terminate your access at any time for any reason. You
        may delete your account within the app, which removes your data from our
        servers.
      </p>
      <h2>Contact Us</h2>
      <p>
        For questions, contact us at <ObfuscatedEmail />.
      </p>
      <p>Thank you for using Repigo!</p>
    </main>
  </>
);

export default Terms;
