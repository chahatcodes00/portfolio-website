import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import SectionDivider from "./components/SectionDivider.jsx";
import { stripHash } from "./utils/scrollToSection.js";
import ParticleBackground from "./components/ParticleBackground.jsx";

export default function App() {
  // If the page is ever loaded directly on a URL with a #hash already in
  // it (bookmark, stale tab, shared link), clean the address bar back to
  // the base domain. The browser will already have jumped to that
  // section natively before this runs, so scroll position is unaffected.
  useEffect(() => {
    stripHash();
  }, []);

  return (
    <div className="min-h-screen font-body text-ink dark:text-white">
      <Navbar />
      <main>
        <ParticleBackground />
        <Hero />
        <SectionDivider index="01" label="about" />
        <About />
        <SectionDivider index="02" label="projects" />
        <Projects />
        <SectionDivider index="03" label="contact" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
