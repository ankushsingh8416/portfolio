"use client";

import { useEffect, useRef } from "react";
import { revealElements } from "@/lib/gsapReveal";

export default function Education() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cleanup = revealElements(sectionRef, ".box-container .box", {
      from: { y: 45, opacity: 0 },
      duration: 0.55,
      stagger: 0.15,
    });
    return cleanup;
  }, []);

  return (
    <section className="education" id="education" ref={sectionRef}>
      <h2 className="heading">
        <i className="fas fa-graduation-cap"></i> My <span>Education</span>
      </h2>

      <p className="qoute">
        Education is not the learning of facts, but the training of the mind
        to think.
      </p>

      <div className="box-container">
        <div className="box">
          <div className="image">
            <img draggable="false" src="/assets/images/educat/GLA.jpg" alt="" />
          </div>
          <div className="content">
            <h3>Bachelor Of Computer Applications </h3>
            <p>GLA University Mathura UP</p>
            <h4>2024-2027 | Progress</h4>
          </div>
        </div>

        <div className="box">
          <div className="image">
            <img draggable="false" src="/assets/images/educat/ptu.jpg" alt="" />
          </div>
          <div className="content">
            <h3>Bihar Board | 10th & 12th</h3>
            <p>Anugrah Naryan Singh +2 School | BSEB</p>
            <h4>2020-2024 | Completed</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
