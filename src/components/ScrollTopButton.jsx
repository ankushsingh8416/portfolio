"use client";

import { useEffect, useState } from "react";

export default function ScrollTopButton({ target }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    function onScroll() {
      setActive(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll);
    window.addEventListener("load", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("load", onScroll);
    };
  }, []);

  return (
    <a
      href={`#${target}`}
      aria-label="ScrollTop"
      className={`fas fa-angle-up${active ? " active" : ""}`}
      id="scroll-top"
    >
      <span className="sr-only">Scroll to top</span>
    </a>
  );
}
