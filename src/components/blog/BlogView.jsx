"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTopButton from "@/components/ScrollTopButton";
import FaviconTitleSwap from "@/components/FaviconTitleSwap";
import { revealElements } from "@/lib/gsapReveal";
import blogs from "@/data/blogs.json";

const CATEGORIES = [
  "All",
  ...Array.from(new Set(blogs.mediaPosts.map((post) => post.category))),
];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogView() {
  const [activeCategory, setActiveCategory] = useState("All");
  const contentRef = useRef(null);

  const visibleMediaPosts =
    activeCategory === "All"
      ? blogs.mediaPosts
      : blogs.mediaPosts.filter((post) => post.category === activeCategory);

  const formattedMediaPosts = useMemo(
    () =>
      visibleMediaPosts.map((post) => ({
        ...post,
        displayDate: formatDate(post.date),
      })),
    [visibleMediaPosts]
  );

  useEffect(() => {
    if (!contentRef.current) return;

    const cleanupText = revealElements(contentRef, ".text-post-card", {
      from: { y: 30, opacity: 0 },
      duration: 0.5,
      stagger: 0.08,
      start: "top 92%",
    });
    const cleanupMedia = revealElements(contentRef, ".media-post-card", {
      from: { y: 40, opacity: 0, scale: 0.96 },
      duration: 0.5,
      stagger: 0.08,
      start: "top 95%",
    });

    return () => {
      cleanupText();
      cleanupMedia();
    };
  }, [activeCategory]);

  return (
    <main className="page-blog">
      <FaviconTitleSwap visibleTitle="Blog | Portfolio Ankush Rajput" />
      <Header variant="sub" active="blog" />

      <section className="blog-hero" id="blog-hero">
        <span className="blob blob-a" aria-hidden="true"></span>
        <span className="blob blob-b" aria-hidden="true"></span>

        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <i className="fas fa-chevron-right"></i>
          <span>Blog</span>
        </nav>

        <span className="eyebrow">
          <i className="fas fa-feather-alt"></i> Insights &amp; Articles
        </span>
        <h1>Ideas on Full-Stack Engineering, AI Systems &amp; Growth</h1>
        <p>
          Notes from building production apps, AI agents, and SEO-driven
          platforms &mdash; practical write-ups pulled straight from real
          client work, not theory.
        </p>
      </section>

      <section className="blog-content" id="blog" ref={contentRef}>
        {blogs.textPosts.length > 0 && (
          <>
            <div className="blog-section-head">
              <h2 className="heading">
                Latest <span>Articles</span>
              </h2>
            </div>

            <div className="text-post-grid">
              {blogs.textPosts.map((post) => (
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-post-card"
                  key={post.slug}
                >
                  <span className="category">{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="read-more">
                    Read article <i className="fas fa-arrow-right"></i>
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}

        <div className="blog-section-head with-filters">
          <h2 className="heading">
            <i className="fas fa-layer-group"></i> From The <span>Blog</span>
          </h2>
          <div className="button-group filters">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className={`btn${activeCategory === category ? " is-checked" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="media-post-grid">
          {formattedMediaPosts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              className="media-post-card"
              key={post.slug}
            >
              <div className="thumb">
                <img
                  src={`/assets/images/${post.image}`}
                  alt={post.title}
                  draggable="false"
                />
                <span className="thumb-arrow">
                  <i className="fas fa-arrow-up"></i>
                </span>
              </div>
              <div className="media-post-body">
                <span className="meta">
                  {post.displayDate} &middot; {post.readTime}
                </span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="backbtn">
          <Link href="/" className="btn">
            <i className="fas fa-arrow-left"></i>
            <span>Back to Home</span>
          </Link>
        </div>
      </section>

      <Footer variant="blog" />

      <ScrollTopButton target="blog-hero" />
    </main>
  );
}
