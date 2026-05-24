import type { MetadataRoute } from "next";
import { getAllPosts, CATEGORIES } from "@/lib/posts";

const SITE_URL = "https://service.kyakuhon-pakkun.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: new Date(post.frontmatter.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/blog/category/${encodeURIComponent(cat)}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [
    {
      url: `${SITE_URL}/blog/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...categoryEntries,
    ...postEntries,
  ];
}
