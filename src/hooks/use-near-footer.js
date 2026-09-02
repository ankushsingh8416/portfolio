"use client";

import { useEffect, useState } from "react";

/**
 * True once the sitewide footer (id="site-footer") scrolls into view.
 * Fixed-position widgets (floating CTAs, contact icons) use this to fade
 * themselves out near the bottom of the page instead of overlapping and
 * breaking the footer layout.
 */
export function useNearFooter(rootMargin = "0px 0px -15% 0px") {
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [rootMargin]);

  return nearFooter;
}
