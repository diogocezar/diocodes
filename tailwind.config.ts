import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      background: "var(--background)",
      "current-line": "var(--current-line)",
      foreground: "var(--foreground)",
      comment: "var(--comment)",
      cyan: "var(--cyan)",
      green: "var(--green)",
      orange: "var(--orange)",
      pink: "var(--pink)",
      purple: "var(--purple)",
      red: "var(--red)",
      yellow: "var(--yellow)",
    },
  },
  plugins: [],
};
export default config;
