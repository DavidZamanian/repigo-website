// src/pages/Home.tsx
import React from "react";
import { Helmet } from "react-helmet-async";
import styles from "./Home.module.css";
import screenshot from "@/assets/graph-dark.png";
import screenshot2 from "@/assets/records-dark.png";
import screenshot3 from "@/assets/ongoing-dark.png";
import backgroundImage from "@/assets/benching-background.PNG";
import appStoreButton from "@/assets/apple-app-store-button.PNG";

const Home: React.FC = () => (
  <>
    <Helmet>
      <title>Home - Repigo</title>
      <meta
        name="description"
        content="Your ultimate fitness companion. Track workouts, monitor progress, and stay motivated."
      />
      <meta
        property="og:title"
        content="Repigo - Track Smarter, Train Harder"
      />
      <meta
        property="og:description"
        content="Your ultimate fitness companion app for workouts and analytics."
      />
    </Helmet>
    <div className={styles.home}>
      <div
        className={styles.background}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <section className={styles.heroSection}>
        <div className={styles.content}>
          <h1>Track Smarter. Train Harder. Achieve More.</h1>
          <p>
            Your ultimate fitness companion. Track workouts, monitor progress,
            and stay motivated with a wide range of programs, workouts, and
            exercises.
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
          <div className={styles.imageContainer}>
            <div className={styles.stackContainer}>
              <img
                src={screenshot2}
                alt="App screenshot"
                className={styles.screenshotBack1}
              />
              <img
                src={screenshot3}
                alt="App screenshot"
                className={styles.screenshotBack2}
              />
              <img
                src={screenshot}
                alt="App screenshot"
                className={styles.screenshotFront}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </>
);

export default Home;
