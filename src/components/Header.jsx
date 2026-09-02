"use client";

import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Header({
  variant = "home",
  active,
  logoText = "Ankush",
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollActive, setScrollActive] = useState("home");

  useEffect(() => {
    // Section offsets are read once (and on resize) instead of on every
    // scroll tick — with Lenis firing scroll events every rAF frame,
    // re-reading offsetTop/offsetHeight (forced layout reflow) on each one
    // was expensive enough to visibly jank/stutter the smooth scroll.
    let sections = [];
    let ticking = false;

    function measureSections() {
      sections = Array.from(document.querySelectorAll("section[id]")).map(
        (section) => ({
          id: section.id,
          top: section.offsetTop - 200,
          bottom: section.offsetTop - 200 + section.offsetHeight,
        })
      );
    }

    function update() {
      ticking = false;
      setMenuOpen(false);

      if (variant !== "home") return;

      const top = window.scrollY;
      let current = "home";
      for (const section of sections) {
        if (top > section.top && top < section.bottom) {
          current = section.id;
          break;
        }
      }
      setScrollActive(current);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    measureSections();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measureSections);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measureSections);
    };
  }, [variant]);

  const isActive = (id) => (variant === "home" ? scrollActive === id : active === id);
  const hrefFor = (id) => (variant === "home" ? `#${id}` : `/#${id}`);

  return (
    <header>
      <a href="/" className="logo">
        <i className="fab fa-node-js"></i> {logoText}
      </a>

      <div
        id="menu"
        className={`fas fa-bars${menuOpen ? " fa-times" : ""}`}
        onClick={() => setMenuOpen((open) => !open)}
      ></div>
      <nav className={`navbar${menuOpen ? " nav-toggle" : ""}`}>
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                className={isActive(item.id) ? "active" : ""}
                href={hrefFor(item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
