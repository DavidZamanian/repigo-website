import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import styles from "./AppInfo.module.css";
import ongoing_dark from "@/assets/ongoing-dark.png";
import ongoing_light from "@/assets/ongoing-light.png";
import graph_dark from "@/assets/graph-dark.png";
import graph_light from "@/assets/graph-light.png";
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
        <title>Repigo – Track Your Workouts</title>
        <meta
          name="description"
          content="Your smart fitness companion. Track workouts, analyze progress, stay motivated."
        />
        <meta property="og:title" content="Repigo – Smarter Fitness Tracking" />
        <meta
          property="og:description"
          content="Track your workouts and progress over time with analytics, programs and more."
        />
        {/* <meta property="og:image" content="https://repigo.app/og-preview.png" /> */}
        <meta property="og:url" content="https://repigo.app" />
      </Helmet>
      <div className={styles.home}>
        <section className={styles.heroSection}>
          <div className={styles.innerWrapper}>
            <div className={styles.content}>
              <h1>Track smarter. Achieve more. Reach your goals.</h1>
              <p>
                Your ultimate fitness companion. Track workouts, monitor
                progress, and stay motivated with a wide range of programs,
                workouts, and exercises.
              </p>
              <a
                href="https://apps.apple.com/app/id6746357264"
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
                src={theme === "light" ? graph_light : graph_dark}
                alt="App screenshot"
                className={styles.screenshot}
              />
            </div>
          </div>
        </section>
        <section className={styles.featuresSection}>
          <h2>🆓 FREE vs 💎 PRO</h2>
          <p className={styles.subtitle}>
            Discover what's possible when you upgrade to PRO and unlock
            professional-grade fitness tracking
          </p>

          <div className={styles.comparisonContainer}>
            <div className={styles.mobileTableContainer}>
              <table className={styles.featureTable}>
                <thead>
                  <tr>
                    <th>Feature Category</th>
                    <th>FREE</th>
                    <th>PRO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>🏋️ Exercise Creation</td>
                    <td>
                      <ul className={styles.featureList}>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.freeIcon
                            }
                          >
                            ✅
                          </span>
                          Use 100+ built-in exercises
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.freeIcon
                            }
                          >
                            ✅
                          </span>
                          Track basic workouts
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.freeIcon
                            }
                          >
                            ✅
                          </span>
                          Log sets, reps, and weight
                        </li>
                      </ul>
                    </td>
                    <td>
                      <ul className={styles.featureList}>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.freeIcon
                            }
                          >
                            ✅
                          </span>
                          Everything in FREE
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            Create unlimited custom exercises
                          </span>
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            Personalize every workout detail
                          </span>
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            Advanced exercise customization
                          </span>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>📋 Workout Programs</td>
                    <td>
                      <ul className={styles.featureList}>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.freeIcon
                            }
                          >
                            ✅
                          </span>
                          Use pre-built workout templates
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.freeIcon
                            }
                          >
                            ✅
                          </span>
                          Follow default programs
                        </li>
                      </ul>
                    </td>
                    <td>
                      <ul className={styles.featureList}>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.freeIcon
                            }
                          >
                            ✅
                          </span>
                          Everything in FREE
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            Create personalized workout programs
                          </span>
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            Design programs tailored to your goals
                          </span>
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            Advanced program management
                          </span>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>📊 Progress Analytics</td>
                    <td>
                      <ul className={styles.featureList}>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.freeIcon
                            }
                          >
                            ✅
                          </span>
                          Basic personal record metrics
                        </li>
                      </ul>
                    </td>
                    <td>
                      <ul className={styles.featureList}>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.freeIcon
                            }
                          >
                            ✅
                          </span>
                          Everything in FREE
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            Advanced metrics (13+ additional):
                          </span>
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            • Volume tracking • Reps analysis
                          </span>
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            • Interval performance • Power metrics
                          </span>
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            • Tempo tracking • Intensity analysis
                          </span>
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            • Comprehensive trend reports
                          </span>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>📈 Performance Insights</td>
                    <td>
                      <ul className={styles.featureList}>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.freeIcon
                            }
                          >
                            ✅
                          </span>
                          Basic workout history
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.freeIcon
                            }
                          >
                            ✅
                          </span>
                          Simple progress tracking
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.freeIcon
                            }
                          >
                            ✅
                          </span>
                          Year-to-date records
                        </li>
                      </ul>
                    </td>
                    <td>
                      <ul className={styles.featureList}>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.freeIcon
                            }
                          >
                            ✅
                          </span>
                          Everything in FREE
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            Deeper insights & detailed analytics
                          </span>
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            Advanced interval metrics
                          </span>
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            Precision performance tracking
                          </span>
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            Goal setting & milestone reminders
                          </span>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>📤 Data Export</td>
                    <td>
                      <ul className={styles.featureList}>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.unavailableIcon
                            }
                          >
                            ❌
                          </span>
                          No data export
                        </li>
                      </ul>
                    </td>
                    <td>
                      <ul className={styles.featureList}>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            Export entire workout history as CSV
                          </span>
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            Review progress offline
                          </span>
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            Full data ownership & portability
                          </span>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>🎯 Detailed Metrics</td>
                    <td>
                      <ul className={styles.featureList}>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.freeIcon
                            }
                          >
                            ✅
                          </span>
                          Basic strength & cardio tracking
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.freeIcon
                            }
                          >
                            ✅
                          </span>
                          Standard measurements
                        </li>
                      </ul>
                    </td>
                    <td>
                      <ul className={styles.featureList}>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.freeIcon
                            }
                          >
                            ✅
                          </span>
                          Everything in FREE
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            Advanced interval analytics:
                          </span>
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            • Interval min/max/average duration
                          </span>
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            • Interval distance & pace tracking
                          </span>
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            • Total interval metrics
                          </span>
                        </li>
                        <li>
                          <span
                            className={
                              styles.featureIcon + " " + styles.proIcon
                            }
                          >
                            💎
                          </span>
                          <span className={styles.proFeature}>
                            • Professional-grade precision
                          </span>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.upgradeSection}>
              <h3>🚀 Why Upgrade to PRO?</h3>
              <p>
                Transform your training with professional-grade analytics and
                unlimited customization designed for serious fitness
                enthusiasts.
              </p>

              <div className={styles.benefitsGrid}>
                <div className={styles.benefitCard}>
                  <h4>
                    <span className={styles.emoji}>🎯</span>For Serious Athletes
                  </h4>
                  <p>
                    Get 13+ advanced metrics including volume, intervals, pace
                    variations, tempo, and intensity tracking. Access the same
                    analytics used by personal trainers and professional
                    coaches.
                  </p>
                </div>

                <div className={styles.benefitCard}>
                  <h4>
                    <span className={styles.emoji}>🏋️</span>Unlimited
                    Customization
                  </h4>
                  <p>
                    Create custom exercises and programs that match your exact
                    training style. Design workouts that actually fit your goals
                    and training methodology.
                  </p>
                </div>

                <div className={styles.benefitCard}>
                  <h4>
                    <span className={styles.emoji}>📊</span>Professional
                    Analytics
                  </h4>
                  <p>
                    Advanced interval analytics, comprehensive trend reports,
                    and precision performance tracking. See patterns and
                    improvements you never noticed before.
                  </p>
                </div>

                <div className={styles.benefitCard}>
                  <h4>
                    <span className={styles.emoji}>🔄</span>Complete Data
                    Control
                  </h4>
                  <p>
                    Export your entire workout history as CSV for offline
                    analysis. Own your data and maintain full control over your
                    fitness journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AppInfo;
