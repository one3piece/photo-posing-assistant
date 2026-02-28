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
        "cyber-blue": "#00d4ff",
        "cyber-emerald": "#00ff88",
      },
      backgroundImage: {
        "gradient-neon": "linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)",
      },
      boxShadow: {
        "glow-emerald": "0 0 30px rgba(0, 255, 136, 0.4)",
        "glow-blue": "0 0 30px rgba(0, 212, 255, 0.4)",
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
