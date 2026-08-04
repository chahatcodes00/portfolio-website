import { useEffect, useRef, useState } from "react";

const SITE_URL = "https://chahatrsrathour.com.np/";

const PROJECT_LINKS = {
  "ec2-terraform-docker-flask":
    "github.com/chahatcodes00/EC2-using-Terraform-and-Docker-Flask-Web-App-Launch",
  "custom-vpc-aws":
    "github.com/chahatcodes00/Terraform-AWS-Deployment-with-Custom-VPC-EC2-S3",
  "portfolio-website": "github.com/chahatcodes00/portfolio-website",
};

const COMMANDS = {
  help: "Commands: help, whoami, pwd, ls, cat about.md, skills, projects, cat contact.md, open <project>, clear",
  whoami: "chahat — aspiring cloud & devops engineer",
  pwd: SITE_URL,
  ls: "about.md   projects/   skills.md   contact.md",
  "cat about.md":
    "Cloud & DevOps engineer. Provisions infra as code, containerizes it, ships it on AWS with Terraform.",
  skills:
    "AWS · Terraform · Docker · Flask · NGINX · Git · Linux · SSH · CI/CD",
  "cat skills.md":
    "AWS · Terraform · Docker · Flask · NGINX · Git · Linux · SSH · CI/CD",
  projects:
    "ec2-terraform-docker-flask\ncustom-vpc-aws\nportfolio-website\n(run: open <project> to view its repo)",
  "cat contact.md":
    "email: chahat.bs01@gmail.com\ngithub: github.com/chahatcodes00\nlinkedin: /in/chahat-r-s-rathour-414906338",
  "terraform apply": "Apply complete! Resources: 12 added",
  "docker ps": "flask-app   Up 3h   0.0.0.0:5000->5000/tcp",
  "curl -i chahatrsrathour.com.np": "HTTP/1.1 200 OK",
  "sudo rm -rf /": "Nice try. Permission denied.",
};

// Resolves one typed command to plain text output, or a { clear: true }
// signal. Pure function, easy to extend later.
function resolveCommand(raw) {
  const trimmed = raw.trim();
  const lower = trimmed.toLowerCase();

  if (lower === "clear") return { clear: true };

  if (lower.startsWith("open ")) {
    const target = lower.slice(5).trim();
    const url = PROJECT_LINKS[target];
    return { text: url ? url : `open: no such project "${target}"` };
  }

  if (Object.prototype.hasOwnProperty.call(COMMANDS, lower)) {
    return { text: COMMANDS[lower] };
  }

  return { text: `bash: ${trimmed}: command not found` };
}

// Fixed pixel dimensions, applied as inline styles (highest CSS specificity,
// can't be silently overridden by a class-ordering or purge quirk). The
// body's height is the container height minus the title bar's — a real
// literal number, not a flex ratio — so content can never resize the box.
const CONTAINER_WIDTH = 500;
const CONTAINER_HEIGHT = 420;
const TITLE_BAR_HEIGHT = 45;

export default function Terminal({ title = "chahat@infra", lines = [] }) {
  const [history, setHistory] = useState(
    lines.map((l) => ({ prompt: !!l.prompt, text: l.text, dim: !!l.dim })),
  );
  const [input, setInput] = useState("");
  const [past, setPast] = useState([]);
  const [pastIndex, setPastIndex] = useState(null);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  function runCommand(raw) {
    const trimmed = raw.trim();
    if (!trimmed) {
      setHistory((h) => [...h, { prompt: true, text: "" }]);
      return;
    }

    const result = resolveCommand(trimmed);

    if (result.clear) {
      setHistory([
        { text: "console cleared - type help to see commands", dim: true },
      ]);
      setPast((p) => [...p, trimmed]);
      setPastIndex(null);
      return;
    }

    setHistory((h) => [
      ...h,
      { prompt: true, text: trimmed },
      ...String(result.text)
        .split("\n")
        .map((text) => ({ text, dim: true })),
    ]);
    setPast((p) => [...p, trimmed]);
    setPastIndex(null);
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (past.length === 0) return;
      const next =
        pastIndex === null ? past.length - 1 : Math.max(0, pastIndex - 1);
      setPastIndex(next);
      setInput(past[next]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (pastIndex === null) return;
      const next = pastIndex + 1;
      if (next >= past.length) {
        setPastIndex(null);
        setInput("");
      } else {
        setPastIndex(next);
        setInput(past[next]);
      }
    }
  }

  return (
    <div
      // Fixed 500px box. No `w-full`/`max-w-md` here on purpose: `max-w-md`
      // is 28rem (448px), which is SMALLER than the 500px we want, so it
      // was silently clamping the container to 448px regardless of the
      // inline width. Width is controlled by inline style alone below —
      // one source of truth, nothing to fight with.
      className="min-w-0 border border-ink bg-white text-left shadow-[8px_8px_0_0_#C0392B] dark:border-white/35 dark:bg-ink"
      style={{
        width: CONTAINER_WIDTH,
        maxWidth: CONTAINER_WIDTH,
        height: CONTAINER_HEIGHT,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar — macOS-style traffic lights (red/yellow/green) */}
      <div
        className="flex items-center gap-2 border-b border-ink/10 px-4 py-3 dark:border-white/10"
        style={{
          height: TITLE_BAR_HEIGHT,
          flexShrink: 0,
          boxSizing: "border-box",
        }}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink/55 dark:text-white/55">
          {title}
        </span>
      </div>

      {/* Body — explicit pixel height (container minus title bar), scrolls
          internally, scrollbar hidden via .scrollbar-none.
          justify-end anchors content to the bottom, like a real terminal
          prompt. The faint scanline background keeps the box's true edges
          visible regardless of how much text is in it.
          min-w-0 here (and on the Hero.jsx grid item this sits inside) is
          part of the width-stretching fix: CSS Grid/Flexbox items default
          to min-width:auto, which means a track can never shrink below its
          widest *unbreakable* piece of content, even if that content's own
          box has an explicit max-width. min-w-0 removes that floor.
          break-words + [overflow-wrap:anywhere] on each output line below
          is the other half: break-words only breaks at "reasonable" points,
          so a single long unbroken token (a bare URL, a long repo path,
          a wide docker/curl output line) could still push past the edge.
          overflow-wrap:anywhere force-breaks a token if it's the only way
          to keep it inside the box, so nothing can ever widen the
          container. */}
      <div
        ref={bodyRef}
        className="terminal-scanlines scrollbar-none flex min-w-0 flex-col justify-end gap-2 overflow-x-hidden px-4 py-5 font-mono text-[13px] leading-relaxed"
        style={{
          height: CONTAINER_HEIGHT - TITLE_BAR_HEIGHT,
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        {history.map((line, i) => (
          <div
            key={i}
            className={`min-w-0 break-words [overflow-wrap:anywhere] ${
              line.dim
                ? "text-ink/60 dark:text-white/60"
                : "text-ink/85 dark:text-white/85"
            }`}
          >
            {line.prompt && <span className="text-red-600">$ </span>}
            {line.text}
          </div>
        ))}

        <div className="flex min-w-0 items-center gap-2">
          <span className="text-red-600">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-label="Interactive terminal. Type help for a list of commands."
            className="min-w-0 flex-1 bg-transparent font-mono text-[13px] text-ink/85 caret-red-600 outline-none placeholder:text-ink/40 dark:text-white/85 dark:placeholder:text-white/40"
            placeholder="type help"
          />
        </div>
      </div>
    </div>
  );
}
