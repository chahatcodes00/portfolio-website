import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { stripHash } from "./utils/scrollToSection.js";

export default function App() {
  // If the page is ever loaded directly on a URL with a #hash already in
  // it (bookmark, stale tab, shared link), clean the address bar back to
  // the base domain. The browser will already have jumped to that
  // section natively before this runs, so scroll position is unaffected.
  useEffect(() => {
    stripHash();
  }, []);

  return (
    <div className="min-h-screen bg-white font-body text-ink">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
