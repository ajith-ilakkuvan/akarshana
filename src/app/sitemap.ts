import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locations } from "@/config/locations";
import { getAllPosts } from "@/lib/blog";

const staticPaths = [
  "/",
  "/gold-rate/",
  "/services/",
  "/about/",
  "/careers/",
  "/locations/",
  "/contact/",
  "/faq/",
  "/blog/",
  "/privacy-policy/",
  "/terms/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: path === "/" || path === "/gold-rate/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : path === "/gold-rate/" ? 0.9 : 0.7,
  }));

  const locationEntries: MetadataRoute.Sitemap = locations.map((location) => ({
    url: `${siteConfig.url}${location.path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}/`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...locationEntries, ...postEntries];
}
