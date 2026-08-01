import { GithubIcon, LinkedinIcon, MailIcon, ArrowUpRight } from "./icons.jsx";
import useScrollReveal from "../hooks/useScrollReveal.js";

const EMAIL = "chahat.bs01@gmail.com";

const SOCIALS = [
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
];

export default function Contact() {
  const [ref, inView] = useScrollReveal();

  return (
    <section id="contact" className="bg-ink text-white">
      <div
        ref={ref}
        className={`section-padding reveal ${inView ? "in-view" : ""}`}
      >
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-red-600">
          $ contact --init
        </span>

        <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          Let's build something that stays up.
        </h2>

        <p className="mt-6 max-w-lg text-lg text-white/60">
          Open to cloud, DevOps, and infrastructure roles, reach out and I'll
          get back to you.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 bg-red-600 px-7 py-3.5 font-mono text-xs tracking-[0.15em] text-white transition-colors hover:bg-red-700"
          >
            <MailIcon className="h-4 w-4" />
            {EMAIL}
          </a>
        </div>

        <div className="mt-14 flex flex-wrap gap-8 border-t border-white/10 pt-8">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-red-600"
            >
              <Icon className="h-4 w-4" />
              {label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
