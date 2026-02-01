import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import VerifyEmail from "./VerifyEmail";
import ResetPassword from "./ResetPassword";
import styles from "./AuthAction.module.css";

const AuthAction: React.FC = () => {
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const mode = params.get("mode");

  if (mode === "verifyEmail") {
    return <VerifyEmail />;
  }

  if (mode === "resetPassword") {
    return <ResetPassword />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.status}>Action Required</div>
        <h1 className={styles.title}>Invalid link</h1>
        <p className={styles.message}>
          This link is missing information. Please request a new verification or
          password reset email.
        </p>
        <div className={styles.buttonRow}>
          <a className={styles.primaryButton} href="/">
            Go to homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthAction;
