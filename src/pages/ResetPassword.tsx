import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ResetPassword.module.css";

type Status = "checking" | "ready" | "submitting" | "success" | "error";

const PASSWORD_REQUIREMENTS_TEXT =
  "at least 8 characters, 1 uppercase letter, and 1 number";

const errorMessages: Record<string, string> = {
  EXPIRED_OOB_CODE: "This reset link has expired. Please request a new one.",
  INVALID_OOB_CODE: "This reset link is invalid or has already been used.",
  USER_DISABLED: "This account has been disabled.",
  USER_NOT_FOUND: "No user found for this reset link.",
  WEAK_PASSWORD: `Password must include ${PASSWORD_REQUIREMENTS_TEXT}.`,
  PASSWORD_DOES_NOT_MEET_REQUIREMENTS: `Password must include ${PASSWORD_REQUIREMENTS_TEXT}.`,
  MISSING_PASSWORD: "Please enter a new password.",
};

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const apiKey = params.get("apiKey");
  const oobCode = params.get("oobCode");
  const mode = params.get("mode");

  const [status, setStatus] = useState<Status>("checking");
  const [message, setMessage] = useState<string>(
    "Validating your reset link, please wait...",
  );
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const verifyLink = async () => {
      if (mode !== "resetPassword" || !apiKey || !oobCode) {
        if (!isMounted) return;
        setStatus("error");
        setMessage(
          "This reset link is missing information. Please request a new one.",
        );
        return;
      }

      try {
        setStatus("checking");
        setMessage("Validating your reset link, please wait...");

        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ oobCode }),
          },
        );

        const data = await response.json();
        if (!response.ok) {
          const code = data?.error?.message;
          const friendly = code
            ? errorMessages[code] || "We couldn't validate this reset link."
            : "We couldn't validate this reset link.";
          if (!isMounted) return;
          setStatus("error");
          setMessage(friendly);
          return;
        }

        if (!isMounted) return;
        setEmail(data?.email || null);
        setStatus("ready");
        setMessage("Choose a new password for your account.");
      } catch (error) {
        if (!isMounted) return;
        setStatus("error");
        setMessage("We couldn't validate this reset link. Please try again.");
      }
    };

    verifyLink();

    return () => {
      isMounted = false;
    };
  }, [apiKey, oobCode, mode]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status !== "ready" || !apiKey || !oobCode) return;

    setFormError("");

    // Check if we're in cooldown period
    if (cooldownUntil && Date.now() < cooldownUntil) {
      const remainingSeconds = Math.ceil((cooldownUntil - Date.now()) / 1000);
      setFormError(
        `Too many attempts. Please wait ${remainingSeconds} seconds before trying again.`,
      );
      return;
    }

    if (!password) {
      setFormError("Please enter a new password.");
      return;
    }

    const passwordIssues: string[] = [];
    if (password.length < 8) passwordIssues.push("at least 8 characters");
    if (!/[A-Z]/.test(password)) passwordIssues.push("one uppercase letter");
    if (!/\d/.test(password)) passwordIssues.push("one number");
    if (passwordIssues.length) {
      setFormError(`Password must include ${passwordIssues.join(", ")}.`);
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    try {
      setStatus("submitting");
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ oobCode, newPassword: password }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        const code = data?.error?.message;
        const friendly = code
          ? errorMessages[code] || "We couldn't reset your password."
          : "We couldn't reset your password.";
        setStatus("ready");
        setFormError(friendly);

        // Increment failed attempts and set cooldown
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);

        if (newAttempts >= 3) {
          // Cooldown: 30 seconds for 3-4 attempts, 60 seconds for 5+
          const cooldownSeconds = newAttempts >= 5 ? 60 : 30;
          setCooldownUntil(Date.now() + cooldownSeconds * 1000);
        }
        return;
      }

      setStatus("success");
      setMessage("Your password has been reset. You can return to the app.");
      // Reset failed attempts on success
      setFailedAttempts(0);
      setCooldownUntil(null);
    } catch (error) {
      setStatus("ready");
      setFormError("We couldn't reset your password. Please try again.");

      // Increment failed attempts on network errors too
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts >= 3) {
        const cooldownSeconds = newAttempts >= 5 ? 60 : 30;
        setCooldownUntil(Date.now() + cooldownSeconds * 1000);
      }
    }
  };

  const isBusy = status === "checking" || status === "submitting";
  const isSuccess = status === "success";
  const isInCooldown = cooldownUntil && Date.now() < cooldownUntil;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.status}>
          {isBusy ? <span className={styles.spinner} /> : null}
          <span>
            {isBusy
              ? "Working"
              : isSuccess
                ? "Password Updated"
                : status === "error"
                  ? "Reset Failed"
                  : "Reset Password"}
          </span>
        </div>
        <h1 className={styles.title}>Reset Password</h1>
        <p className={styles.message}>{message}</p>

        {email ? <p className={styles.emailBadge}>{email}</p> : null}

        {status === "ready" ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.fieldLabel} htmlFor="new-password">
              New password
            </label>
            <input
              id="new-password"
              className={styles.input}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 8 characters"
              minLength={8}
              autoComplete="new-password"
              required
            />

            <label className={styles.fieldLabel} htmlFor="confirm-password">
              Confirm password
            </label>
            <input
              id="confirm-password"
              className={styles.input}
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Re-enter your new password"
              minLength={8}
              autoComplete="new-password"
              required
            />

            <p className={styles.requirements}>
              Password must include {PASSWORD_REQUIREMENTS_TEXT}.
            </p>

            {formError ? <p className={styles.formError}>{formError}</p> : null}

            <button
              className={styles.primaryButton}
              type="submit"
              disabled={isBusy || isInCooldown}
            >
              {isBusy ? "Updating..." : "Update password"}
            </button>
          </form>
        ) : null}

        <div className={styles.buttonRow}>
          <a className={styles.primaryButton} href="repigo://email-login">
            Open the app
          </a>
          <a className={styles.secondaryButton} href="/">
            Go to homepage
          </a>
        </div>

        <p className={styles.helpText}>
          If the app doesn't open, make sure it's installed and try again.
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
