export default function Footer() {
  return (
    <footer className="border-t border-ink/10 dark:border-white/10">
      <div className="flex flex-col items-center justify-between gap-4 px-6 py-8 font-mono text-[11px] uppercase tracking-[0.15em] text-ink sm:flex-row md:px-12 lg:px-24 dark:text-white">
        <span>&copy; {new Date().getFullYear()} Chahat R. S. Rathour</span>
        <span>Built with React · Vite · Tailwind CSS</span>
      </div>
    </footer>
  );
}
