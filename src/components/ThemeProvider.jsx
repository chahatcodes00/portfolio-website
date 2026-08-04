import { useCallback, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext.js";

const STORAGE_KEY = "theme";

// Default is light mode. If the visitor has toggled dark mode before,
// index.html's inline script has already added the "dark" class to <html>
// before this ever runs (avoids a flash of the wrong theme) — this just
// reads the same source of truth into React state.
function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "dark"
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

/**
 * Wraps the app once (see main.jsx) so every consumer of useTheme shares
 * one source of truth — no desync between, say, a desktop toggle button
 * and a mobile one if both existed in the DOM at once.
 */
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* localStorage unavailable — theme still works for this session */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
