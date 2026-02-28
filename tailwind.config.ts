import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      safe: {
        top: "env(safe-area-inset-top)",
        right: "env(safe-area-inset-right)",
        bottom: "env(safe-area-inset-bottom)",
        left: "env(safe-area-inset-left)",
      },
    },
  },
  plugins: [],
};
export default config;
