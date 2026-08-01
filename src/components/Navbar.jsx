import { useEffect, useState } from "react";
import { MenuIcon, CloseIcon } from "./icons.jsx";
import { handleSectionLinkClick } from "../utils/scrollToSection.js";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  // Only tracks whether we've scrolled past the top (for the
  // background/blur treatment) — no more hide-on-scroll-down behavior, so
  // the header (and its underline) behaves identically no matter which
  // direction the user is scrolling.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: whichever section sits in the vertical center band of the
  // viewport becomes "active" and gets the red underline in the nav. This
  // is driven by IntersectionObserver, not scroll direction, so it always
  // updated correctly in both directions — it just used to be hidden from
  // view whenever the header itself was hidden while scrolling down.
  useEffect(() => {
    const sections = LINKS.map((link) =>
      document.getElementById(link.href.slice(1)),
    ).filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur border-b border-ink/10"
          : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 lg:px-24 h-20">
        {/* Monogram */}
        <a
          href="#home"
          aria-label="Back to top"
          onClick={(e) => handleSectionLinkClick(e, "home")}
          className="group flex h-10 w-10 items-center justify-center bg-ink font-display text-sm font-semibold text-white transition-colors duration-300 hover:bg-red-600"
        >
          CR
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {LINKS.map((link) => {
            const isActive = activeHash === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSectionLinkClick(e, link.href.slice(1))}
                aria-current={isActive ? "true" : undefined}
                className={`relative pb-1 font-mono text-xs uppercase tracking-[0.15em] transition-colors ${
                  isActive ? "text-ink" : "text-ink/70 hover:text-red-600"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-0 -bottom-1 h-[2px] bg-red-600 transition-transform duration-300 origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-ink/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-600 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
            </span>
            Open to work
          </span>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-ink"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-ink/10 bg-white px-6 py-6"
        >
          <div className="flex flex-col gap-5">
            {LINKS.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleSectionLinkClick(e, link.href.slice(1));
                    setOpen(false);
                  }}
                  className={`inline-flex w-fit items-center gap-2 border-b-2 pb-0.5 font-mono text-sm uppercase tracking-[0.15em] transition-colors ${
                    isActive
                      ? "border-red-600 text-ink"
                      : "border-transparent text-ink/80 hover:text-red-600"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
