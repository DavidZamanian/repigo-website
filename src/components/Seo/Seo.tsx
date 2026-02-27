import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://repigo.app";

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  ogType?: "website" | "article";
  image?: string;
}

const absoluteUrl = (path: string): string => new URL(path, SITE_URL).toString();

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  path = "/",
  ogType = "website",
  image,
}) => {
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = image ? absoluteUrl(image) : undefined;

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
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
    </Helmet>
  );
};

export default Seo;
