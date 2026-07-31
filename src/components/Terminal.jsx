export default function Terminal({ title = "chahat@infra", lines = [] }) {
  return (
    <div className="w-full max-w-md border border-ink/15 bg-ink text-left shadow-[8px_8px_0_0_#C0392B]">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.15em] text-white/40">
          {title}
        </span>
      </div>

      {/* Body */}
      <div className="space-y-2 px-4 py-5 font-mono text-[13px] leading-relaxed">
        {lines.map((line, i) => (
          <div key={i} className={line.dim ? "text-white/40" : "text-white/85"}>
            {line.prompt && <span className="text-red-600">$ </span>}
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}
