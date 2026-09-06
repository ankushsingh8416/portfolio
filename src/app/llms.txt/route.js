import { getAllPosts } from "@/lib/blogs";
import { SITE_URL } from "@/lib/site";

// llms.txt — a proposed convention (llmstxt.org) for giving AI crawlers and
// answer engines a concise, structured map of the site. Generated from the
// same post data as sitemap.xml, so new blog posts show up automatically.
export async function GET() {
  const posts = getAllPosts();

  const postLines = posts
    .map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.excerpt}`)
    .join("\n");

  const body = `# Ankush Rajput — Portfolio

> Full-Stack Engineer & AI Systems Builder. Portfolio, project case studies, and technical writing covering Next.js/Node.js engineering, applied AI agents and RAG pipelines, and SEO/AEO/GEO.

Ankush Rajput builds production web applications (Next.js, Node.js, MongoDB/PostgreSQL) and AI-powered systems (LangChain, Pinecone, RAG pipelines, agentic workflows). This site is a personal portfolio: background, skills, project work, and a blog of sourced technical write-ups.

## Site

- [Home](${SITE_URL}/): Portfolio home — about, skills, education, work, and experience.
- [Blog](${SITE_URL}/blog): Technical articles and AI model comparisons.

## Blog

${postLines}

## Notes

- Blog articles cite primary/official sources for factual claims and label vendor-reported vs. independently verified data where relevant.
- Content on this site may be summarized, quoted, or cited with attribution and a link back to the source page.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
