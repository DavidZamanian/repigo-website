import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  // theme state and persistence
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
    // Dispatch custom event so other components update immediately
    window.dispatchEvent(new CustomEvent("themeChange", { detail: theme }));
  }, [theme]);

  const [show, setShow] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShow(currentY < lastY || currentY < 50);
      setLastY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <header
      className={`${styles.header} ${show ? styles.visible : styles.hidden}`}
    >
      <div className={styles.logo}>
        <Link to="/">REPIGO</Link>
      </div>
      <div className={styles.navContainer}>
        <nav>
          {/* <NavLink to="/about">About us</NavLink>  */}
          <NavLink to="/app">App</NavLink>
          {/* <NavLink to="/blog">Blog</NavLink> */}
          <NavLink to="/contact">Contact us</NavLink>
        </nav>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
          <span className={styles.slider}>
            <svg className={styles.icon} viewBox="0 0 24 24">
              <circle className={styles.sun} cx="12" cy="12" r="5" />
              <g className={styles.rays}>
                <line x1="12" y1="1" x2="12" y2="4" />
                <line x1="12" y1="20" x2="12" y2="23" />
                <line x1="1" y1="12" x2="4" y2="12" />
                <line x1="20" y1="12" x2="23" y2="12" />
                <line x1="4.2" y1="4.2" x2="6.3" y2="6.3" />
                <line x1="17.7" y1="17.7" x2="19.8" y2="19.8" />
                <line x1="4.2" y1="19.8" x2="6.3" y2="17.7" />
                <line x1="17.7" y1="6.3" x2="19.8" y2="4.2" />
              </g>
            </svg>
            <svg className={styles.icon} viewBox="0 0 24 24">
              <path
                className={styles.moon}
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
              />
            </svg>
          </span>
        </label>
      </div>
    </header>
  );
};
