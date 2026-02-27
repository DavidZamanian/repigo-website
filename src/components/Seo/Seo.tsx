import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://repigo.app";

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  ogType?: "website" | "article";
}

const absoluteUrl = (path: string): string => new URL(path, SITE_URL).toString();

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  path = "/",
  ogType = "website",
}) => {
  const canonicalUrl = absoluteUrl(path);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default Seo;
