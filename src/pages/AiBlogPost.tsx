import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import Seo from "@/components/Seo/Seo";
import {
  aiBlogPosts,
  aiBlogPostBySlug,
  AiBlogPost as AiBlogPostModel,
} from "@/content/aiBlogPosts";
import { getAiBlogCoverImage } from "@/content/aiBlogCoverImages";
import styles from "./AiBlogPost.module.css";

const SITE_URL = "https://repigo.app";
const APP_STORE_URL = "https://apps.apple.com/app/id6746357264";

const formatDateLabel = (isoDate: string): string =>
  new Date(`${isoDate}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const absoluteUrl = (path: string): string => new URL(path, SITE_URL).toString();

const AiBlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post: AiBlogPostModel | undefined = slug
    ? aiBlogPostBySlug.get(slug)
    : undefined;

  if (!post) {
    return <Navigate to="/ai-blog" replace />;
  }

  const pagePath = `/ai-blog/${post.slug}`;
  const coverPath = getAiBlogCoverImage(post.cover);
  const coverUrl = absoluteUrl(coverPath);
  const canonicalUrl = absoluteUrl(pagePath);
  const relatedPosts = aiBlogPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .sort((a, b) => Math.abs(a.id - post.id) - Math.abs(b.id - post.id))
    .slice(0, 3);

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    image: [coverUrl],
    datePublished: `${post.publishedAt}T00:00:00Z`,
    dateModified: `${post.updatedAt}T00:00:00Z`,
    mainEntityOfPage: canonicalUrl,
    author: {
      "@type": "Organization",
      name: "Repigo Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Repigo",
      url: SITE_URL,
    },
  };

  return (
    <>
      <Seo
        title={`${post.title} | Repigo AI Blog`}
        description={post.summary}
        path={pagePath}
        ogType="article"
        image={coverPath}
      />
      <Helmet>
        <meta
          property="article:published_time"
          content={`${post.publishedAt}T00:00:00Z`}
        />
        <meta
          property="article:modified_time"
          content={`${post.updatedAt}T00:00:00Z`}
        />
        <meta name="author" content="Repigo Team" />
        <script type="application/ld+json">
          {JSON.stringify(articleStructuredData)}
        </script>
      </Helmet>

      <main className={styles.page}>
        <div className={styles.topBackRow}>
          <Link to="/ai-blog" className={styles.topBackButton}>
            Back to articles
          </Link>
        </div>

        <article className={styles.article}>
          <img src={coverPath} alt={post.title} className={styles.cover} />
          <div className={styles.metaRow}>
            <p className={styles.publishDate}>
              Published {formatDateLabel(post.publishedAt)}
            </p>
            <p className={styles.updateDate}>
              Updated {formatDateLabel(post.updatedAt)}
            </p>
          </div>
          <h1>{post.title}</h1>
          <p className={styles.summary}>{post.summary}</p>

          <div className={styles.content}>
            {post.sections.map((section, sectionIndex) => (
              <section
                key={`${section.heading}-${sectionIndex}`}
                className={styles.section}
              >
                <h2>{section.heading}</h2>
                <p>{section.content}</p>
                {section.table && (
                  <div className={styles.tableWrap}>
                    {section.table.caption && (
                      <p className={styles.tableCaption}>{section.table.caption}</p>
                    )}
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          {section.table.columns.map((column) => (
                            <th key={column}>{column}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, rowIndex) => (
                          <tr key={`${sectionIndex}-${rowIndex}`}>
                            {row.map((cell, cellIndex) => (
                              <td key={`${sectionIndex}-${rowIndex}-${cellIndex}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>

          {relatedPosts.length > 0 && (
            <section className={styles.relatedSection}>
              <h2>Related Articles</h2>
              <ul className={styles.relatedList}>
                {relatedPosts.map((relatedPost) => (
                  <li key={relatedPost.slug}>
                    <Link
                      to={`/ai-blog/${relatedPost.slug}`}
                      className={styles.relatedLink}
                    >
                      {relatedPost.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className={styles.ctaSection}>
            <h2>Track your next workout with Repigo</h2>
            <p>
              Log sessions faster, review your progress clearly, and stay
              consistent in the gym.
            </p>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.appStoreCta}
            >
              Download on the App Store
            </a>
          </section>

        </article>
      </main>
    </>
  );
};

export default AiBlogPost;
