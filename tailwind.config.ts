import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--background)",
        "current-line": "var(--current-line)",
        "background-dark": "var(--background-dark)",
        foreground: "var(--foreground)",
        comment: "var(--comment)",
        cyan: "var(--cyan)",
        green: "var(--green)",
        orange: "var(--orange)",
        pink: "var(--pink)",
        purple: "var(--purple)",
        red: "var(--red)",
        yellow: "var(--yellow)",
        primary: {
          DEFAULT: "var(--foreground)",
          foreground: "var(--foreground)",
        },
        secondary: {
          DEFAULT: "var(--foreground)",
          foreground: "var(--foreground)",
        },
        destructive: {
          DEFAULT: "var(--foreground)",
          foreground: "var(--foreground)",
        },
        muted: {
          DEFAULT: "var(--foreground)",
          foreground: "var(--foreground)",
        },
        accent: {
          DEFAULT: "var(--foreground)",
          foreground: "var(--foreground)",
        },
        popover: {
          DEFAULT: "var(--foreground)",
          foreground: "var(--foreground)",
        },
        card: {
          DEFAULT: "var(--foreground)",
          foreground: "var(--foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
