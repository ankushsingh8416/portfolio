"use client";

import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealAll } from "@/lib/gsapReveal";

export default function About() {
  const sectionRef = useRef(null);
  const rowRef = useRef(null);
  const imageColRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      VanillaTilt.init(imageRef.current, { max: 15 });
    }

    const cleanup = revealAll([
      {
        scope: sectionRef,
        selector: ".content h3",
        options: { from: { y: 25, opacity: 0 }, duration: 0.45 },
      },
      {
        scope: sectionRef,
        selector: ".content .tag",
        options: { from: { y: 20, opacity: 0 }, duration: 0.45, delay: 0.08 },
      },
      {
        scope: sectionRef,
        selector: ".content p",
        options: {
          from: { y: 25, opacity: 0 },
          duration: 0.5,
          stagger: 0.12,
          delay: 0.15,
        },
      },
      {
        scope: sectionRef,
        selector: ".box-container .box",
        options: {
          from: { y: 30, opacity: 0 },
          duration: 0.45,
          stagger: 0.1,
          delay: 0.1,
        },
      },
      {
        scope: sectionRef,
        selector: ".resumebtn",
        options: { from: { y: 20, opacity: 0 }, duration: 0.45, delay: 0.15 },
      },
    ]);

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 992px)", () => {
      const pinTrigger = ScrollTrigger.create({
        trigger: rowRef.current,
        start: "top 0px",
        end: () =>
          "+=" +
          Math.max(
            0,
            contentRef.current.offsetHeight - imageColRef.current.offsetHeight
          ),
        pin: imageColRef.current,
        // Lenis eases scroll with momentum, so by the time the native scroll
        // position technically crosses `start`, the frame has already moved
        // a bit further — anticipatePin makes ScrollTrigger swap to fixed
        // slightly early (based on velocity) so the pin doesn't visibly snap.
        anticipatePin: 1,
      });
      return () => pinTrigger.kill();
    });

    return () => {
      if (imageRef.current && imageRef.current.vanillaTilt) {
        imageRef.current.vanillaTilt.destroy();
      }
      cleanup();
      mm.revert();
    };
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <h2 className="heading">
        <i className="fas fa-user-alt"></i> About <span>Me</span>
      </h2>

      <div className="row" ref={rowRef}>
        <div className="image" ref={imageColRef}>
          <img
            className="tilt"
            src="/assets/images/ankush-developer.webp"
            alt=""
            ref={imageRef}
          />
        </div>
        <div className="content" ref={contentRef}>
          <h3>I&apos;m Ankush</h3>
          <span className="tag">Full-Stack Engineer &amp; AI Systems Builder</span>
          <p>
            I&rsquo;m Ankush Kumar, a <strong>Full-Stack Engineer</strong> and
            AI systems builder currently shipping production platforms at{" "}
            <strong>Meta Reach Marketing</strong>. I work across the stack
            with <strong>Next.js</strong>, <strong>React</strong>, and{" "}
            <strong>Node.js / Express</strong>, backed by{" "}
            <strong>PostgreSQL</strong>, <strong>MongoDB</strong>,{" "}
            <strong>Redis</strong>, and <strong>Prisma</strong> &ndash; with{" "}
            <strong>Go</strong> for the pieces that need extra performance
            headroom, and <strong>Docker</strong> to ship it all reliably.
          </p>

          <p>
            My focus lately has been <strong>agentic AI</strong>: designing
            autonomous agents and LLM-driven workflows with{" "}
            <strong>Claude</strong>, <strong>OpenAI</strong>, and{" "}
            <strong>Gemini</strong>, backed by <strong>RAG pipelines</strong>{" "}
            built on <strong>LangChain</strong> and vector search across{" "}
            <strong>Pinecone</strong> and <strong>Qdrant</strong>.{" "}
            <em>ResuCraft</em>, an AI resume builder I built solo end-to-end,
            is the clearest example &ndash; Gemini-driven ATS scoring,
            LangChain-guided mock interviews across six personas, and a
            Pinecone-backed retrieval layer underneath.
          </p>

          <p>
            I pair that engineering work with growth: technical{" "}
            <strong>SEO, AEO &amp; GEO</strong> strategy plus{" "}
            <strong>Meta Ads</strong>{" "}
            execution, so what I build is discoverable by search engines and
            AI answer engines alike, not
            just functional. I&rsquo;ve applied this on real client
            platforms including <em>HP Connect</em>,{" "}
            <em>India Gate Basmati Rice</em>, and <em>Karein</em>.
          </p>

          <p>
            I also bridge engineering and design &ndash;{" "}
            <strong>Figma</strong>, <strong>GSAP</strong>, and{" "}
            <strong>Framer Motion</strong>{" "}
            &ndash; so interfaces ship polished without a handoff gap. From
            architecture through deployment, I
            like owning the whole path and tying technical decisions back to
            what actually moves the product forward.
          </p>

          <div className="box-container">
            <div className="box">
              <p>
                <span> experience: </span>2+ years
              </p>
              <p>
                <span> phone : </span> +91 980-151-6770
              </p>
            </div>
            <div className="box">
              <p>
                <span> email : </span>
                <a
                  href="mailto:ankushsingh8416@gmail.com"
                  style={{ color: "#000", textTransform: "lowercase" }}
                >
                  ankushsingh8416@gmail.com
                </a>
              </p>
              <p>
                <span> place : </span>Laxmi Nagar Delhi
              </p>
            </div>
          </div>

          <div className="resumebtn">
            <a
              href="https://drive.google.com/file/d/1zF8H2cYUYueWo3KNKNYliq3-jghLXPyk/view"
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              <span>Resume</span>
              <i className="fas fa-chevron-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
