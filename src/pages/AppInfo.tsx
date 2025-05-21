import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import styles from "./AppInfo.module.css";
import ongoing_dark from "@/assets/ongoing-dark.png";
import ongoing_light from "@/assets/ongoing-light.png";
import graph_dark from "@/assets/graph-dark.png";
import appStoreButton from "@/assets/apple-app-store-button.PNG";

const AppInfo: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    () =>
      (localStorage.getItem("theme") as "light" | "dark") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (
        e.key === "theme" &&
        (e.newValue === "light" || e.newValue === "dark")
      ) {
        setTheme(e.newValue);
      }
    };
    const onThemeChange = (e: Event) => {
      const newTheme = (e as CustomEvent).detail;
      if (newTheme === "light" || newTheme === "dark") {
        setTheme(newTheme);
      }
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("themeChange", onThemeChange as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("themeChange", onThemeChange as EventListener);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>App Info - Repigo</title>
        <meta
          name="description"
          content="Download Repigo and track your workouts with detailed analytics."
        />
        <meta property="og:title" content="Repigo App Info" />
        <meta
          property="og:description"
          content="Download Repigo and monitor your fitness progress."
        />
      </Helmet>
      <div className={styles.home}>
        <section className={styles.heroSection}>
          <div className={styles.innerWrapper}>
            <div className={styles.content}>
              <h1>Track Smarter. Train Harder. Achieve More.</h1>
              <p>
                Your ultimate fitness companion. Track workouts, monitor
                progress, and stay motivated with a wide range of programs,
                workouts, and exercises.
              </p>
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={appStoreButton}
                  alt="Download on the App Store"
                  className={styles.appStoreButton}
                />
              </a>
            </div>
            <div className={styles.imageContainer}>
              <img
                src={theme === "light" ? ongoing_light : ongoing_dark}
                alt="App screenshot"
                className={styles.screenshot}
              />
            </div>
          </div>
        </section>
        <section className={styles.heroSection2}>
          <div className={styles.innerWrapper}>
            <div className={styles.content}>
              <h1>Track your progress day by day</h1>
              <p>
                Monitor your workouts and see how you improve over time. Our app
                provides detailed analytics to help you understand your
                performance.
              </p>
            </div>
            <div className={styles.imageContainer}>
              <img
                src={graph_dark}
                alt="App screenshot"
                className={styles.screenshot}
              />
            </div>
          </div>
        </section>
        <section className={styles.featuresSection}>
          <div className={styles.innerWrapper}>
            <div className={styles.content}>
              <h2>Compare Free vs PRO</h2>

              <table className={styles.featureTable}>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Free</th>
                    <th>PRO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Library of Programs, Workouts and Exercises</td>
                    <td>✓</td>
                    <td>✓</td>
                  </tr>
                  <tr>
                    <td>Progression Analytics</td>
                    <td>✓</td>
                    <td>✓</td>
                  </tr>
                  <tr>
                    <td>Creating new exercises</td>
                    <td>✕</td>
                    <td>✓</td>
                  </tr>
                  <tr>
                    <td>Creating new workouts</td>
                    <td>✕</td>
                    <td>✓</td>
                  </tr>
                  <tr>
                    <td>Creating new programs</td>
                    <td>✕</td>
                    <td>✓</td>
                  </tr>
                  <tr>
                    <td>Export data</td>
                    <td>✕</td>
                    <td>✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AppInfo;
