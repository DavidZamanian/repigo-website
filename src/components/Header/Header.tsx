import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const APP_STORE_URL = "https://apps.apple.com/app/id6746357264";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/contact", label: "Contact" },
];

export const Header: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    () =>
      (localStorage.getItem("theme") as "light" | "dark") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    window.dispatchEvent(new CustomEvent("themeChange", { detail: theme }));
  }, [theme]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          REPIGO
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.active}`
                  : styles.navLink
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <a
            href={APP_STORE_URL}
            className={styles.storeButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            App Store
          </a>
          <span className={styles.androidTag}>Android soon</span>

          <label className={styles.themeToggle} aria-label="Toggle dark mode">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle dark mode"
            />
            <span className={styles.track}>
              <span className={styles.knob} />
            </span>
          </label>
        </div>
      </div>
    </header>
  );
};
