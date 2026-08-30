import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getPortfolioItems } from "@/lib/portfolio";

export const dynamic = "force-static";

const SITE_URL = "https://irclu.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const postsFa = getAllPosts("fa");
  const postsEn = getAllPosts("en");

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/en/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/en/blog/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/store/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/en/store/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/automation-check/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/en/automation-check/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...postsFa.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}/`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...postsEn.map((post) => ({
      url: `${SITE_URL}/en/blog/${post.slug}/`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...getPortfolioItems("fa").map((item) => ({
      url: `${SITE_URL}/portfolio/${item.slug}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...getPortfolioItems("en").map((item) => ({
      url: `${SITE_URL}/en/portfolio/${item.slug}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
