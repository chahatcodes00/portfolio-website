import { ArrowUpRight, GithubIcon } from "./icons.jsx";

export default function ProjectCard({ project }) {
  const { title, description, stack, status, repoUrl, liveUrl } = project;

  return (
    <div className="group flex h-full flex-col border border-ink/15 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red-600 hover:shadow-[6px_6px_0_0_#C0392B]">
      {/* Status */}
      <div className="mb-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink/40">
        <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
        {status}
      </div>

      <h3 className="font-display text-xl font-semibold leading-snug text-ink">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">
        {description}
      </p>

      {/* Stack chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="cursor-default border border-ink/10 px-2.5 py-1 font-mono text-[11px] text-ink/50"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="mt-6 flex items-center gap-5 border-t border-ink/10 pt-5 font-mono text-xs uppercase tracking-[0.1em]">
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-ink/70 transition-colors hover:text-red-600"
        >
          <GithubIcon className="h-4 w-4" />
          Repo
        </a>
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-red-600 transition-colors hover:text-ink"
          >
            Live site
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
