"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { revealEach } from "@/lib/gsapReveal";

export default function ExperiencePreview() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cleanupRight = revealEach(sectionRef, ".timeline .container.right", {
      from: { x: 70, opacity: 0 },
      duration: 0.55,
    });
    const cleanupLeft = revealEach(sectionRef, ".timeline .container.left", {
      from: { x: -70, opacity: 0 },
      duration: 0.55,
    });
    return () => {
      cleanupRight();
      cleanupLeft();
    };
  }, []);

  return (
    <section className="experience" id="experience" ref={sectionRef}>
      <h2 className="heading">
        <i className="fas fa-briefcase"></i> Experience{" "}
      </h2>
      <div className="timeline">
        <div className="container right">
          <div className="content">
            <div className="tag">
              <h2>Full Stack Engineer &ndash; Meta Reach Marketing</h2>
            </div>
            <div className="desc">
              <p>
                <b>Sep 2025 &ndash; Present, Noida:</b> Architecting
                end-to-end web platforms with Next.js, Node.js, and MongoDB,
                and building AI-driven automation workflows integrated with
                analytics and CRM tooling.
              </p>
              <p>
                <b>Growth Engineering:</b>{" "}
                Applying advanced SEO, AEO &amp; GEO practices to improve
                organic and AI-answer-engine discoverability across client
                platforms.
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
                <b>Feb 2024 &ndash; Aug 2025, Gurugram:</b> Built and deployed
                full-stack applications with Next.js, Shopify, and WordPress,
                including custom Shopify themes and high-speed, SEO-tuned
                WordPress sites.
              </p>
              <p>
                <b>APIs &amp; Auth:</b> Integrated REST and GraphQL APIs with
                JWT- and OAuth-based authentication across projects.
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
                <b>ResuCraft:</b>{" "}
                AI resume builder with Gemini-driven ATS scoring,
                LangChain-guided mock interviews, and Pinecone vector search
                &ndash; built solo.
              </p>
              <p>
                <b>India Gate Basmati Rice:</b> UI contributor on the
                official brand website as part of a 4-person team.
              </p>
              <p>
                <b>HP Connect:</b> Full-stack Next.js platform with a
                Stripe-powered payments backend.
              </p>
              <p>
                <b>Karein:</b> Custom Shopify storefront built solo for a
                conversion-optimized shopping experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="morebtn">
        <Link href="/experience" className="btn">
          <span>View All</span>
          <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </section>
  );
}
