import { projects } from "../data/projects.js";
import ProjectCard from "./ProjectCard.jsx";
import { ArrowUpRight } from "./icons.jsx";
import useScrollReveal from "../hooks/useScrollReveal.js";

export default function Projects() {
  const [ref, inView] = useScrollReveal();

  return (
    <section id="projects">
      <div
        ref={ref}
        className={`section-padding reveal ${inView ? "in-view" : ""}`}
      >
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-red-600">
              $ ls ~/projects
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl dark:text-white">
              Selected deployments
            </h2>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-12">
          <a
            href="https://github.com/chahatcodes00"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-sm uppercase tracking-[0.1em] text-ink/70 transition-colors hover:text-red-600 dark:text-white/70"
          >
            See more on GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
