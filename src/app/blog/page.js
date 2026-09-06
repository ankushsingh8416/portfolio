import "./blog.css";
import BlogView from "@/components/blog/BlogView";

export const metadata = {
  title: "Blog | Ankush Rajput",
  description:
    "Articles and case studies on full-stack engineering, AI agents, and SEO/AEO/GEO growth from Ankush Rajput.",
};

export default function BlogPage() {
  return <BlogView />;
}
