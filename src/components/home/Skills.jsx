"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { revealElements } from "@/lib/gsapReveal";
import skills from "@/data/skills.json";

const VISIBLE_COUNT = 30;

export default function Skills() {
  const sectionRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const hasMore = skills.length > VISIBLE_COUNT;
  const visibleSkills = expanded ? skills : skills.slice(0, VISIBLE_COUNT);

  useEffect(() => {
    const cleanup = revealElements(sectionRef, ".bar", {
      from: { y: 24, opacity: 0, scale: 0.9 },
      duration: 0.4,
      stagger: 0.045,
      start: "top 90%",
    });
    return cleanup;
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const els = sectionRef.current.querySelectorAll(".bar-extra");
    const tween = gsap.fromTo(
      els,
      { y: 24, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.04, ease: "power3.out" }
    );
    return () => tween.kill();
  }, [expanded]);

  return (
    <section className="skills" id="skills" ref={sectionRef}>
      <h2 className="heading">
        <i className="fas fa-laptop-code"></i> Skills &{" "}
        <span>Abilities</span>
      </h2>

      <div className="container">
        <div className="skills-grid-wrap">
          <div className="row" id="skillsContainer">
            {visibleSkills.map((skill, i) => (
              <div
                className={`bar${i >= VISIBLE_COUNT ? " bar-extra" : ""}`}
                key={skill.name}
              >
                <div className="info">
                  <img src={skill.icon} alt="skill" />
                  <span>{skill.name}</span>
                </div>
              </div>
            ))}
          </div>

          {hasMore && !expanded && <div className="skills-fade" />}
        </div>

        {hasMore && !expanded && (
          <div className="skills-more">
            <button
              type="button"
              className="skills-more-btn"
              onClick={() => setExpanded(true)}
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
