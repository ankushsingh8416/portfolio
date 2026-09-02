"use client";

import { useEffect, useRef, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { revealAll } from "@/lib/gsapReveal";

const TOAST_STYLE = {
  padding: "16px",
  borderRadius: "8px",
  width: "310px",
  height: "60px",
  fontSize: "16px",
  display: "flex",
  justifyContent: "spaceBetween",
  alignItems: "center",
};

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const cleanup = revealAll([
      {
        scope: sectionRef,
        selector: ".image-box",
        options: { from: { x: -60, opacity: 0 }, duration: 0.55 },
      },
      {
        scope: sectionRef,
        selector: ".form-group .field, .form-group .message",
        options: {
          from: { x: 40, opacity: 0 },
          duration: 0.45,
          stagger: 0.1,
          delay: 0.1,
        },
      },
      {
        scope: sectionRef,
        selector: ".button-area",
        options: { from: { y: 20, opacity: 0 }, duration: 0.4, delay: 0.5 },
      },
    ]);
    return cleanup;
  }, []);

  async function submitForm(event) {
    event.preventDefault();
    setSubmitting(true);

    const formData = {
      name: event.target.elements.name.value,
      email: event.target.elements.email.value,
      phone: event.target.elements.phone.value,
      message: event.target.elements.message.value,
    };

    try {
      const response = await fetch(
        "https://portfolio-backend-2-idw0.onrender.com/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        Toastify({
          text: responseData.message || "Form submitted successfully!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
          style: TOAST_STYLE,
          backgroundColor: "yellowGreen",
        }).showToast();

        formRef.current.reset();
      } else {
        Toastify({
          text: responseData.error || "Failed to submit form. Please try again.",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
          style: TOAST_STYLE,
          backgroundColor: "red",
        }).showToast();
      }
    } catch (error) {
      console.error("Ankush:", error);
      Toastify({
        text: "An error occurred. Please try again.",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        style: TOAST_STYLE,
        backgroundColor: "red",
      }).showToast();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <h2 className="heading">
        <i className="fas fa-headset"></i> Get in <span>Touch</span>
      </h2>

      <div className="container">
        <div className="content">
          <div className="image-box">
            <img draggable="false" src="/assets/images/contact1.png" alt="" />
          </div>
          <form id="contact-form" ref={formRef} onSubmit={submitForm}>
            <div className="form-group">
              <div className="field">
                <input type="text" name="name" placeholder="Name" required />
                <i className="fas fa-user"></i>
              </div>
              <div className="field">
                <input type="text" name="email" placeholder="Email" required />
                <i className="fas fa-envelope"></i>
              </div>
              <div className="field">
                <input type="text" name="phone" placeholder="Phone" />
                <i className="fas fa-phone-alt"></i>
              </div>
              <div className="message">
                <textarea placeholder="Message" name="message" required></textarea>
                <i className="fas fa-comment-dots"></i>
              </div>
            </div>
            <div className="button-area">
              <button
                type="submit"
                disabled={submitting}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {submitting ? (
                  <>
                    Loading.. <i className="fas fa-spinner fa-spin" style={{ top: 0 }}></i>
                  </>
                ) : (
                  <>
                    Submit <i className="fa fa-paper-plane"></i>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
