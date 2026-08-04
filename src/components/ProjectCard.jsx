import { ArrowUpRight } from "./icons.jsx";
import { tagSlug } from "../utils/tagSlug.js";

// The whole card is the repo link now (previously a small "Repo" row in the
// footer) — clicking anywhere on it opens repoUrl in a new tab. The one
// exception is the "Live site" link when a project has one: clicks starting
// inside a real <a> are left alone so that link can navigate on its own
// instead of being swallowed by the card's click handler.
export default function ProjectCard({ project }) {
  const { title, description, stack, status, repoUrl, liveUrl, id } = project;

  function openRepo() {
    window.open(repoUrl, "_blank", "noopener,noreferrer");
  }

  function handleClick(e) {
    if (e.target.closest("a")) return;
    openRepo();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openRepo();
    }
  }

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Open ${title} repository on GitHub`}
      className="group flex h-full cursor-pointer flex-col border border-ink/15 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red-600 hover:shadow-[6px_6px_0_0_#C0392B] focus-visible:outline-2 focus-visible:outline-red-600 focus-visible:outline-offset-2 dark:border-white/10 dark:bg-ink"
    >
      {/* Status */}
      <div className="mb-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink/40 dark:text-white/40">
        <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
        {status}
      </div>

      <h3 className="font-display text-xl font-semibold leading-snug text-ink dark:text-white">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60 dark:text-white/60">
        {description}
      </p>

      {/* Stack chips — each carries an id so About's skill chips can jump
          straight to the matching tag here. */}
      <div className="mt-6 flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            id={`project-tag-${tagSlug(tech)}-${id}`}
            className="cursor-default border border-ink/10 px-2.5 py-1 font-mono text-[11px] text-ink/50 transition-colors dark:border-white/10 dark:text-white/50"
          >
            {tech}
          </span>
        ))}
      </div>

      {liveUrl && (
        <div className="mt-6 flex items-center gap-5 border-t border-ink/10 pt-5 font-mono text-xs uppercase tracking-[0.1em] dark:border-white/10">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center gap-1 text-red-600 transition-colors hover:text-ink dark:hover:text-white"
          >
            Live site
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </div>
  );
}
