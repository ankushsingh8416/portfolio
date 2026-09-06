import { getAllPosts } from "@/lib/blogs";
import { SITE_URL } from "@/lib/site";

export default function sitemap() {
  const staticRoutes = [
    { url: "/", changeFrequency: "monthly", priority: 1 },
    { url: "/projects", changeFrequency: "monthly", priority: 0.8 },
    { url: "/experience", changeFrequency: "monthly", priority: 0.7 },
    { url: "/blog", changeFrequency: "weekly", priority: 0.9 },
  ].map((route) => ({
    url: `${SITE_URL}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
