import { SunIcon, MoonIcon } from "./icons.jsx";
import { useTheme } from "../hooks/useTheme.js";

// Single shared instance's worth of markup — Navbar renders exactly one of
// these (always visible, at every breakpoint), so desktop and mobile can
// never show it out of sync with each other.
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-ink/15 text-ink transition-colors hover:border-red-600 hover:text-red-600 dark:border-white/15 dark:text-white dark:hover:border-red-600 dark:hover:text-red-600"
    >
      {isDark ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
    </button>
  );
}
