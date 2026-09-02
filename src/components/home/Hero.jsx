"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { TypeAnimation } from "react-type-animation";
import VanillaTilt from "vanilla-tilt";
import { revealAll } from "@/lib/gsapReveal";

const TYPED_SEQUENCE = [
  "full stack development",
  1500,
  "AI agents & RAG",
  1500,
  "LangChain & vector DBs",
  1500,
  "SEO, AEO & GEO",
  1500,
  "Meta Ads & graphic design",
  1500,
];

const PARTICLES_CONFIG = {
  particles: {
    number: {
      value: 80,
      density: { enable: true, value_area: 800 },
    },
    color: { value: "#000000" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
    },
    size: {
      value: 5,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#000000",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
  config_demo: {
    hide_card: false,
    background_color: "#000000",
    background_image: "",
    background_position: "50% 50%",
    background_repeat: "no-repeat",
    background_size: "cover",
  },
};

export default function Hero() {
  const sectionRef = useRef(null);
  const heroImageRef = useRef(null);

  useEffect(() => {
    if (heroImageRef.current) {
      VanillaTilt.init(heroImageRef.current, { max: 15 });
    }

    const cleanup = revealAll([
      {
        scope: sectionRef,
        selector: ".hero-line",
        options: { from: { y: 30, opacity: 0 }, duration: 0.5, stagger: 0.12 },
      },
      {
        scope: sectionRef,
        selector: ".content p",
        options: { from: { y: 25, opacity: 0 }, duration: 0.5, delay: 0.25 },
      },
      {
        scope: sectionRef,
        selector: ".content .btn",
        options: { from: { y: 25, opacity: 0 }, duration: 0.5, delay: 0.35 },
      },
      {
        scope: sectionRef,
        selector: ".image",
        options: {
          from: { scale: 0.8, opacity: 0 },
          duration: 0.7,
          delay: 0.15,
        },
      },
      {
        scope: sectionRef,
        selector: ".social-icons li",
        options: {
          from: { scale: 0.4, opacity: 0 },
          duration: 0.45,
          stagger: 0.09,
          delay: 0.45,
        },
      },
    ]);

    return () => {
      if (heroImageRef.current && heroImageRef.current.vanillaTilt) {
        heroImageRef.current.vanillaTilt.destroy();
      }
      cleanup();
    };
  }, []);

  function initParticles() {
    if (window.particlesJS) {
      window.particlesJS("particles-js", PARTICLES_CONFIG);
    }
  }

  return (
    <section className="home" id="home" ref={sectionRef}>
      <Script
        src="/assets/js/particles.min.js"
        strategy="afterInteractive"
        onReady={initParticles}
      />
      <div id="particles-js"></div>

      <div className="content">
        <h2>
          <span className="hero-line">Hi There,</span>
          <span className="hero-line">
            I&apos;m Ankush <span className="hero-name">Rajput</span>
          </span>
        </h2>
        <p>
          I am into{" "}
          <TypeAnimation
            sequence={TYPED_SEQUENCE}
            wrapper="span"
            className="typing-text"
            speed={50}
            deletionSpeed={65}
            repeat={Infinity}
            cursor
          />
        </p>
        <a href="#about" className="btn">
          <span>About Me</span>
          <i className="fas fa-arrow-circle-down"></i>
        </a>
        <div className="socials">
          <ul className="social-icons">
            <li>
              <a
                className="linkedin"
                aria-label="LinkedIn"
                href="https://www.linkedin.com/in/ankush8416/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a
                className="github"
                aria-label="GitHub"
                href="https://github.com/ankushsingh8416?tab=repositories"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-github"></i>
              </a>
            </li>
            <li>
              <a
                className="twitter"
                aria-label="Twitter"
                href="https://x.com/AnkushRajput80867"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a
                className="whatsapp"
                aria-label="Whatsapp"
                href="https://wa.me/919801516770"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </li>
            <li>
              <a
                className="instagram"
                aria-label="Instagram"
                href="https://www.instagram.com/rajputankush5254?igsh=MTZ0YTd3aDRjbTdwOQ=="
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="image">
        <img
          draggable="false"
          className="tilt"
          src="/assets/images/hero.png"
          alt=""
          ref={heroImageRef}
        />
      </div>
    </section>
  );
}
