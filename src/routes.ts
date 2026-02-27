import aiBlogPosts from "@/content/aiBlogPosts.json";

export interface RouteConfig {
  path: string;
  priority: number;
}

/**
 * The base URL for your site; override via SITE_URL env var in production.
 */
export const domain: string = process.env.SITE_URL || "https://yourdomain.com";

/**
 * List of front-end routes to include in sitemap.
 */
export const routes: RouteConfig[] = [
  { path: "/", priority: 1.0 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy", priority: 0.6 },
  { path: "/terms", priority: 0.6 },
  { path: "/ai-blog", priority: 0.7 },
  ...aiBlogPosts.map((post) => ({
    path: `/ai-blog/${post.slug}`,
    priority: 0.55,
  })),
];
