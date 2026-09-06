import { footerVariants } from "@/lib/footerVariants";

export default function Footer({ variant = "home" }) {
  const links = footerVariants[variant];

  return (
    <section className="footer" id="site-footer">
      <div className="box-container">
        <div className="box">
          <h3>Ankush&apos;s Portfolio</h3>
          <p>
            Thank you for visiting my personal portfolio website. Connect
            with me over socials. <br /> <br /> Keep Rising 🚀. Connect with
            me over live chat!
          </p>
        </div>

        <div className="box">
          <h3>quick links</h3>
          <a href="#home">
            <i className="fas fa-chevron-circle-right"></i> home
          </a>
          <a href="#about">
            <i className="fas fa-chevron-circle-right"></i> about
          </a>
          <a href="#skills">
            <i className="fas fa-chevron-circle-right"></i> skills
          </a>
          <a href="#education">
            <i className="fas fa-chevron-circle-right"></i> education
          </a>
          <a href="#work">
            <i className="fas fa-chevron-circle-right"></i> work
          </a>
          <a href="#experience">
            <i className="fas fa-chevron-circle-right"></i> experience
          </a>
          <a href="/blog">
            <i className="fas fa-chevron-circle-right"></i> blog
          </a>
        </div>

        <div className="box">
          <h3>contact info</h3>
          <p>
            {" "}
            <i className="fas fa-phone"></i>+91 98-0151-6770
          </p>
          <p>
            {" "}
            <i className="fas fa-envelope"></i>ankushsingh8416@gmail.com
          </p>
          <p>
            {" "}
            <i className="fas fa-map-marked-alt"></i>Laxminagar, Delhi-110092
          </p>
          <div className="share">
            <a
              href={links.linkedin}
              className="fab fa-linkedin"
              target="_blank"
              rel="noreferrer"
            >
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href={links.github}
              className="fab fa-github"
              target="_blank"
              rel="noreferrer"
            >
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href={links.email}
              className="fas fa-envelope"
              target="_blank"
              rel="noreferrer"
            >
              <span className="sr-only">Email</span>
            </a>
            <a
              href={links.twitter}
              className="fab fa-twitter"
              target="_blank"
              rel="noreferrer"
            >
              <span className="sr-only">X (Twitter)</span>
            </a>
            <a
              href={links.whatsapp}
              className="fab fa-whatsapp"
              target="_blank"
              rel="noreferrer"
            >
              <span className="sr-only">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <p className="credit">
        Designed with <i className="fa fa-heart pulse"></i> by{" "}
        <a href={links.creditHref}> Ankush Rajput</a>
      </p>
    </section>
  );
}
