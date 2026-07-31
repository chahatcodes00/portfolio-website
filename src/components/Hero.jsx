import Terminal from "./Terminal.jsx";

const STACK = ["AWS", "TERRAFORM", "DOCKER", "CI/CD", "LINUX"];

export default function Hero() {
  return (
    <section
      id="home"
      className="bg-blueprint relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      <div className="section-padding grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
        {/* Left: statement */}
        <div>
          <div className="mb-6 flex items-center gap-2 font-mono text-sm text-red-600">
            <span>$ whoami</span>
            <span
              className="h-4 w-[2px] animate-blink bg-red-600"
              aria-hidden="true"
            />
          </div>

          <h1 className="font-display text-balance text-6xl font-semibold leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-8xl">
            CHAHAT
            <br />
            R.S. RATHOUR
          </h1>

          <p className="mt-8 max-w-xl text-balance text-lg text-ink/60 sm:text-xl">
            Aspiring Cloud &amp; DevOps engineer. I provision infrastructure,
            containerize it, and ship it on AWS, with Terraform, without the
            guesswork.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="bg-ink px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-white transition-colors hover:bg-red-600"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="border border-ink px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-colors hover:border-red-600 hover:text-red-600"
            >
              Get in touch
            </a>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/10 pt-6 font-mono text-xs tracking-[0.15em] text-ink/40">
            {STACK.map((item, i) => (
              <span key={item} className="flex items-center gap-6">
                {item}
                {i < STACK.length - 1 && (
                  <span className="text-red-600">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Right: terminal mockup */}
        <div className="hidden justify-self-end lg:block">
          <Terminal
            lines={[
              { prompt: true, text: "terraform apply" },
              { text: "Apply complete! Resources: 12 added", dim: true },
              { prompt: true, text: "docker ps" },
              { text: "flask-app   Up 3h   0.0.0.0:5000->5000/tcp", dim: true },
              { prompt: true, text: "curl -I chahatrsrathour.com.np" },
              { text: "HTTP/1.1 200 OK", dim: true },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
