"use client";

import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import { revealElements } from "@/lib/gsapReveal";
import projects from "@/data/projects.json";

export default function Work() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const tiltEls = sectionRef.current.querySelectorAll(".tilt");
    VanillaTilt.init(tiltEls, { max: 15 });

    const cleanup = revealElements(sectionRef, ".box-container .box", {
      from: { y: 50, opacity: 0, scale: 0.94 },
      duration: 0.5,
      stagger: 0.08,
    });

    return () => {
      tiltEls.forEach((el) => el.vanillaTilt && el.vanillaTilt.destroy());
      cleanup();
    };
  }, []);

  return (
    <section className="work" id="work" ref={sectionRef}>
      <h2 className="heading">
        <i className="fas fa-laptop-code"></i> Projects <span>Made</span>
      </h2>

      <div className="box-container">
        {projects.slice(0, 9).map((project) => (
          <div className="box tilt" key={project.name}>
            <img
              draggable="false"
              src={`/assets/images/projects/${project.image}`}
              alt="project"
            />
            <div className="content">
              <div className="tag">
                <h3>{project.name}</h3>
              </div>
              <div className="desc">
                <p>{project.desc}</p>
                <div className="btns">
                  {project.links.view && (
                    <a
                      href={project.links.view}
                      className="btn"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fas fa-eye"></i> View
                    </a>
                  )}
                  {project.links.code && (
                    <a
                      href={project.links.code}
                      className="btn"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Code <i className="fas fa-code"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
