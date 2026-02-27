#!/usr/bin/env node
// Script to dynamically generate sitemap.xml and robots.txt into the public directory
const fs = require("fs");
const path = require("path");
const aiBlogPosts = require("../src/content/aiBlogPosts.json");

// Base domain (override via SITE_URL environment variable)
const domain = process.env.SITE_URL || "https://repigo.app";
const buildDate = new Date().toISOString().slice(0, 10);

// List of front-end routes to include in the sitemap
const baseRoutes = [
  { path: "/", lastmod: buildDate },
  { path: "/contact", lastmod: buildDate },
  { path: "/privacy", lastmod: buildDate },
  { path: "/terms", lastmod: buildDate },
];

const aiBlogRoutes = [
  {
    path: "/ai-blog",
    lastmod: aiBlogPosts
      .map((post) => post.updatedAt || post.publishedAt)
      .sort()
      .at(-1) || buildDate,
  },
  ...aiBlogPosts.map((post) => ({
    path: `/ai-blog/${post.slug}`,
    lastmod: post.updatedAt || post.publishedAt || buildDate,
  })),
];

const routes = [...baseRoutes, ...aiBlogRoutes];

// Ensure public directory exists
const publicDir = path.join(__dirname, "..", "public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Generate sitemap.xml content
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) =>
      `  <url>
    <loc>${domain}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

// Write sitemap.xml
const destination = path.join(publicDir, "sitemap.xml");
fs.writeFileSync(destination, sitemapContent, "utf8");
console.log(`Generated ${destination}`);

// Also update root sitemap.xml
const rootSitemap = path.join(__dirname, "..", "sitemap.xml");
fs.writeFileSync(rootSitemap, sitemapContent, "utf8");
console.log(`Generated ${rootSitemap}`);

// Generate robots.txt content
const robotsContent = `User-agent: *
Allow: /

Sitemap: ${domain}/sitemap.xml
`;

// Write robots.txt
fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsContent, "utf8");
console.log(`Generated ${path.join(publicDir, "robots.txt")}`);

// Also update root robots.txt
const rootRobots = path.join(__dirname, "..", "robots.txt");
fs.writeFileSync(rootRobots, robotsContent, "utf8");
console.log(`Generated ${rootRobots}`);
