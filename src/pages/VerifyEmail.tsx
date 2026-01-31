import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./VerifyEmail.module.css";

type Status = "verifying" | "success" | "error";

const errorMessages: Record<string, string> = {
  EXPIRED_OOB_CODE:
    "This verification link has expired. Please request a new one.",
  INVALID_OOB_CODE:
    "This verification link is invalid or has already been used.",
  USER_DISABLED: "This account has been disabled.",
  USER_NOT_FOUND: "No user found for this verification link.",
};

const VerifyEmail: React.FC = () => {
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const apiKey = params.get("apiKey");
  const oobCode = params.get("oobCode");
  const mode = params.get("mode");

  const [status, setStatus] = useState<Status>("verifying");
  const [message, setMessage] = useState<string>(
    "Verifying your email, please wait..."
  );

  useEffect(() => {
    let isMounted = true;

    const verify = async () => {
      if (mode !== "verifyEmail" || !apiKey || !oobCode) {
        if (!isMounted) return;
        setStatus("error");
        setMessage(
          "This verification link is missing information. Please request a new one."
        );
        return;
      }

      try {
        setStatus("verifying");
        setMessage("Verifying your email, please wait...");

        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ oobCode }),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          const code = data?.error?.message;
          const friendly = code
            ? errorMessages[code] || "We couldn't verify your email."
            : "We couldn't verify your email.";
          if (!isMounted) return;
          setStatus("error");
          setMessage(friendly);
          return;
        }

        if (!isMounted) return;
        setStatus("success");
        setMessage("Your email has been verified. You can return to the app.");
      } catch (error) {
        if (!isMounted) return;
        setStatus("error");
        setMessage("We couldn't verify your email. Please try again later.");
      }
    };

    verify();

    return () => {
      isMounted = false;
    };
  }, [apiKey, oobCode, mode]);

  const isVerifying = status === "verifying";
  const isSuccess = status === "success";

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.status}>
          {isVerifying ? <span className={styles.spinner} /> : null}
          <span>
            {isVerifying
              ? "Verifying"
              : isSuccess
              ? "Verified"
              : "Verification Failed"}
          </span>
        </div>
        <h1 className={styles.title}>Email Verification</h1>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonRow}>
          <a className={styles.primaryButton} href="repigo://verify-email">
            Open the app
          </a>
          <a className={styles.secondaryButton} href="/">
            Go to homepage
          </a>
        </div>
        <p className={styles.helpText}>
          If the app doesn&apos;t open, make sure it&apos;s installed and try again.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
