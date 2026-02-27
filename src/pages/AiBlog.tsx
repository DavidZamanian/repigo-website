import React from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo/Seo";
import { aiBlogPosts } from "@/content/aiBlogPosts";
import { getAiBlogCoverImage } from "@/content/aiBlogCoverImages";
import styles from "./AiBlog.module.css";

const PAGE_TITLE = "AI Blog | Repigo Workout Tracking";
const PAGE_DESCRIPTION =
  "Explore guides about workout tracking, progressive overload, training structure, and app comparisons.";

const formatDateLabel = (isoDate: string): string =>
  new Date(`${isoDate}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const AiBlog: React.FC = () => {
  const orderedPosts = [...aiBlogPosts].sort(
    (a, b) =>
      new Date(`${b.updatedAt}T00:00:00`).getTime() -
      new Date(`${a.updatedAt}T00:00:00`).getTime()
  );

  return (
    <>
      <Seo
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        path="/ai-blog"
        ogType="website"
      />
      <main className={styles.page}>
        <section className={styles.intro}>
          <p className={styles.eyebrow}>Repigo AI Blog</p>
          <h1>Workout guides and tracking articles</h1>
          <p className={styles.lead}>
            Browse practical articles on training setup, exercise planning, and
            long-term progress tracking.
          </p>
        </section>

        <section className={styles.grid} aria-label="AI Blog articles">
          {orderedPosts.map((post) => (
            <article key={post.id} className={styles.card}>
              <Link
                to={`/ai-blog/${post.slug}`}
                className={styles.cardLink}
                aria-label={`Read article: ${post.title}`}
              >
                <img
                  src={getAiBlogCoverImage(post.cover)}
                  alt={post.title}
                  className={styles.cardImage}
                  loading="lazy"
                />
                <div className={styles.cardBody}>
                  <p className={styles.publishDate}>
                    {formatDateLabel(post.updatedAt)}
                  </p>
                  <h2>{post.title}</h2>
                  <p className={styles.summary}>{post.summary}</p>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </main>
    </>
  );
};

export default AiBlog;
