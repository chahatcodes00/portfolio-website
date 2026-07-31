/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0D0D0D",
        offwhite: "#F5F4F2",
        red: {
          50: "#FBEAE8",
          100: "#F3CBC5",
          600: "#C0392B", // primary accent
          700: "#A5311F", // hover/darker
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: 1 },
          "50%, 100%": { opacity: 0 },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        blink: "blink 1s steps(1) infinite",
        fadeUp: "fadeUp 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
};
