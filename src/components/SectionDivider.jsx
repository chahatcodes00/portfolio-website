export default function SectionDivider({ label }) {
  return (
    <div
      className="relative flex items-center justify-center py-6"
      aria-hidden="true"
    >
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-ink/30 to-transparent dark:via-white/30" />
      <div className="absolute border border-red-600/50 bg-white px-5 py-2 font-mono text-sm font-bold text-ink shadow-[3px_3px_0_0_#C0392B] dark:bg-ink dark:text-white">
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </div>
    </div>
  );
}
