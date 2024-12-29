import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
    theme: {
    extend: {
      animation: {
        bounceSlow: "bounceSlow 2s infinite",
      },
      keyframes: {
        bounceSlow: {
          "0%, 100%": { transform: "translateY(-10%)", animationTimingFunction: "ease-in-out" },
          "50%": { transform: "translateY(0)", animationTimingFunction: "ease-in-out" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
