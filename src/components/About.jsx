import useScrollReveal from "../hooks/useScrollReveal.js";

const SKILL_GROUPS = [
  {
    label: "Infrastructure",
    items: ["AWS EC2", "AWS VPC", "AWS S3", "Terraform"],
  },
  { label: "Containers", items: ["Docker"] },
  { label: "Web & Servers", items: ["Flask", "NGINX"] },
  { label: "Tooling", items: ["Git", "Linux", "SSH", "CI/CD"] },
];

export default function About() {
  const [ref, inView] = useScrollReveal();

  return (
    <section id="about" className="bg-offwhite">
      <div
        ref={ref}
        className={`section-padding grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr] reveal ${
          inView ? "in-view" : ""
        }`}
      >
        {/* Left: copy */}
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-red-600">
            $ cat about.md
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            I build the layer
            <br />
            underneath the app.
          </h2>
          <p className="mt-6 max-w-lg text-lg text-ink/60">
            I care about the parts of a product most people never see: the
            network it runs on, the pipeline that ships it, and the
            infrastructure that keeps it up. My projects walk through that whole
            path, from a bare AWS account to a custom VPC, a provisioned EC2
            instance, and a containerized app serving real traffic.
          </p>
          <p className="mt-4 max-w-lg text-lg text-ink/60">
            Everything below is provisioned as code first, so it can be
            destroyed and rebuilt exactly the same way twice.
          </p>
        </div>

        {/* Right: stack chips */}
        <div className="space-y-8">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink/40">
                {group.label}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="cursor-default border border-ink/15 bg-white px-3 py-1.5 font-mono text-xs text-ink/80 transition-colors hover:border-red-600 hover:text-red-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
