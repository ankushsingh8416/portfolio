import "./home.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import DisableDevTools from "@/components/DisableDevTools";
import FaviconTitleSwap from "@/components/FaviconTitleSwap";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import Education from "@/components/home/Education";
import Work from "@/components/home/Work";
import ExperiencePreview from "@/components/home/ExperiencePreview";
import Contact from "@/components/home/Contact";

export default function HomePage() {
  return (
    <main className="page-home">
      <DisableDevTools />
      <FaviconTitleSwap visibleTitle="Portfolio | Ankush Rajput" />
      <Header variant="home" />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Work />
      <ExperiencePreview />
      <Contact />
      <Footer variant="home" />
      {/* <ChatWidget /> */}
    </main>
  );
}
