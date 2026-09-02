"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTopButton from "@/components/ScrollTopButton";
import FaviconTitleSwap from "@/components/FaviconTitleSwap";
import { revealAll, revealEach } from "@/lib/gsapReveal";

export default function ExperienceView() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cleanupQuote = revealAll([
      {
        scope: sectionRef,
        selector: ".quote",
        options: { from: { y: 20, opacity: 0 }, duration: 0.4 },
      },
    ]);
    const cleanupRight = revealEach(sectionRef, ".timeline .container.right", {
      from: { x: 70, opacity: 0 },
      duration: 0.55,
    });
    const cleanupLeft = revealEach(sectionRef, ".timeline .container.left", {
      from: { x: -70, opacity: 0 },
      duration: 0.55,
    });
    return () => {
      cleanupQuote();
      cleanupRight();
      cleanupLeft();
    };
  }, []);

  return (
    <main className="page-experience">
      <FaviconTitleSwap visibleTitle="Experience | Portfolio Ankush Rajput" />
      <Header variant="sub" active="experience" />

      <section className="experience" id="experience" ref={sectionRef}>
        <h2 className="heading">
          <i className="fas fa-briefcase"></i> Experience
        </h2>
        <div className="quote">
          <span>
            every experience in your life is being orchestrated to teach you
            something you need to know to move forward.
          </span>
        </div>

        <div className="timeline">
          <div className="container right">
            <div className="content">
              <div className="tag">
                <h2>Full Stack Engineer &ndash; Meta Reach Marketing</h2>
              </div>
              <div className="desc">
                <p>
                  <b>Sep 2025 &ndash; Present, Noida, Uttar Pradesh:</b>{" "}
                  Architecting end-to-end web platforms using Next.js,
                  Node.js, and MongoDB for scalable performance.
                </p>
                <p>
                  <b>Automation:</b> Built AI-driven automation workflows and
                  integrated analytics/CRM tooling to power data-driven
                  marketing operations.
                </p>
                <p>
                  <b>Discoverability:</b> Applied advanced SEO/AEO/GEO
                  practices to improve organic and AI-answer-engine
                  discoverability of client platforms.
                </p>
                <p>
                  <b>Engineering:</b> Enhanced UI/UX with React.js and
                  Tailwind CSS, optimized SSR, APIs, and DB queries to reduce
                  latency, and implemented secure JWT authentication with a
                  modular architecture.
                </p>
              </div>
            </div>
          </div>

          <div className="container left">
            <div className="content">
              <div className="tag">
                <h2>Full Stack Developer &ndash; The Code Story</h2>
              </div>
              <div className="desc">
                <p>
                  <b>Feb 2024 &ndash; Aug 2025, Gurugram, Haryana:</b> Built
                  and deployed full-stack apps using Next.js, Shopify, and
                  WordPress with strong scalability.
                </p>
                <p>
                  <b>Commerce &amp; CMS:</b> Developed Shopify themes and
                  plugins optimized for conversions, and created high-speed
                  WordPress sites with SEO and caching improvements.
                </p>
                <p>
                  <b>Frontend &amp; APIs:</b> Crafted modular, responsive
                  React interfaces and integrated REST and GraphQL APIs with
                  JWT and OAuth-based authentication.
                </p>
              </div>
            </div>
          </div>

          <div className="container right">
            <div className="content">
              <div className="tag">
                <h2>Key Projects</h2>
              </div>
              <div className="desc">
                <p>
                  <b>ResuCraft &ndash; AI Resume Builder with Interviewer:</b>{" "}
                  Solo-built platform for resume creation, ATS scoring, and
                  AI interview simulations across 6 personas &ndash; Next.js,
                  Tailwind, Shadcn UI, Node.js, Express, MongoDB, NextAuth,
                  and Fabric.js on the frontend, with Gemini API, LangChain,
                  and Pinecone powering the AI layer.
                </p>
                <p>
                  <b>India Gate Basmati Rice &ndash; Official Website:</b>{" "}
                  UI developer on the brand&rsquo;s official site as part of
                  a 4-person team, focused on an elegant, on-brand
                  interface.
                </p>
                <p>
                  <b>HP Connect:</b>{" "}
                  Full-stack Next.js platform with a Stripe-powered backend
                  for secure payments and transaction management &ndash;
                  built solo.
                </p>
                <p>
                  <b>Karein:</b> Custom Shopify storefront and theme built
                  solo, with optimized product pages and checkout flow.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="morebtn">
          <Link href="/" className="btn">
            <i className="fas fa-arrow-left"></i>
            <span>Back to Home</span>
          </Link>
        </div>
      </section>

      <Footer variant="experience" />

      <ScrollTopButton target="experience" />
    </main>
  );
}
