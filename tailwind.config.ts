import type { Config } from "tailwindcss";

// Tailwind CSS 4 is CSS-first: the real tokens live in `src/app/globals.css`
// under `@theme`. This file mirrors the same literal values so editor
// tooling and any legacy JS-config consumers see the BNI Prime palette too.
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#C8102E",
          dark: "#8B0A1F",
        },
        foreground: "#1D1D1F",
        background: "#FFFFFF",
        surface: "#F5F5F7",
        border: "#D2D2D7",
        muted: "#86868B",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      maxWidth: {
        "7xl": "80rem",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.21, 0.47, 0.32, 0.98)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "soft-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
        "soft-pulse": "soft-pulse 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
