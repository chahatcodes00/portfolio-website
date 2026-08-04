import { useEffect, useState } from "react";
import {
  MenuIcon,
  CloseIcon,
  GithubIcon,
  LinkedinIcon,
  DiscordIcon,
  DockerIcon,
} from "./icons.jsx";
import { handleSectionLinkClick } from "../utils/scrollToSection.js";
import ThemeToggle from "./ThemeToggle.jsx";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/chahatcodes00",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/chahat-r-s-rathour-414906338/",
    icon: LinkedinIcon,
  },
  {
    label: "Discord",
    href: "https://discord.com/users/716653404679831613",
    icon: DiscordIcon,
  },
  {
    label: "DockerHub",
    href: "https://hub.docker.com/repositories/chahatrsrathour",
    icon: DockerIcon,
    // 2px larger than the other tray icons at each breakpoint
    desktopClass: "h-[24px] w-[24px]",
    mobileClass: "h-[26px] w-[26px]",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  // Tracks scroll position for the hairline-border treatment, and scroll
  // direction to hide the header on the way down / bring it back on the way
  // up. Scrolling up always reveals it immediately (no threshold), so it's
  // never more than a flick away. Suppressed near the very top and while the
  // mobile menu is open so it can't disappear mid-interaction.
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);

      if (open) {
        lastY = y;
        return;
      }

      if (y > lastY && y > 120) {
        setHidden(true);
      } else if (y < lastY) {
        setHidden(false);
      }
      lastY = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Force the header visible whenever the mobile menu opens.
  useEffect(() => {
    if (open) setHidden(false);
  }, [open]);

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
      className={`fixed top-0 inset-x-0 z-50 bg-transparent transition-all duration-300 ${
        scrolled
          ? "border-b border-ink/10 dark:border-white/10"
          : "border-b border-transparent"
      } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 lg:px-24 h-20">
        {/* Monogram */}
        <a
          href="#home"
          aria-label="Back to top"
          onClick={(e) => handleSectionLinkClick(e, "home")}
          className="group flex h-10 w-10 items-center justify-center bg-ink font-display text-sm font-semibold text-white transition-colors duration-300 hover:bg-red-600 dark:bg-white dark:text-ink dark:hover:bg-red-600 dark:hover:text-white"
        >
          CR
        </a>

        {/* Right side: desktop links, theme toggle, mobile menu button —
            grouped in one wrapper so the outer nav keeps exactly two
            justify-between children (monogram, this group) at every
            breakpoint, instead of the toggle shifting which element
            "between" spreads against as screens resize. */}
        <div className="flex items-center gap-5 md:gap-8">
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
                    isActive
                      ? "text-ink dark:text-white"
                      : "text-ink/70 hover:text-red-600 dark:text-white/70"
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
            <span className="h-4 w-px bg-ink/15 dark:bg-white/15" />
            <div className="flex items-center gap-5">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon, desktopClass }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="text-ink/70 transition-colors hover:text-red-600 dark:text-white/70"
                >
                  <Icon className={desktopClass || "h-4 w-4"} />
                </a>
              ))}
            </div>
          </div>

          <ThemeToggle />

          {/* Mobile toggle */}
          <button
            className="md:hidden text-ink dark:text-white"
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
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-ink/10 px-6 py-6 dark:border-white/10"
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
                      ? "border-red-600 text-ink dark:text-white"
                      : "border-transparent text-ink/80 hover:text-red-600 dark:text-white/80"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="mt-6 flex items-center gap-6 border-t border-ink/10 pt-6 dark:border-white/10">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon, mobileClass }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="text-ink/70 transition-colors hover:text-red-600 dark:text-white/70"
              >
                <Icon className={mobileClass || "h-5 w-5"} />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
