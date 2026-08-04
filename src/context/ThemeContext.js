import { createContext } from "react";

// Shared between ThemeProvider (which supplies the value) and useTheme
// (which reads it). Split into its own file — rather than living inside
// either of those — purely so each of those files exports only one thing
// each, which is what react-refresh's fast-refresh checks require.
export const ThemeContext = createContext(null);
