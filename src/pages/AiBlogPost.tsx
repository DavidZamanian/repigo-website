import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Seo from "@/components/Seo/Seo";
import {
  aiBlogPostBySlug,
  AiBlogPost as AiBlogPostModel,
} from "@/content/aiBlogPosts";
import { getAiBlogCoverImage } from "@/content/aiBlogCoverImages";
import styles from "./AiBlogPost.module.css";

const getYesterdayDateLabel = (): string => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return yesterday.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const AiBlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post: AiBlogPostModel | undefined = slug
    ? aiBlogPostBySlug.get(slug)
    : undefined;
  const yesterdayDate = getYesterdayDateLabel();

  if (!post) {
    return <Navigate to="/ai-blog" replace />;
  }

  const pagePath = `/ai-blog/${post.slug}`;

  return (
    <>
      <Seo
        title={`${post.title} | Repigo AI Blog`}
        description={post.summary}
        path={pagePath}
        ogType="article"
      />

      <main className={styles.page}>
        <article className={styles.article}>
          <img src={getAiBlogCoverImage(post.cover)} alt={post.title} className={styles.cover} />
          <p className={styles.publishDate}>{yesterdayDate}</p>
          <h1>{post.title}</h1>
          <p className={styles.summary}>{post.summary}</p>

          <div className={styles.content}>
            {post.sections.map((section) => (
              <section key={section.heading} className={styles.section}>
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
                          <tr key={`${section.heading}-${rowIndex}`}>
                            {row.map((cell, cellIndex) => (
                              <td key={`${section.heading}-${rowIndex}-${cellIndex}`}>{cell}</td>
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

          <Link to="/ai-blog" className={styles.backLink}>
            Back to AI Blog
          </Link>
        </article>
      </main>
    </>
  );
};

export default AiBlogPost;
