"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import VanillaTilt from "vanilla-tilt";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTopButton from "@/components/ScrollTopButton";
import FaviconTitleSwap from "@/components/FaviconTitleSwap";
import { revealElements } from "@/lib/gsapReveal";
import projects from "@/data/projects.json";

const FILTERS = [
  { label: "All Projects", value: "*" },
  { label: "Full Stack", value: "full" },
  { label: "LAMP Stack", value: "lamp" },
  { label: "Basic Web", value: "basicweb" },
  { label: "Android App", value: "android" },
];

export default function ProjectsView() {
  const [activeFilter, setActiveFilter] = useState("*");
  const gridRef = useRef(null);

  const visibleProjects =
    activeFilter === "*"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  useEffect(() => {
    if (!gridRef.current) return;
    const tiltEls = gridRef.current.querySelectorAll(".tilt");
    VanillaTilt.init(tiltEls, { max: 15 });

    // Re-plays every time the filter changes, since the grid re-renders
    // a fresh set of .grid-item nodes.
    const cleanupReveal = revealElements(gridRef, ".grid-item", {
      from: { y: 40, opacity: 0, scale: 0.92 },
      duration: 0.45,
      stagger: 0.06,
      start: "top 95%",
    });

    return () => {
      tiltEls.forEach((el) => el.vanillaTilt && el.vanillaTilt.destroy());
      cleanupReveal();
    };
  }, [activeFilter]);

  return (
    <main className="page-projects">
      <FaviconTitleSwap visibleTitle="Projects | Portfolio Ankush Rajput" />
      <Header variant="sub" active="work" logoText="Jigar" />

      <section className="work" id="work">
        <h2 className="heading">
          <i className="fas fa-laptop-code"></i> Projects <span>Made</span>
        </h2>

        <div id="filters" className="button-group">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              className={`btn${activeFilter === filter.value ? " is-checked" : ""}`}
              data-filter={filter.value === "*" ? "*" : `.${filter.value}`}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="box-container" ref={gridRef}>
          {visibleProjects.map((project) => (
            <div className={`grid-item ${project.category}`} key={project.name}>
              <div className="box tilt">
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
            </div>
          ))}
        </div>

        <div className="backbtn">
          <Link href="/#work" className="btn">
            <i className="fas fa-arrow-left"></i>
            <span>Back to Home</span>
          </Link>
        </div>
      </section>

      <Footer variant="projects" />

      <ScrollTopButton target="work" />
    </main>
  );
}
