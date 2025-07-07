/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",
        secondary: "#64748B",
        accent: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        background: "#F9FAFB",
        surface: "#FFFFFF",
        text: "#111827",
        muted: "#6B7280",
      },
    },
  },
  plugins: [],
};
