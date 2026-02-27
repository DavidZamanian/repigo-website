import aiBlogPostsJson from "./aiBlogPosts.json";

export type AiBlogCoverKey = string;

export interface AiBlogTable {
  caption?: string;
  columns: string[];
  rows: string[][];
}

export interface AiBlogSection {
  heading: string;
  content: string;
  table?: AiBlogTable;
}

export interface AiBlogPost {
  id: number;
  slug: string;
  title: string;
  summary: string;
  cover: AiBlogCoverKey;
  publishedAt: string;
  updatedAt: string;
  sections: AiBlogSection[];
}

export const aiBlogPosts: AiBlogPost[] = aiBlogPostsJson as AiBlogPost[];

export const aiBlogPostBySlug: ReadonlyMap<string, AiBlogPost> = new Map(
  aiBlogPosts.map((post) => [post.slug, post] as const)
);
