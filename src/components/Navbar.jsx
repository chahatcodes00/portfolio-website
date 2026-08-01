import { useEffect, useRef, useState } from "react";
import { MenuIcon, CloseIcon } from "./icons.jsx";
import { handleSectionLinkClick } from "../utils/scrollToSection.js";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

// Below this scroll position the header always stays visible, regardless
// of direction — avoids the header disappearing right after page load.
const HIDE_THRESHOLD = 120;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 8);

      // Never hide the header while the mobile menu is open — the toggle
      // button lives inside it, so hiding it would trap the user.
      if (open) {
        lastScrollY.current = currentY;
        return;
      }

      const delta = currentY - lastScrollY.current;

      if (currentY < HIDE_THRESHOLD) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Scroll-spy: whichever section sits in the vertical center band of the
  // viewport becomes "active" and gets the red underline in the nav.
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
      className={`fixed top-0 inset-x-0 z-50 transition-[transform,background-color] duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
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
          onClick={() => setOpen((v) => {
            const next = !v;
            if (next) setHidden(false);
            return next;
          })}
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
