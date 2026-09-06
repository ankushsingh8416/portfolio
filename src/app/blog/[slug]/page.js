import { notFound } from "next/navigation";
import "./blog-detail.css";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blogs";
import { SITE_URL } from "@/lib/site";
import BlogDetailView from "@/components/blog/BlogDetailView";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Blog | Ankush Rajput" };
  }

  return {
    title: `${post.title} | Ankush Rajput`,
    description: post.excerpt,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
  };
}

function buildJsonLd(post) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = `${SITE_URL}/assets/images/${post.image}`;

  const article = {
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [imageUrl],
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      "@type": "Person",
      name: "Ankush Rajput",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Ankush Rajput",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/images/favicon.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const graph = [article, breadcrumb];

  if (post.faqs && post.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = getRelatedPosts(post, 3);
  const jsonLd = buildJsonLd(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailView post={post} related={related} />
    </>
  );
}
