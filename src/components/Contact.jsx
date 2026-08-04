import { MailIcon } from "./icons.jsx";
import useScrollReveal from "../hooks/useScrollReveal.js";

const EMAIL = "chahat.bs01@gmail.com";

export default function Contact() {
  const [ref, inView] = useScrollReveal();

  return (
    <section id="contact">
      <div
        ref={ref}
        className={`section-padding reveal ${inView ? "in-view" : ""}`}
      >
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-red-600">
          $ contact --init
        </span>

        <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl dark:text-white">
          Let's build something that stays up.
        </h2>

        <div className="mt-6 max-w-lg border border-ink/15 bg-white p-6 md:p-7 dark:border-white/10 dark:bg-ink">
          <p className="text-lg text-ink/60 dark:text-white/60">
            Open to cloud, DevOps, and infrastructure roles, reach out and
            I'll get back to you.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 bg-red-600 px-7 py-3.5 font-mono text-xs tracking-[0.15em] text-white transition-colors hover:bg-red-700"
          >
            <MailIcon className="h-4 w-4" />
            {EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}
