import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
function ensureGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

const NEUTRAL = { y: 0, x: 0, opacity: 1, scale: 1, rotate: 0 };

/**
 * Animate every element matched by `selector` inside `scope` individually —
 * each element gets a fast, staggered entrance (short duration, snappy
 * easing) triggered once the group scrolls into view, and replays every
 * time it re-enters the viewport.
 */
export function revealElements(
  scope,
  selector,
  {
    from = { y: 40, opacity: 0 },
    duration = 0.6,
    stagger = 0.08,
    delay = 0,
    start = "top 85%",
    ease = "power3.out",
    trigger,
  } = {}
) {
  ensureGsap();
  const root = scope && scope.current ? scope.current : document;
  const els = gsap.utils.toArray(root.querySelectorAll(selector));
  if (!els.length) return () => {};

  const to = { duration, stagger, delay, ease };
  Object.keys(from).forEach((key) => {
    if (key in NEUTRAL) to[key] = NEUTRAL[key];
  });

  const tween = gsap.fromTo(els, from, {
    ...to,
    scrollTrigger: {
      trigger: trigger || (root === document ? els[0] : root),
      start,
      toggleActions: "play reverse play reverse",
    },
  });

  return () => {
    tween.scrollTrigger && tween.scrollTrigger.kill();
    tween.kill();
  };
}

/**
 * Like revealElements, but gives each matched element its OWN ScrollTrigger
 * (anchored to that element, not the group/section) — use this for elements
 * spread far apart vertically (e.g. a tall timeline), where a single shared
 * trigger would fire the whole group's animation at once instead of each
 * item revealing as it individually scrolls into view.
 */
export function revealEach(
  scope,
  selector,
  {
    from = { y: 40, opacity: 0 },
    duration = 0.6,
    delay = 0,
    start = "top 85%",
    ease = "power3.out",
  } = {}
) {
  ensureGsap();
  const root = scope && scope.current ? scope.current : document;
  const els = gsap.utils.toArray(root.querySelectorAll(selector));
  if (!els.length) return () => {};

  const to = { duration, delay, ease };
  Object.keys(from).forEach((key) => {
    if (key in NEUTRAL) to[key] = NEUTRAL[key];
  });

  const tweens = els.map((el) =>
    gsap.fromTo(el, from, {
      ...to,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play reverse play reverse",
      },
    })
  );

  return () => {
    tweens.forEach((tween) => {
      tween.scrollTrigger && tween.scrollTrigger.kill();
      tween.kill();
    });
  };
}

/** Runs several revealElements() calls together and returns one combined cleanup. */
export function revealAll(configs) {
  const cleanups = configs.map((cfg) =>
    revealElements(cfg.scope, cfg.selector, cfg.options)
  );
  return () => cleanups.forEach((cleanup) => cleanup());
}
