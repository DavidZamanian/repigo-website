import React from "react";
import { Helmet } from "react-helmet-async";
import Seo from "@/components/Seo/Seo";
import styles from "./Home.module.css";
import progressShot from "@/assets/progress-tab-1.png";
import dashboardShot from "@/assets/dashboard-tab.png";
import workoutShot from "@/assets/workout-tab.png";
import appStoreButton from "@/assets/apple-app-store-button.PNG";

const APP_STORE_URL = "https://apps.apple.com/app/id6746357264";
const PAGE_TITLE =
  "Repigo Workout Tracking App | Simple workout logging and powerful progress tracking";
const PAGE_DESCRIPTION =
  "Repigo helps you track workouts, monitor progress, and keep training consistent with a clean and focused fitness app experience.";

const highlights = [
  {
    title: "Quick workout logging",
    description:
      "Capture sets, reps, and weight with less friction so you stay focused on training.",
  },
  {
    title: "Clear progress trends",
    description:
      "Follow strength and volume over time so you can adjust your plan with confidence.",
  },
  {
    title: "Flexible training plans",
    description:
      "Run your own split, use built-in templates, or tailor sessions around your goals.",
  },
  {
    title: "Data you can trust",
    description:
      "Keep your full workout history organized and available whenever you need it.",
  },
];

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Repigo",
  url: "https://repigo.app/",
};

const appStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Repigo",
  applicationCategory: "HealthApplication",
  operatingSystem: "iOS",
  downloadUrl: APP_STORE_URL,
  url: "https://repigo.app/",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const Home: React.FC = () => (
  <>
    <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} path="/" />
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationStructuredData)}
      </script>
      <script type="application/ld+json">{JSON.stringify(appStructuredData)}</script>
    </Helmet>

    <main className={styles.home}>
      <section className={styles.heroSection}>
        <div className={styles.heroBackdrop} aria-hidden="true" />

        <div className={styles.heroInner}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>Repigo workout tracker</p>
            <h1>Track every session and keep progress moving.</h1>
            <p className={styles.lead}>
              Repigo gives you a clean training workflow for logging workouts,
              reviewing trends, and staying consistent over time.
            </p>

            <div className={styles.ctaArea}>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.appStoreButtonLink}
              >
                <img
                  src={appStoreButton}
                  alt="Download on the App Store"
                  className={styles.appStoreButton}
                />
              </a>
              <div
                className={styles.ratingCard}
                aria-label="Repigo average App Store rating: 5.0 out of 5 stars"
              >
                <p className={styles.ratingStars} aria-hidden="true">
                  ★★★★★
                </p>
                <p className={styles.ratingValue}>5.0</p>
                <p className={styles.ratingLabel}>App Store rating</p>
              </div>
            </div>

          </div>

          <div className={styles.imageContainer}>
            <div className={styles.stackContainer}>
              <img
                src={progressShot}
                alt="Repigo progress tab screen"
                className={styles.screenshotBackLeft}
              />
              <img
                src={dashboardShot}
                alt="Repigo dashboard tab screen"
                className={styles.screenshotBackRight}
              />
              <img
                src={workoutShot}
                alt="Repigo workout tab screen"
                className={styles.screenshotFront}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEyebrow}>What stands out</p>
          <h2>Simple workout logging with powerful progress tracking.</h2>
        </div>

        <div className={styles.featureGrid}>
          {highlights.map((item) => (
            <article key={item.title} className={styles.featureCard}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.bottomCta}>
        <div className={styles.bottomCtaInner}>
          <h2>Start training with better structure today</h2>
          <p>
            Download Repigo for iPhone now. Android support is on the roadmap
            and coming soon.
          </p>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.textCtaButton}
          >
            Open App Store
          </a>
        </div>
      </section>
    </main>
  </>
);

export default Home;
