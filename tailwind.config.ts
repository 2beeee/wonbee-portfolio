import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "base-black": "#0A0A0A",
        surface: "#111111",
        "surface-light": "#1A1A1A",
        "border-dark": "#2A2A2A",
        "border-hover": "#3A3A3A",
        combustion: "#FF6B2B",
        lox: "#00D4FF",
        "warm-white": "#F5F0E8",
        "text-secondary": "#A0A0A0",
        "text-muted": "#666666",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "fade-up": "fade-up 600ms cubic-bezier(0.16,1,0.3,1) both",
        "fade-up-delay": "fade-up 600ms cubic-bezier(0.16,1,0.3,1) 200ms both",
        "slide-in-left": "slide-in-left 600ms cubic-bezier(0.16,1,0.3,1) both",
        "slide-in-right": "slide-in-right 600ms cubic-bezier(0.16,1,0.3,1) both",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "ticker": "ticker 0.1s steps(1) infinite",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
