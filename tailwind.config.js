/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: {
          DEFAULT: "var(--surface-solid)",
          hover: "var(--surface-hover)",
        },
        border: "var(--border)",
        text: {
          DEFAULT: "var(--text)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          light: "var(--primary-light)",
          dark: "var(--primary-dark)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          light: "var(--accent-light)",
        },
        warm: {
          DEFAULT: "var(--warm)",
          light: "var(--warm-light)",
        },
        rose: {
          DEFAULT: "var(--rose)",
          light: "var(--rose-light)",
        },
        emerald: {
          DEFAULT: "var(--emerald)",
          light: "var(--emerald-light)",
        },
        earth: {
          DEFAULT: "var(--earth)",
          light: "var(--earth-light)",
        },
        moss: {
          DEFAULT: "var(--moss)",
          light: "var(--moss-light)",
        },
        sky: "var(--sky)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
