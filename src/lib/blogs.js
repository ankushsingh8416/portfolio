import blogsData from "@/data/blogs.json";

export function getAllPosts() {
  return [
    ...blogsData.textPosts.map((post) => ({ ...post, variant: "text" })),
    ...blogsData.mediaPosts.map((post) => ({ ...post, variant: "media" })),
  ];
}

export function getPostBySlug(slug) {
  return getAllPosts().find((post) => post.slug === slug) || null;
}

export function getRelatedPosts(post, limit = 3) {
  const rest = getAllPosts().filter((p) => p.slug !== post.slug);
  const sameCategory = rest.filter((p) => p.category === post.category);
  const others = rest.filter((p) => p.category !== post.category);
  return [...sameCategory, ...others].slice(0, limit);
}
