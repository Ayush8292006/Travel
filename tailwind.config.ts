import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      beige: "#EFE7DA",
      "deep-beige": "#D9CBB5",
      black: "#0E0E0E",
      muted: "#5B554C",
    },
    extend: {
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "Manrope", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: [
          "clamp(3.5rem, 12vw, 10rem)",
          { lineHeight: "0.94", letterSpacing: "-0.02em" },
        ],
        label: [
          "0.75rem",
          { lineHeight: "1.4", letterSpacing: "0.2em" },
        ],
        "label-sm": [
          "0.6875rem",
          { lineHeight: "1.4", letterSpacing: "0.2em" },
        ],
      },
      letterSpacing: {
        editorial: "0.2em",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

