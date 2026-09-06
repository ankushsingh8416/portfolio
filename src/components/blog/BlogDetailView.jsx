"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTopButton from "@/components/ScrollTopButton";
import FaviconTitleSwap from "@/components/FaviconTitleSwap";
import ArticleBlocks from "@/components/blog/ArticleBlocks";
import { revealElements } from "@/lib/gsapReveal";
import { renderRichText } from "@/lib/richText";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogDetailView({ post, related }) {
  const [openFaq, setOpenFaq] = useState(0);
  const contentRef = useRef(null);
  const scrollArtRef = useRef(null);

  // Entrance animation for the hero — plays once on mount, not scroll-gated,
  // since the breadcrumb/title/image are already in view on load.
  useEffect(() => {
    if (!scrollArtRef.current) return;
    const els = scrollArtRef.current.querySelectorAll(".reveal-in");
    if (!els.length) return;

    const tween = gsap.fromTo(
      els,
      { y: 26, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.14, ease: "power3.out" }
    );
    return () => tween.kill();
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;

    const cleanupTakeaways = revealElements(contentRef, ".takeaways-card li", {
      from: { x: -16, opacity: 0 },
      duration: 0.4,
      stagger: 0.1,
      start: "top 90%",
    });
    const cleanupParagraphs = revealElements(contentRef, ".post-body > *", {
      from: { y: 20, opacity: 0 },
      duration: 0.45,
      stagger: 0.06,
      start: "top 95%",
    });
    const cleanupTags = revealElements(contentRef, ".post-tags .tag-pill", {
      from: { y: 10, opacity: 0, scale: 0.9 },
      duration: 0.35,
      stagger: 0.05,
      start: "top 95%",
    });
    const cleanupFaqs = revealElements(contentRef, ".faq-item", {
      from: { y: 20, opacity: 0 },
      duration: 0.45,
      stagger: 0.08,
      start: "top 95%",
    });
    const cleanupSidebar = revealElements(contentRef, ".post-sidebar > *", {
      from: { y: 24, opacity: 0 },
      duration: 0.5,
      stagger: 0.1,
      start: "top 92%",
    });

    return () => {
      cleanupTakeaways();
      cleanupParagraphs();
      cleanupTags();
      cleanupFaqs();
      cleanupSidebar();
    };
  }, []);

  return (
    <main className="page-blog-detail">
      <FaviconTitleSwap visibleTitle={`${post.title} | Portfolio Ankush Rajput`} />
      <Header variant="sub" active="blog" />

      <div className="post-scroll-art" ref={scrollArtRef}>
        <section className="post-top" id="post-top">
          <nav className="breadcrumb reveal-in" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <i className="fas fa-chevron-right"></i>
            <Link href="/blog">Blog</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{post.category}</span>
          </nav>
          <h1 className="reveal-in">{post.title}</h1>
        </section>

        <div className="post-hero-image reveal-in">
          <img
            src={`/assets/images/${post.image}`}
            alt={post.title}
            draggable="false"
          />
        </div>

        <section className="post-layout" ref={contentRef}>
          <article className="post-main">
            <div className="post-meta">
              <span>
                <i className="fas fa-user"></i>{" "}
                <Link href="/">Ankush Rajput</Link>
              </span>
              <span>
                <i className="fas fa-calendar-alt"></i> {formatDate(post.date)}
              </span>
              <span>
                <i className="fas fa-clock"></i> {post.readTime}
              </span>
            </div>

            {post.takeaways && post.takeaways.length > 0 && (
              <div className="takeaways-card">
                <h2>Key Takeaways</h2>
                <ul>
                  {post.takeaways.map((point) => (
                    <li key={point}>
                      <CheckCircle2 size={18} strokeWidth={2} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="post-body">
              {post.blocks ? (
                <ArticleBlocks blocks={post.blocks} />
              ) : (
                post.content.map((paragraph, index) => (
                  <p key={index}>{renderRichText(paragraph)}</p>
                ))
              )}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="post-tags">
                {post.tags.map((tag) => (
                  <span className="tag-pill" key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {post.faqs && post.faqs.length > 0 && (
              <div className="post-faqs">
                <h2>FAQs</h2>
                {post.faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      className={`faq-item${isOpen ? " is-open" : ""}`}
                      key={faq.q}
                    >
                      <button
                        type="button"
                        className="faq-question"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                      >
                        <span className="faq-index">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="faq-q-text">{faq.q}</span>
                        <span className="faq-toggle-icon">
                          <i className="fas fa-plus"></i>
                        </span>
                      </button>
                      <div className="faq-answer">
                        <div className="faq-answer-inner">
                          <p>{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </article>

          <aside className="post-sidebar">
            <div className="sidebar-search">
              <input type="text" placeholder="Search" disabled />
              <button type="button" aria-label="Search" disabled>
                <i className="fas fa-search"></i>
              </button>
            </div>

            {related.length > 0 && (
              <div className="sidebar-block">
                <h3>Other Relevant Posts</h3>
                <ul className="sidebar-post-list">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link href={`/blog/${item.slug}`}>
                        <img
                          src={`/assets/images/${item.image}`}
                          alt={item.title}
                          draggable="false"
                        />
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="sidebar-share">
              <span className="share-label">
                <i className="fas fa-share-alt"></i> Share
              </span>
              <div className="share-icons">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                >
                  <i className="fab fa-twitter"></i>
                  <span className="sr-only">X (Twitter)</span>
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in"></i>
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                >
                  <i className="fab fa-youtube"></i>
                  <span className="sr-only">YouTube</span>
                </a>
              </div>
            </div>
          </aside>
        </section>
      </div>

      <Footer variant="blog" />

      <ScrollTopButton target="post-top" />
    </main>
  );
}
